<?php

namespace Database\Seeders;

use App\Models\AdminProfile;
use App\Models\AgentProfile;
use App\Models\ClientProfile;
use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // CLIENT
        $client = User::create([
            'name' => 'Client User',
            'email' => 'client@example.com',
            'password' => bcrypt('password'),
            'role' => 'client',
        ]);

        ClientProfile::create([
            'user_id' => $client->id,
            'address' => '123 Client St.',
            'contact_number' => '09123456789',
            'date_of_birth' => '2000-01-01',
            'source_of_income' => 'Freelance',
        ]);

        // AGENT
        $agent = User::create([
            'name' => 'Agent User',
            'email' => 'agent@example.com',
            'password' => bcrypt('password'),
            'role' => 'agent',
        ]);

        $teleDept = Department::where('name', 'Telemarketer')->first();

        AgentProfile::create([
            'user_id' => $agent->id,
            'department_id' => $teleDept->id,
            'contact_number' => '09998887777',
            'date_of_birth' => '1995-05-20',
        ]);

        // ADMIN
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        AdminProfile::create([
            'user_id' => $admin->id,
            'position' => 'Super Admin',
            'permissions' => json_encode(['manage_users', 'view_reports', 'edit_loans']),
        ]);
    }
}
