<?php

namespace Database\Seeders;

use App\Models\AgentProfile;
use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgentProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agent = User::where('email', 'agent1@example.com')->first();
        $department = Department::where('name', 'Telemarketer')->first();

        AgentProfile::create([
            'user_id' => $agent->id,
            'department_id' => $department->id,
            'contact_number' => '09171234567',
            'date_of_birth' => '1995-05-10',
        ]);
    }
}
