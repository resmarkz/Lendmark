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

    public function getClientList()
    {
        return ClientProfile::with('user')->get()->map(function ($profile) {
            return [
                'id' => $profile->id,
                'name' => $profile->user->name,
            ];
        });
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

    public function storeLoan(array $data)
    {
        // The 'client_profile_id' and 'collector_profile_id' are already in $data
        // and are marked as fillable in the Loan model, so we can pass it all directly.
        return Loan::create($data);
    }
}
