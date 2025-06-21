<?php

use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\LoanController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/overview', function () {
    return Inertia::render('Dashboard/admin/overview/index');
})->middleware(['auth', 'verified'])->name('dashboard.admin.overview');

Route::get('/loans', [LoanController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard.admin.loans');

Route::middleware(['auth', 'verified'])
    ->prefix('manage-users')
    ->name('dashboard.manage-users.')
    ->group(function () {
        Route::get('/admins', [UserManagementController::class, 'viewAdmins'])->name('admins');
        Route::get('/clients', [UserManagementController::class, 'viewClients'])->name('clients');
        Route::get('/agents', [UserManagementController::class, 'viewAgents'])->name('agents');
    });
