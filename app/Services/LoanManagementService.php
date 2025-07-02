<?php

namespace App\Services;

use App\Models\Loan;
use App\Models\User;

class LoanManagementService
{
    public function getLoans()
    {
        $loans = Loan::with(['clientProfile', 'payments', 'loanAssignments.collectorProfile'])
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
                    'client_name' => $loan->clientProfile ? $loan->clientProfile->name : null,
                    'payments' => $loan->payments,
                    'assignments' => $loan->loanAssignments->map(function ($assignment) {
                        return [
                            'collector_name' => $assignment->collectorProfile ? $assignment->collectorProfile->name : null,
                        ];
                    }),
                ];
            });

        return $loans;
    }

    public function getClientList()
    {
        $clients = User::where('role', 'client')
            ->get();
        return $clients;
    }

    public function getCollectorList()
    {
        $collectors = User::where('role', 'collector')
            ->get();
        return $collectors;
    }

    public function storeLoan(array $data) {}
}
