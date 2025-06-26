<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAdminRequest;
use App\Http\Requests\Admin\UpdateAdminRequest;
use App\Http\Requests\Agent\StoreAgentRequest;
use App\Http\Requests\Agent\UpdateAgentRequest;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Models\User;
use App\Services\UserManagementService;
use Illuminate\Support\Facades\Auth;

class UserManagementController extends Controller
{
    protected $userService;

    public function __construct(UserManagementService $userManagementService)
    {
        $this->userService = $userManagementService;
    }

    // Admin Methods
    public function viewAdmins()
    {
        return inertia('Dashboard/admin/manage-users/admins/index', [
            'admins' => $this->userService->getAdmins(),
        ]);
    }

    public function viewCreateAdmin()
    {
        return inertia('Dashboard/admin/manage-users/admins/create', [
            'availablePermissions' => $this->userService->getAvailablePermissions()
        ]);
    }

    public function storeAdmin(StoreAdminRequest $request)
    {
        $this->userService->addAdmin($request->validated());

        return redirect()->route('admin.manage-users.admins.index')
            ->with('success', 'Admin created successfully');
    }

    public function viewEditAdmin(User $admin)
    {
        return inertia('Dashboard/admin/manage-users/admins/edit', [
            'admin' => $this->userService->getAdminData($admin),
            'availablePermissions' => $this->userService->getAvailablePermissions()
        ]);
    }

    public function updateAdmin(UpdateAdminRequest $request, User $admin)
    {
        $this->userService->updateAdmin($admin, $request->validated());

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

    // Agent Methods
    public function viewAgents()
    {
        return inertia('Dashboard/admin/manage-users/agents/index', [
            'agents' => $this->userService->getAgents(),
        ]);
    }

    public function viewCreateAgent()
    {
        return inertia('Dashboard/admin/manage-users/agents/create', [
            'departments' => $this->userService->getDepartments(),
        ]);
    }

    public function storeAgent(StoreAgentRequest $request)
    {
        $this->userService->addAgent($request->validated());

        return redirect()->route('admin.manage-users.agents.index')
            ->with('success', 'Agent created successfully');
    }

    public function viewEditAgent(User $agent)
    {
        return inertia('Dashboard/admin/manage-users/agents/edit', [
            'agent' => $this->userService->getAgentData($agent),
            'departments' => $this->userService->getDepartments(),
        ]);
    }

    public function updateAgent(UpdateAgentRequest $request, User $agent)
    {
        $this->userService->updateAgent($agent, $request->validated());

        return redirect()->route('admin.manage-users.agents.index')
            ->with('success', 'Agent updated successfully');
    }

    public function destroyAgent(User $agent)
    {
        $this->userService->deleteAgent($agent);

        return redirect()->route('admin.manage-users.agents.index')
            ->with('success', 'Agent deleted successfully');
    }

    // Client Methods
    public function viewClients()
    {
        return inertia('Dashboard/admin/manage-users/clients/index', [
            'clients' => $this->userService->getClients(),
        ]);
    }

    public function viewCreateClient()
    {
        return inertia('Dashboard/admin/manage-users/clients/create');
    }

    public function storeClient(StoreClientRequest $request)
    {
        $this->userService->addClient($request->validated());

        return redirect()->route('admin.manage-users.clients.index')
            ->with('success', 'Client created successfully');
    }

    public function viewEditClient(User $client)
    {
        return inertia('Dashboard/admin/manage-users/clients/edit', [
            'client' => $this->userService->getClientData($client)
        ]);
    }

    public function updateClient(UpdateClientRequest $request, User $client)
    {
        $this->userService->updateClient($client, $request->validated());

        return redirect()->route('admin.manage-users.clients.index')
            ->with('success', 'Client updated successfully');
    }

    public function showClient(User $client)
    {
        return inertia('Dashboard/admin/manage-users/clients/show', [
            'client' => $this->userService->getClientDetails($client)
        ]);
    }

    public function destroyClient(User $client)
    {
        $this->userService->deleteClient($client);

        return redirect()->route('admin.manage-users.clients.index')
            ->with('success', 'Client deleted successfully');
    }
}
