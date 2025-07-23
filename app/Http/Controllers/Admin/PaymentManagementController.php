<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\PaymentManagementService;
use Illuminate\Http\Request;

class PaymentManagementController extends Controller
{
    private $paymentManagementService;
    public function __construct(PaymentManagementService $paymentManagementService)
    {
        $this->paymentManagementService = $paymentManagementService;
    }
    public function viewPayments(Payment $payment)
    {
        return inertia('Dashboard/admin/payments/index', [
            'payments' => $this->paymentManagementService->getPayments($payment),
        ]);
    }
}
