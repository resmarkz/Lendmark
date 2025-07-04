<?php

namespace App\Services;

use App\Models\ClientProfile;
use App\Models\CollectorProfile;
use App\Models\Loan;
use App\Models\User;

class LoanManagementService
{
    public function getLoans()
    {
        $loans = Loan::with(['clientProfile.user', 'collectorProfile.user', 'payments'])
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($loan) {
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
                // For edit purposes
                if ($currentClientId && $client->id == $currentClientId) {
                    return true;
                }

                // For client without loans
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
