<?php

namespace App\Services;

use App\Models\ClientProfile;
use App\Models\CollectorProfile;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;

class LoanManagementService
{
    public function getLoans(Request $request)
    {
        $query = Loan::with(['clientProfile.user', 'collectorProfile.user'])
            ->latest();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('clientProfile.user', function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->search . '%');
                })
                    ->orWhere('id', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->amount_min) {
            $query->where('amount', '>=', $request->amount_min);
        }

        if ($request->amount_max) {
            $query->where('amount', '<=', $request->amount_max);
        }

        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        if ($request->collector && $request->collector !== 'all') {
            $query->where('collector_profile_id', $request->collector);
        }

        if ($request->term && $request->term !== 'all') {
            $query->where('term', $request->term);
        }

        $loans = $query->paginate(15);

        $loans->through(function ($loan) {
            return [
                'id' => $loan->id,
                'marketing_id' => $loan->marketing_id,
                'amount' => $loan->amount,
                'term' => $loan->term,
                'interest_rate' => $loan->interest_rate,
                'status' => $loan->status,
                'disbursement_date' => $loan->disbursement_date, // Changed from due_date
                'client_id' => $loan->clientProfile ? $loan->clientProfile->user->id : null,
                'client_name' => $loan->clientProfile && $loan->clientProfile->user ? $loan->clientProfile->user->name : null,
                'collector_name' => $loan->collectorProfile && $loan->collectorProfile->user ? $loan->collectorProfile->user->name : null,
                'payments' => $loan->payments,
            ];
        });

        return $loans;
    }

    public function getClientList($currentClientId = null)
    {
        return ClientProfile::with(['user', 'loans'])
            ->get()
            ->filter(function ($client) use ($currentClientId) {
                if ($currentClientId && $client->id == $currentClientId) {
                    return true;
                }

                if ($client->loans->isEmpty()) {
                    return true;
                }

                $latestLoan = $client->loans->sortByDesc('created_at')->first();
                return $latestLoan && $latestLoan->status === 'settled';
            })
            ->map(function ($client) {
                return [
                    'id' => $client->id,
                    'name' => $client->user->name,
                ];
            })->values();
    }

    public function getCollectorList()
    {
        return CollectorProfile::with('user')->get()->map(function ($profile) {
            return [
                'id' => $profile->id,
                'name' => $profile->user->name,
            ];
        });
    }

    public function getLoansForPayments()
    {
        return Loan::with(['clientProfile.user'])
            ->where('status', 'approved')
            ->orWhere('status', 'ongoing')
            ->with('payments') // Eager load payments
            ->get()
            ->map(function ($loan) {
                $totalPaid = $loan->payments->sum('amount');
                $remainingBalance = $loan->amount - $totalPaid;
                return [
                    'id' => $loan->id,
                    'client_name' => $loan->clientProfile && $loan->clientProfile->user ? $loan->clientProfile->user->name : null,
                    'amount' => (float) $loan->amount,
                    'remaining_balance' => (float) $remainingBalance,
                    'loan_term' => $loan->term,
                    'interest_rate' => $loan->interest_rate,
                    'start_date' => $loan->disbursement_date ? $loan->disbursement_date->format('Y-m-d') : null,
                    'end_date' => $loan->due_date ? $loan->due_date->format('Y-m-d') : null,
                    'status' => $loan->status,
                ];
            });
    }

    public function updateLoan(Loan $loan, array $data)
    {
        $loan->update($data);
        return $loan;
    }

    public function storeLoan(array $data)
    {
        $loan = Loan::create($data);
        return $loan;
    }

    /**
     * Generates payment schedule for a given loan.
     * This assumes monthly payments.
     *
     * @param Loan $loan
     * @return void
     */
    public function generatePayments(Loan $loan): void
    {
        $principal = $loan->amount;
        $annualInterestRate = $loan->interest_rate / 100;
        $termInMonths = $loan->term;
        $disbursementDate = new \DateTime($loan->disbursement_date);

        // Calculate monthly interest rate
        $monthlyInterestRate = $annualInterestRate / 12;

        // Calculate monthly payment using the formula for an amortizing loan
        // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
        // Where:
        // M = Monthly Payment
        // P = Principal Loan Amount
        // i = Monthly Interest Rate
        // n = Number of Payments (Term in Months)
        if ($monthlyInterestRate > 0) {
            $monthlyPayment = $principal * ($monthlyInterestRate * pow((1 + $monthlyInterestRate), $termInMonths)) / (pow((1 + $monthlyInterestRate), $termInMonths) - 1);
        } else {
            $monthlyPayment = $principal / $termInMonths; // Simple division if no interest
        }

        $remainingPrincipal = $principal;

        for ($i = 1; $i <= $termInMonths; $i++) {
            $interestForMonth = $remainingPrincipal * $monthlyInterestRate;
            $principalPaidThisMonth = $monthlyPayment - $interestForMonth;
            $remainingPrincipal -= $principalPaidThisMonth;

            // Ensure remaining principal doesn't go negative due to floating point inaccuracies
            if ($remainingPrincipal < 0.01 && $remainingPrincipal > -0.01) {
                $remainingPrincipal = 0;
            }

            // Adjust last payment to account for any rounding differences
            if ($i === $termInMonths) {
                $monthlyPayment += $remainingPrincipal;
                $principalPaidThisMonth += $remainingPrincipal;
                $remainingPrincipal = 0;
            }

            $dueDate = clone $disbursementDate;
            $dueDate->modify('+' . $i . ' months');

            $loan->payments()->create([
                'due_date' => $dueDate->format('Y-m-d'),
                'amount_paid' => round($monthlyPayment, 2), // This will be the expected payment amount
                'status' => 'unpaid',
            ]);
        }
    }

    public function deleteLoan(Loan $loan)
    {
        $loan->delete();
    }

    public function approveLoan(Loan $loan)
    {
        $loan->status = 'approved';
        $loan->save();
        $this->generatePayments($loan);
        return $loan;
    }
}
