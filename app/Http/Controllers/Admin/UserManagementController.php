<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function viewAdmins()
    {
        $admins = User::where('role', 'admin')
            ->with('adminProfile')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'admin_profile' => $user->adminProfile,
                ];
            });

        return inertia('Dashboard/admin/manage-users/admins/index', [
            'admins' => $admins,
        ]);
    }

    public  function viewAgents()
    {
        $agents = User::where('role', 'agent')
            ->with('agentProfile')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'agent_profile' => $user->agentProfile,
                ];
            });

        return inertia('Dashboard/admin/manage-users/agents/index', [
            'agents' => $agents,
        ]);
    }

    public function viewClients()
    {
        $clients = User::where('role', 'client')
            ->with('clientProfile')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'client_profile' => $user->clientProfile,
                ];
            });

        return inertia('Dashboard/admin/manage-users/clients/index', [
            'clients' => $clients,
        ]);
    }
}
