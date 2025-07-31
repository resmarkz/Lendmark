<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClientProfile;
use App\Models\CollectorProfile;
use App\Models\Loan;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function viewOverview()
    {
        // 'ongoing','pending','approved','rejected','overdue','settled','cancelled'
        $total_loans = Loan::count();
        $total_balance = Loan::whereIn('status', ['approved', 'ongoing', 'overdue'])->get()->sum('remaining_balance');
        $total_paid = Payment::whereIn('status', ['partial', 'paid'])->sum('amount_paid');
        $total_clients = ClientProfile::count();
        $total_collectors = CollectorProfile::count();

        $monthly_data = Payment::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('SUM(amount_paid) as payments')
        )
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    'month' => date('M', mktime(0, 0, 0, $item->month, 10)),
                    'payments' => $item->payments,
                    'loans' => Loan::whereMonth('created_at', $item->month)->sum('amount'),
                ];
            });

        $metrics = [
            'total_loans' => $total_loans,
            'total_balance' => $total_balance,
            'total_paid' => $total_paid,
            'total_clients' => $total_clients,
            'total_collectors' => $total_collectors,
            'monthly_data' => $monthly_data,
            'loan_status' => Loan::select('status', DB::raw('count(*) as value'))
                ->groupBy('status')
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => ucfirst($item->status),
                        'value' => $item->value,
                    ];
                }),
            'collector_performance' => CollectorProfile::with('user')
                ->withSum('payments', 'amount_paid')
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => optional($item->user)->name,
                        'collected' => $item->payments_sum_amount_paid ?? 0,
                    ];
                }),
        ];
        // dd($metrics);
        return inertia('Dashboard/admin/overview/index', [
            'metrics' => $metrics,
        ]);
    }
}
