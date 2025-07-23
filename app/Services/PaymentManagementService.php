<?php

namespace App\Services;

use App\Models\Payment;

class PaymentManagementService
{
    public function getPayments(Payment $payment)
    {
        return Payment::all();
    }
}
