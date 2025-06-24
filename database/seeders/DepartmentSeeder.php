<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run()
    {
        Department::insert([
            ['name' => 'TELEMARKETERS', 'description' => 'Handles loan outreach'],
            ['name' => 'COLLECTIONS', 'description' => 'Handles loan collections'],
        ]);
    }
}
