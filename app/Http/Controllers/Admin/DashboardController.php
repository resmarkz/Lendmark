<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClientProfile;
use App\Models\CollectorProfile;
use App\Models\Loan;
use App\Models\Payment;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function viewOverview()
    {
        // 'ongoing','pending','approved','rejected','overdue','settled','cancelled'
        $total_loans = Loan::count();
        $total_balance = Loan::where('status', 'approved')->sum('amount');
        $total_paid = Payment::whereIn('status', ['partial', 'paid'])->sum('amount_paid');
        $total_clients = ClientProfile::count();
        $total_collectors = CollectorProfile::count();

        $metrics = [
            'total_loans' => $total_loans,
            'total_balance' => $total_balance,
            'total_paid' => $total_paid,
            'total_clients' => $total_clients,
            'total_collectors' => $total_collectors,
            'monthly_data' => [
                ['month' => 'Jan', 'payments' => 5000, 'loans' => 3000],
            ],
            'loan_status' => [
                ['name' => 'Active', 'value' => 400],
                ['name' => 'Overdue', 'value' => 150]
            ],
            'collector_performance' => [
                ['name' => 'John Doe', 'collected' => 12500],
                ['name' => 'Jane Smith', 'collected' => 9800]
            ]
        ];
        // dd($metrics);
        return inertia('Dashboard/admin/overview/index', [
            'metrics' => $metrics,
        ]);
    }
}
