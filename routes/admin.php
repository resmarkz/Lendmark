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
            Route::get('/{admin}/edit', [UserManagementController::class, 'viewEditAdmin'])->name('edit');
            Route::put('/{admin}', [UserManagementController::class, 'updateAdmin'])->name('update');
            Route::delete('/{admin}', [UserManagementController::class, 'destroyAdmin'])->name('destroy');
        });

        // Clients route
        Route::prefix('clients')->name('clients.')->group(function () {
            Route::get('/', [UserManagementController::class, 'viewClients'])->name('index');
            Route::get('/create', [UserManagementController::class, 'viewCreateClient'])->name('create');
            Route::post('/', [UserManagementController::class, 'storeClient'])->name('store');
            Route::get('/{client}/edit', [UserManagementController::class, 'viewEditClient'])->name('edit');
            Route::put('/{client}', [UserManagementController::class, 'updateClient'])->name('update');
            Route::get('/{client}', [UserManagementController::class, 'showClient'])->name('show');
            Route::delete('/{client}', [UserManagementController::class, 'destroyClient'])->name('destroy');
        });

        // Agents route
        Route::prefix('agents')->name('agents.')->group(function () {
            Route::get('/', [UserManagementController::class, 'viewAgents'])->name('index');
            Route::get('/create', [UserManagementController::class, 'viewCreateAgent'])->name('create');
            Route::post('/', [UserManagementController::class, 'storeAgent'])->name('store');
            Route::get('/{agent}/edit', [UserManagementController::class, 'viewEditAgent'])->name('edit');
            Route::put('/{agent}', [UserManagementController::class, 'updateAgent'])->name('update');
            Route::delete('/{agent}', [UserManagementController::class, 'destroyAgent'])->name('destroy');
        });
    });
