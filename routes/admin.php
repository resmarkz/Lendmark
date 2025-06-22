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

Route::middleware(['auth'])
    ->prefix('manage-users')
    ->name('dashboard.manage-users.')
    ->group(function () {
        Route::get('/admins', [UserManagementController::class, 'viewAdmins'])->name('admins');
        Route::get('/clients', [UserManagementController::class, 'viewClients'])->name('clients');
        Route::get('/agents', [UserManagementController::class, 'viewAgents'])->name('agents');
    });
