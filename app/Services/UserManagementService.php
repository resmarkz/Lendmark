<?php

namespace App\Services;

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
}
