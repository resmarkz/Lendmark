<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run()
    {
        Department::create([
            'name' => 'Telemarketer',
            'description' => 'Handles client calls and marketing',
        ]);

        Department::create([
            'name' => 'Collection',
            'description' => 'Responsible for payment collections',
        ]);
    }
}
