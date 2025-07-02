<?php

use App\Http\Controllers\PartialController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/get-all-departments', [PartialController::class, 'getAllDepartments'])
        ->name('get.all.departments');
});
