<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserManagementService;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    protected $userService;
    public function __construct(UserManagementService $userManagementService)
    {
        $this->userService = $userManagementService;
    }
    public function viewAdmins()
    {
        return inertia('Dashboard/admin/manage-users/admins/index', [
            'admins' => $this->userService->getAdmins(),
        ]);
    }

    public function viewCreateAdmin()
    {
        return inertia('Dashboard/admin/manage-users/admins/create', [
            'availablePermissions' => [
                'manage_users',
                'manage_loans',
                'manage_transactions',
                'view_reports',
                'system_settings'
            ]
        ]);
    }

    public function storeAdmin(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
            'position' => 'required|string|max:255',
            'permissions' => 'sometimes|array',
        ]);

        $this->userService->addAdmin($validated);

        return redirect()->route('admin.manage-users.admins.index')
            ->with('success', 'Admin created successfully');
    }

    public  function viewAgents()
    {
        return inertia('Dashboard/admin/manage-users/agents/index', [
            'agents' => $this->userService->getAgents(),
        ]);
    }

    public function viewClients()
    {
        return inertia('Dashboard/admin/manage-users/clients/index', [
            'clients' => $this->userService->getClients(),
        ]);
    }
}
