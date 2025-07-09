<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Services\LoanManagementService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanManagementController extends Controller
{
    protected $loanService;

    public function __construct(LoanManagementService $loanService)
    {
        $this->loanService = $loanService;
    }

    public function viewLoans(Request $request)
    {
        $loans = $this->loanService->getLoans($request);
        $collectors = $this->loanService->getCollectorList();

        return Inertia::render('Dashboard/admin/loans/index', [
            'loans' => $loans,
            'collectors' => $collectors,
            'filters' => $request->all(),
        ]);
    }

    public function viewCreateLoan()
    {
        $clientList = $this->loanService->getClientList();
        $collectorList = $this->loanService->getCollectorList();
        return inertia('Dashboard/admin/loans/create', [
            'clients' => $clientList,
            'collectors' => $collectorList,
        ]);
    }

    public function addLoan(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|numeric',
            'term' => 'required|integer',
            'interest_rate' => 'required|numeric',
            'client_profile_id' => 'required|integer',
            'collector_profile_id' => 'required|integer',
        ]);

        $this->loanService->storeLoan($data);
        return redirect()->route('admin.loans.index')->with('success', 'Loan added successfully.');
    }

    public function viewLoan(Loan $loan)
    {
        $loan->load([
            'clientProfile.user',
            'collectorProfile.user:id,name'
        ]);
        return inertia('Dashboard/admin/loans/show', [
            'loan' => $loan,
        ]);
    }

    public function viewEditLoan(Loan $loan)
    {
        $clientList = $this->loanService->getClientList($loan->client_profile_id);
        $collectorList = $this->loanService->getCollectorList();
        return inertia('Dashboard/admin/loans/edit', [
            'loan' => $loan,
            'clients' => $clientList,
            'collectors' => $collectorList,
        ]);
    }

    public function updateLoan(Request $request, Loan $loan)
    {
        $data = $request->validate([
            'amount' => 'required|numeric',
            'term' => 'required|integer',
            'interest_rate' => 'required|numeric',
            'client_profile_id' => 'required|integer',
            'collector_profile_id' => 'required|integer',
            'status' => 'required|in:ongoing,pending,approved,rejected,paid,overdue,settled,cancelled,default',
        ]);
        $this->loanService->updateLoan($loan, $data);
        return redirect()->route('admin.loans.index')->with('success', 'Loan updated successfully.');
    }

    public function destroyLoan(Loan $loan)
    {
        $this->loanService->deleteLoan($loan);
        return redirect()->route('admin.loans.index')->with('success', 'Loan deleted successfully.');
    }
}
