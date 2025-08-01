<?php

namespace App\Services;

use App\Models\Loan;
use App\Models\Payment;
use Illuminate\Support\Collection;

class ReportingService
{
    public function getAllLoans(?string $startDate = null, ?string $endDate = null): Collection
    {
        $query = Loan::with(['clientProfile.user', 'collectorProfile.user']);

        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }

        return $query->get();
    }

    public function getAllPayments(?string $startDate = null, ?string $endDate = null): Collection
    {
        $query = Payment::with(['loan.clientProfile.user', 'loan.collectorProfile.user']);

        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }

        return $query->get();
    }
}
