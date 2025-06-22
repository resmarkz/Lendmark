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

    public function viewLoans()
    {
        return Inertia::render('Dashboard/admin/loans/index', [
            'loans' => $this->loanService->getLoans(),
        ]);
    }
}
