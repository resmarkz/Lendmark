<?php

namespace Database\Seeders;

use App\Models\AdminProfile;
use App\Models\AgentProfile;
use App\Models\ClientProfile;
use App\Models\Department;
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
            ['name' => 'Agent One', 'email' => 'agent1@example.com', 'password' => Hash::make('password'), 'role' => 'agent'],
            ['name' => 'Client User', 'email' => 'client@example.com', 'password' => Hash::make('password'), 'role' => 'client'],
        ]);
    }
}
