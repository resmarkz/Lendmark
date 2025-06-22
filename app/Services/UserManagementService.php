<?php

namespace App\Services;

use App\Models\User;

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
}
