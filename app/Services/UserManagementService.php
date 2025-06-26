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

    public function addClient(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => 'client',
        ]);

        $user->clientProfile()->create([
            'address' => $data['address'],
            'contact_number' => $data['contact_number'],
            'date_of_birth' => $data['date_of_birth'],
            'source_of_income' => $data['source_of_income'],
        ]);

        return $user;
    }

    public function updateClient(User $client, array $data)
    {
        $client->update([
            "name" => $data["name"],
            "email" => $data["email"],

            // Only update password if it was provided
            'password' => $data['password'] ? bcrypt($data['password']) : $client->password
        ]);

        if ($client->clientProfile()) {
            $client->clientProfile()->update([
                'address' => $data['address'],
                'contact_number' => $data['contact_number'],
                'date_of_birth' => $data['date_of_birth'],
                'source_of_income' => $data['source_of_income']
            ]);
        }

        return $client;
    }

    public function deleteClient(User $client)
    {
        if ($client->clientProfile) {
            $client->clientProfile->delete();
        }

        $client->delete();
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

    public function getAdminData(User $admin)
    {
        return [
            'id' => $admin->id,
            'name' => $admin->name,
            'email' => $admin->email,
            'position' => $admin->adminProfile->position,
            'permissions' => json_decode($admin->adminProfile->permissions, true) ?? [],
        ];
    }

    public function getAgentData(User $agent)
    {
        return [
            'id' => $agent->id,
            'name' => $agent->name,
            'email' => $agent->email,
            'department_id' => $agent->agentProfile->department_id ?? null,
            'contact_number' => $agent->agentProfile->contact_number ?? null,
            'date_of_birth' => $agent->agentProfile->date_of_birth ?? null,
        ];
    }

    public function getClientData(User $client)
    {
        return [
            'id' => $client->id,
            'name' => $client->name,
            'email' => $client->email,
            'address' => $client->clientProfile->address ?? '',
            'contact_number' => $client->clientProfile->contact_number ?? '',
            'date_of_birth' => $client->clientProfile->date_of_birth ?? '',
            'source_of_income' => $client->clientProfile->source_of_income ?? '',
        ];
    }

    public function getClientDetails(User $client)
    {
        $client->load('clientProfile');
        return $client;
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
