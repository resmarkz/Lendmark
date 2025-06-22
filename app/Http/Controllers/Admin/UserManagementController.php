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
