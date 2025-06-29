<?php

namespace App\Services;

use App\Models\Loan;

class LoanManagementService
{
    public function getLoans()
    {
        $loans = Loan::with(['clientProfile', 'payments', 'loanAssignments.agentProfile'])
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
                            'agent_name' => $assignment->agentProfile ? $assignment->agentProfile->name : null,
                            'role' => $assignment->role,
                        ];
                    }),
                ];
            });

        return $loans;
    }
}
