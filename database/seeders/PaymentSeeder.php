<?php

namespace Database\Seeders;

use App\Models\Loan;
use App\Models\Payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loan = Loan::first();

        Payment::insert([
            [
                'loan_id' => $loan->id,
                'due_date' => now()->addDays(30),
                'amount_paid' => 2000,
                'status' => 'partial',
                'paid_at' => now()
            ],
            [
                'loan_id' => $loan->id,
                'due_date' => now()->addDays(60),
                'amount_paid' => 0,
                'status' => 'unpaid',
                'paid_at' => null
            ],
        ]);
    }
}
