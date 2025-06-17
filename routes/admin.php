<?php

use App\Http\Controllers\LoanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/overview', function () {
    return Inertia::render('Dashboard/admin/overview/index');
})->middleware(['auth', 'verified'])->name('dashboard.admin.overview');

Route::get('/loans', [LoanController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard.admin.loans');

Route::get('/manage-users', function () {
    return Inertia::render('Dashboard/admin/manage-users/index');
})->middleware(['auth', 'verified'])->name('dashboard.manage-users.loans');
