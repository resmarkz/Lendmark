<?php

namespace Database\Seeders;

use App\Models\AdminProfile;
use App\Models\CollectorProfile;
use App\Models\ClientProfile;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            ['name' => 'Admin User', 'email' => 'admin@example.com', 'password' => Hash::make('password'), 'role' => 'admin'],
            ['name' => 'Collector One', 'email' => 'collector1@example.com', 'password' => Hash::make('password'), 'role' => 'collector'],
            ['name' => 'Client User', 'email' => 'client@example.com', 'password' => Hash::make('password'), 'role' => 'client'],
        ]);
    }
}