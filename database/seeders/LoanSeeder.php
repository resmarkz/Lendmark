<?php

namespace Database\Seeders;

use App\Models\ClientProfile;
use App\Models\Loan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $client = ClientProfile::first();

        Loan::create([
            'client_profile_id' => $client->id,
            'amount' => 10000.00,
            'term' => 6,
            'interest_rate' => 5.5,
            'status' => 'approved',
        ]);
    }
}
