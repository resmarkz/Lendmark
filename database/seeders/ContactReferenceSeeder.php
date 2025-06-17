<?php

namespace Database\Seeders;

use App\Models\ClientProfile;
use App\Models\ContactReference;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactReferenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $client = ClientProfile::first();

        ContactReference::create([
            'client_profile_id' => $client->id,
            'name' => 'Juan Dela Cruz',
            'contact_number' => '09181234567',
            'relationship' => 'Brother',
            'source_of_income' => 'Freelance',
        ]);
    }
}
