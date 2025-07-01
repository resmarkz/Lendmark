<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAdminRequest;
use App\Http\Requests\Admin\UpdateAdminRequest;
use App\Http\Requests\Collector\StoreCollectorRequest;
use App\Http\Requests\Collector\UpdateCollectorRequest;
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
        return inertia('Dashboard/admin/manage-users/admins/create');
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

    // Collector Methods
    public function viewCollectors()
    {
        return inertia('Dashboard/admin/manage-users/collectors/index', [
            'collectors' => $this->userService->getCollectors(),
        ]);
    }

    public function viewCreateCollector()
    {
        return inertia('Dashboard/admin/manage-users/collectors/create');
    }

    public function storeCollector(StoreCollectorRequest $request)
    {
        $this->userService->addCollector($request->validated());

        return redirect()->route('admin.manage-users.collectors.index')
            ->with('success', 'Collector created successfully');
    }

    public function viewEditCollector(User $collector)
    {
        return inertia('Dashboard/admin/manage-users/collectors/edit', [
            'collector' => $this->userService->getCollectorData($collector),
        ]);
    }

    public function updateCollector(UpdateCollectorRequest $request, User $collector)
    {
        $this->userService->updateCollector($collector, $request->validated());

        return redirect()->route('admin.manage-users.collectors.index')
            ->with('success', 'Collector updated successfully');
    }

    public function destroyCollector(User $collector)
    {
        $this->userService->deleteCollector($collector);

        return redirect()->route('admin.manage-users.collectors.index')
            ->with('success', 'Collector deleted successfully');
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