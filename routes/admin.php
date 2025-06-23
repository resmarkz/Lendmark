<?php

use App\Http\Controllers\Admin\LoanManagementController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/overview', function () {
    return Inertia::render('Dashboard/admin/overview/index');
})->middleware(['auth', 'verified'])->name('dashboard.admin.overview');

Route::get('/loans', [LoanManagementController::class, 'viewLoans'])->middleware(['auth', 'verified'])->name('dashboard.admin.loans');

Route::middleware(['auth', 'verified'])
    ->prefix('manage-users')
    ->name('admin.manage-users.')
    ->group(function () {
        // Admins routes
        Route::prefix('admins')->name('admins.')->group(function () {
            Route::get('/', [UserManagementController::class, 'viewAdmins'])->name('index');
            Route::get('/create', [UserManagementController::class, 'viewCreateAdmin'])->name('create');
            Route::post('/', [UserManagementController::class, 'storeAdmin'])->name('store');
        });

        // Clients route
        Route::get('/clients', [UserManagementController::class, 'viewClients'])->name('clients.index');

        // Agents route
        Route::get('/agents', [UserManagementController::class, 'viewAgents'])->name('agents.index');
    });
