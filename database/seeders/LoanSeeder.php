<?php

namespace Database\Seeders;

use App\Models\ClientProfile;
use App\Models\CollectorProfile;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clientUser = User::where('email', 'client@example.com')->first();
        $collectorUser = User::where('email', 'collector1@example.com')->first();

        $clientProfile = ClientProfile::where('user_id', $clientUser->id)->first();
        $collectorProfile = CollectorProfile::where('user_id', $collectorUser->id)->first();

        Loan::create([
            'client_profile_id' => $clientProfile->id,
            'collector_profile_id' => $collectorProfile->id,
            'amount' => 10000.00,
            'term' => 6,
            'interest_rate' => 10,
            'status' => 'ongoing',
            'disbursement_date' => now(), // Added disbursement_date
        ]);
    }
}
