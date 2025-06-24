<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserManagementService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function viewEditAdmin(User $admin)
    {
        return inertia('Dashboard/admin/manage-users/admins/edit', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'position' => $admin->adminProfile->position,
                'permissions' => json_decode($admin->adminProfile->permissions, true) ?? [],
            ],
            'availablePermissions' => $this->userService->getAvailablePermissions()
        ]);
    }

    public function updateAdmin(Request $request, User $admin)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $admin->id,
            'position' => 'required|string|max:255',
            'permissions' => 'sometimes|array',
        ]);

        $this->userService->updateAdmin($admin, $validated);

        return redirect()->route('admin.manage-users.admins.index')
            ->with('success', 'Admin updated successfully');
    }

    public function destroyAdmin(User $admin)
    {
        if ($admin->id === Auth::id()) {
            return redirect()->back()
                ->with('error', 'You cannot delete your own account');
        }

        $this->userService->deleteAdmin($admin);

        return redirect()->route('admin.manage-users.admins.index')
            ->with('success', 'Admin deleted successfully');
    }

    public  function viewAgents()
    {
        return inertia('Dashboard/admin/manage-users/agents/index', [
            'agents' => $this->userService->getAgents(),
        ]);
    }

    public function viewCreateAgent()
    {
        $departments = $this->userService->getDepartments();
        return inertia('Dashboard/admin/manage-users/agents/create', [
            'departments' => $departments,
        ]);
    }

    public function viewEditAgent(User $agent)
    {
        $departments = $this->userService->getDepartments();
        return inertia('Dashboard/admin/manage-users/agents/edit', [
            'agent' => [
                'id' => $agent->id,
                'name' => $agent->name,
                'email' => $agent->email,
                'department_id' => $agent->agentProfile->department_id ?? null,
                'contact_number' => $agent->agentProfile->contact_number ?? null,
                'date_of_birth' => $agent->agentProfile->date_of_birth ?? null,
            ],
            'departments' => $departments,
        ]);
    }

    public function updateAgent(Request $request, User $agent)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $agent->id,
            'department_id' => 'required|exists:departments,id',
            'contact_number' => 'required|string|max:15',
            'date_of_birth' => 'required|date',
        ]);

        $this->userService->updateAgent($agent, $validated);

        return redirect()->route('admin.manage-users.agents.index')
            ->with('success', 'Agent updated successfully');
    }

    public function storeAgent(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
            'department_id' => 'required|exists:departments,id',
            'contact_number' => 'required|string|max:15',
            'date_of_birth' => 'required|date',
        ]);

        $this->userService->addAgent($validated);

        return redirect()->route('admin.manage-users.agents.index')
            ->with('success', 'Agent created successfully');
    }

    public function destroyAgent(User $agent)
    {
        $this->userService->deleteAgent($agent);

        return redirect()->route('admin.manage-users.agents.index')
            ->with('success', 'Agent deleted successfully');
    }

    public function viewClients()
    {
        return inertia('Dashboard/admin/manage-users/clients/index', [
            'clients' => $this->userService->getClients(),
        ]);
    }
}
