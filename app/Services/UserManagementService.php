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

    public function getCollectors()
    {
        return User::where('role', 'collector')
            ->with('collectorProfile')
            ->orderBy('created_at', 'desc')
            ->paginate($this->paginate);
    }

    public function addCollector(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => 'collector',
        ]);

        $user->collectorProfile()->create([
            'contact_number' => $data['contact_number'],
            'date_of_birth' => $data['date_of_birth'],
        ]);

        return $user;
    }

    public function updateCollector(User $collector, array $data)
    {
        $collector->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        if ($collector->collectorProfile) {
            $collector->collectorProfile->update([
                'contact_number' => $data['contact_number'],
                'date_of_birth' => $data['date_of_birth'],
            ]);
        }

        return $collector;
    }

    public function deleteCollector(User $collector)
    {
        if ($collector->collectorProfile) {
            $collector->collectorProfile->delete();
        }

        $collector->delete();
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
        $userData = [
            "name" => $data["name"],
            "email" => $data["email"],
        ];

        if (!empty($data['password'])) {
            $userData['password'] = bcrypt($data['password']);
        }

        $client->update($userData);

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

        $user->adminProfile()->create([]);

        return $user;
    }

    public function updateAdmin(User $admin, array $data)
    {
        $admin->update([
            'name' => $data['name'],
            'email' => $data['email'],
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
        ];
    }

    public function getCollectorData(User $collector)
    {
        return [
            'id' => $collector->id,
            'name' => $collector->name,
            'email' => $collector->email,
            'contact_number' => $collector->collectorProfile->contact_number ?? null,
            'date_of_birth' => $collector->collectorProfile->date_of_birth ?? null,
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
        $client->load(['clientProfile.loans.payments']);
        return $client;
    }
}
