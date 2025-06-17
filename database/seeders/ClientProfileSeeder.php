<?php

namespace Database\Seeders;

use App\Models\ClientProfile;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = User::where('role', 'client')->get();

        foreach ($clients as $user) {
            ClientProfile::create([
                'user_id' => $user->id,
                'address' => '123 Sample St',
                'contact_number' => '09171234567',
                'date_of_birth' => now()->subYears(25)->format('Y-m-d'),
                'source_of_income' => 'Employment',
            ]);
        }
    }
}
