<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\PaymentManagementService;
use App\Services\LoanManagementService;
use Illuminate\Http\Request;

class PaymentManagementController extends Controller
{
    private $paymentManagementService;
    public function __construct(PaymentManagementService $paymentManagementService)
    {
        $this->paymentManagementService = $paymentManagementService;
    }
    public function viewPayments(Request $request)
    {
        return inertia('Dashboard/admin/payments/index', [
            'payments' => $this->paymentManagementService->getPayments($request),
            'filters' => $request->all(),
        ]);
    }

    public function viewCreatePayment()
    {
        return inertia('Dashboard/admin/payments/create', [
            'loans' => app(LoanManagementService::class)->getLoansForPayments(),
        ]);
    }

    public function viewPayment(Payment $payment)
    {
        return inertia('Dashboard/admin/payments/show', [
            'payment' => $this->paymentManagementService->getPayment($payment),
        ]);
    }

    public function viewEditPayment(Payment $payment)
    {
        return inertia('Dashboard/admin/payments/edit', [
            'payment' => $this->paymentManagementService->getPayment($payment),
            'loans' => app(LoanManagementService::class)->getLoansForPayments(),
        ]);
    }

    public function addPayment(Request $request)
    {
        $this->paymentManagementService->addPayment($request);
        return redirect()->route('admin.payments.index');
    }

    public function updatePayment(Request $request, Payment $payment)
    {
        $this->paymentManagementService->updatePayment($request, $payment);
        return redirect()->route('admin.payments.index');
    }

    public function destroyPayment(Payment $payment)
    {
        $this->paymentManagementService->destroyPayment($payment);
        return redirect()->route('admin.payments.index');
    }
}
