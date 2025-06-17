<?php

namespace Database\Seeders;

use App\Models\AgentProfile;
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
        $agent = AgentProfile::first();

        LoanAssignment::create([
            'loan_id' => $loan->id,
            'agent_profile_id' => $agent->id,
            'role' => 'telemarketer',
        ]);
    }
}
