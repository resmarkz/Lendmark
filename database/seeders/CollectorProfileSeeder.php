<?php

namespace Database\Seeders;

use App\Models\CollectorProfile;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CollectorProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $collector = User::where('email', 'collector1@example.com')->first();

        CollectorProfile::create([
            'user_id' => $collector->id,
            'contact_number' => '09171234567',
            'date_of_birth' => '1995-05-10',
        ]);
    }
}