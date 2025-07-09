<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LoanManagementController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/overview', [DashboardController::class, 'viewOverview'])->middleware(['auth', 'verified'])->name('dashboard.admin.overview');


Route::middleware(['auth', 'verified'])
    ->prefix('loans')
    ->name('admin.loans.')
    ->group(function () {
        Route::get('/', [LoanManagementController::class, 'viewLoans'])->name('index');
        Route::get('/create', [LoanManagementController::class, 'viewCreateLoan'])->name('create');
        Route::get('/{loan}', [LoanManagementController::class, 'viewLoan'])->name('show');
        Route::get('/{loan}/edit', [LoanManagementController::class, 'viewEditLoan'])->name('edit');
        Route::post('/', [LoanManagementController::class, 'addLoan'])->name('store');
        Route::put('/{loan}', [LoanManagementController::class, 'updateLoan'])->name('update');
        Route::delete('/{loan}', [LoanManagementController::class, 'destroyLoan'])->name('destroy');
    });

Route::middleware(['auth', 'verified'])
    ->prefix('manage-users')
    ->name('admin.manage-users.')
    ->group(function () {
        Route::prefix('admins')->name('admins.')->group(function () {
            Route::get('/', [UserManagementController::class, 'viewAdmins'])->name('index');
            Route::get('/create', [UserManagementController::class, 'viewCreateAdmin'])->name('create');
            Route::post('/', [UserManagementController::class, 'storeAdmin'])->name('store');
            Route::get('/{admin}/edit', [UserManagementController::class, 'viewEditAdmin'])->name('edit');
            Route::put('/{admin}', [UserManagementController::class, 'updateAdmin'])->name('update');
            Route::delete('/{admin}', [UserManagementController::class, 'destroyAdmin'])->name('destroy');
        });

        Route::prefix('clients')->name('clients.')->group(function () {
            Route::get('/', [UserManagementController::class, 'viewClients'])->name('index');
            Route::get('/create', [UserManagementController::class, 'viewCreateClient'])->name('create');
            Route::post('/', [UserManagementController::class, 'storeClient'])->name('store');
            Route::get('/{client}/edit', [UserManagementController::class, 'viewEditClient'])->name('edit');
            Route::put('/{client}', [UserManagementController::class, 'updateClient'])->name('update');
            Route::get('/{client}', [UserManagementController::class, 'showClient'])->name('show');
            Route::delete('/{client}', [UserManagementController::class, 'destroyClient'])->name('destroy');
        });

        Route::prefix('collectors')->name('collectors.')->group(function () {
            Route::get('/', [UserManagementController::class, 'viewCollectors'])->name('index');
            Route::get('/create', [UserManagementController::class, 'viewCreateCollector'])->name('create');
            Route::post('/', [UserManagementController::class, 'storeCollector'])->name('store');
            Route::get('/{collector}/edit', [UserManagementController::class, 'viewEditCollector'])->name('edit');
            Route::put('/{collector}', [UserManagementController::class, 'updateCollector'])->name('update');
            Route::delete('/{collector}', [UserManagementController::class, 'destroyCollector'])->name('destroy');
        });
    });
