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
        User::create(['name' => 'Admin User', 'email' => 'admin@example.com', 'password' => Hash::make('password'), 'role' => 'admin']);
        User::create(['name' => 'Collector One', 'email' => 'collector1@example.com', 'password' => Hash::make('password'), 'role' => 'collector']);
        User::create(['name' => 'Client User', 'email' => 'client@example.com', 'password' => Hash::make('password'), 'role' => 'client']);
    }
}