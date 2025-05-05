<?php

use App\Http\Controllers\Settings\FeeTypeController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    // Fee Type Routes
    Route::resource('settings/fee-types', FeeTypeController::class)
        ->names([
            'index'   => 'settings.fee-types.index',
            'create'  => 'settings.fee-types.create',
            'store'   => 'settings.fee-types.store',
            'edit'    => 'settings.fee-types.edit',
            'update'  => 'settings.fee-types.update',
            'destroy' => 'settings.fee-types.destroy',
        ]);
});
