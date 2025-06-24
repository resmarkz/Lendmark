<?php

namespace App\Services;

use App\Models\Department;
use App\Models\User;
use Illuminate\Support\Arr;

class UserManagementService
{
    protected $paginate;

    public function __construct($paginate = 10)
    {
        $this->paginate = $paginate;
    }

    public function getAdmins()
    {
        return User::where('role', 'admin')
            ->with('adminProfile')
            ->orderBy('created_at', 'desc')
            ->paginate($this->paginate);
    }

    public function getAgents()
    {
        return User::where('role', 'agent')
            ->with('agentProfile', 'agentProfile.department')
            ->orderBy('created_at', 'desc')
            ->paginate($this->paginate);
    }

    public function addAgent(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => 'agent',
        ]);

        $user->agentProfile()->create([
            'department_id' => $data['department_id'],
            'contact_number' => $data['contact_number'],
            'date_of_birth' => $data['date_of_birth'],
        ]);

        return $user;
    }

    public function updateAgent(User $agent, array $data)
    {
        $agent->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        if ($agent->agentProfile) {
            $agent->agentProfile->update([
                'department_id' => $data['department_id'],
                'contact_number' => $data['contact_number'],
                'date_of_birth' => $data['date_of_birth'],
            ]);
        }

        return $agent;
    }

    public function deleteAgent(User $agent)
    {
        if ($agent->agentProfile) {
            $agent->agentProfile->delete();
        }

        $agent->delete();
    }

    public function getClients()
    {
        return User::where('role', 'client')
            ->with('clientProfile')
            ->orderBy('created_at', 'desc')
            ->paginate($this->paginate);
    }

    public function addAdmin(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => 'admin',
        ]);

        $user->adminProfile()->create([
            'position' => $data['position'],
            'permissions' => json_encode($data['permissions'] ?? []),
        ]);

        return $user;
    }

    public function updateAdmin(User $admin, array $data)
    {
        $data['permissions'] = $this->cleanPermissions($data['permissions'] ?? []);

        $admin->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        $admin->adminProfile()->update([
            'position' => $data['position'],
            'permissions' => json_encode($data['permissions']),
        ]);

        return $admin;
    }

    public function deleteAdmin(User $admin)
    {
        if ($admin->adminProfile) {
            $admin->adminProfile->delete();
        }

        $admin->delete();
    }

    public function getAvailablePermissions()
    {
        return [
            'manage_users',
            'manage_loans',
            'manage_transactions',
            'view_reports',
            'system_settings'
        ];
    }

    public function getDepartments()
    {
        return Department::all();
    }

    protected function cleanPermissions(array $permissions): array
    {
        return array_values(array_filter(
            $permissions,
            fn($permission) => !is_null($permission) && $permission !== ''
        ));
    }
}
