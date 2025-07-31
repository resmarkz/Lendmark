<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\LoanManagementService;

class LoanController extends Controller
{
    protected $loanService;

    public function __construct(LoanManagementService $loanService)
    {
        $this->loanService = $loanService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loans = Loan::with(['clientProfile', 'payments', 'loanAssignments.collectorProfile'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($loan) {
                return [
                    'id' => $loan->id,
                    'marketing_id' => $loan->marketing_id,
                    'amount' => $loan->amount,
                    'term' => $loan->term,
                    'interest_rate' => $loan->interest_rate,
                    'status' => $loan->status,
                    'disbursement_date' => $loan->disbursement_date,
                    'client_name' => $loan->clientProfile ? $loan->clientProfile->user->name : null,
                    'payments' => $loan->payments,
                    'assignments' => $loan->loanAssignments->map(function ($assignment) {
                        return [
                            'collector_name' => $assignment->collectorProfile ? $assignment->collectorProfile->user->name : null,
                        ];
                    }),
                ];
            });
        return Inertia::render('Dashboard/admin/loans/index', [
            'loans' => $loans,
        ]);
    }

    public function approve(Loan $loan)
    {
        $this->loanService->approveLoan($loan);
        return redirect()->back()->with('success', 'Loan approved successfully.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Loan $loan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Loan $loan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Loan $loan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loan $loan)
    {
        //
    }
}