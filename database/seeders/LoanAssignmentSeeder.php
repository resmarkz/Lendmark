<?php

namespace Database\Seeders;

use App\Models\CollectorProfile;
use App\Models\Loan;
use App\Models\LoanAssignment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loan = Loan::first();
        $collector = CollectorProfile::first();

        LoanAssignment::create([
            'loan_id' => $loan->id,
            'collector_profile_id' => $collector->id,
        ]);
    }
}