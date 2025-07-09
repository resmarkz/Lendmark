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
                'due_date' => $loan->due_date,
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

    public function updateLoan(Loan $loan, array $data)
    {
        $loan->update($data);
        return $loan;
    }

    public function storeLoan(array $data)
    {
        return Loan::create($data);
    }

    public function deleteLoan(Loan $loan)
    {
        $loan->delete();
    }
}
