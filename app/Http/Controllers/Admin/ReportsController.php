<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ReportingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportsController extends Controller
{
    protected $reportingService;

    public function __construct(ReportingService $reportingService)
    {
        $this->reportingService = $reportingService;
    }

    public function viewExportPage()
    {
        return Inertia::render('Dashboard/admin/reports/Export');
    }

    public function exportLoansCsv(Request $request): StreamedResponse
    {
        $loans = $this->reportingService->getAllLoans($request->query('start_date'), $request->query('end_date'));

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="loans.csv"',
        ];

        $callback = function () use ($loans) {
            $file = fopen('php://output', 'w');


            fputcsv($file, [
                'Loan ID',
                'Marketing ID',
                'Amount',
                'Term',
                'Interest Rate',
                'Status',
                'Disbursement Date',
                'Client Name',
                'Client Email',
                'Collector Name',
                'Collector Email',
                'Created At',
                'Updated At',
            ]);

            
            foreach ($loans as $loan) {
                fputcsv($file, [
                    $loan->id,
                    $loan->marketing_id,
                    $loan->amount,
                    $loan->term,
                    $loan->interest_rate,
                    $loan->status,
                    $loan->disbursement_date,
                    $loan->clientProfile->user->name ?? 'N/A',
                    $loan->clientProfile->user->email ?? 'N/A',
                    $loan->collectorProfile->user->name ?? 'N/A',
                    $loan->collectorProfile->user->email ?? 'N/A',
                    $loan->created_at,
                    $loan->updated_at,
                ]);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }

    public function exportPaymentsCsv(Request $request): StreamedResponse
    {
        $payments = $this->reportingService->getAllPayments($request->query('start_date'), $request->query('end_date'));

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="payments.csv"',
        ];

        $callback = function () use ($payments) {
            $file = fopen('php://output', 'w');


            fputcsv($file, [
                'Payment ID',
                'Loan ID',
                'Due Date',
                'Paid At',
                'Amount Paid',
                'Status',
                'Client Name',
                'Client Email',
                'Collector Name',
                'Collector Email',
                'Created At',
                'Updated At',
            ]);

            
            foreach ($payments as $payment) {
                fputcsv($file, [
                    $payment->id,
                    $payment->loan_id,
                    $payment->due_date,
                    $payment->paid_at,
                    $payment->amount_paid,
                    $payment->status,
                    $payment->loan->clientProfile->user->name ?? 'N/A',
                    $payment->loan->clientProfile->user->email ?? 'N/A',
                    $payment->loan->collectorProfile->user->name ?? 'N/A',
                    $payment->loan->collectorProfile->user->email ?? 'N/A',
                    $payment->created_at,
                    $payment->updated_at,
                ]);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}
