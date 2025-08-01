<?php

namespace App\Services;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentManagementService
{
    public function getPayments(Request $request)
    {
        $query = Payment::with(['loan.clientProfile.user'])
            ->latest();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('loan.clientProfile.user', function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->search . '%');
                })
                    ->orWhere('id', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->amount_min) {
            $query->where('amount_paid', '>=', $request->amount_min);
        }

        if ($request->amount_max) {
            $query->where('amount_paid', '<=', $request->amount_max);
        }

        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $payments = $query->paginate(15);

        $payments->through(function ($payment) {
            return [
                'id' => $payment->id,
                'loan_id' => $payment->loan_id,
                'due_date' => $payment->due_date,
                'paid_at' => $payment->paid_at,
                'amount_paid' => $payment->amount_paid,
                'status' => $payment->status,
                'client_id' => $payment->loan && $payment->loan->clientProfile ? $payment->loan->clientProfile->user->id : null,
                'client_name' => $payment->loan && $payment->loan->clientProfile && $payment->loan->clientProfile->user ? $payment->loan->clientProfile->user->name : null,
            ];
        });

        return $payments;
    }

    public function getPayment(Payment $payment)
    {
        return $payment->load(['loan.clientProfile.user']);
    }

    public function addPayment(array $data)
    {
        return Payment::create($data);
    }

    public function updatePayment(Request $request, Payment $payment)
    {
        $payment->update($request->all());
        return $payment;
    }

    public function destroyPayment(Payment $payment)
    {
        $payment->delete();
    }
}
