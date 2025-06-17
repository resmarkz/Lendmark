<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/overview', function () {
    return Inertia::render('Dashboard/admin/overview/index');
})->middleware(['auth', 'verified'])->name('dashboard.admin.overview');

Route::get('/loans', function () {
    return Inertia::render('Dashboard/admin/loans/index');
})->middleware(['auth', 'verified'])->name('dashboard.admin.loans');
