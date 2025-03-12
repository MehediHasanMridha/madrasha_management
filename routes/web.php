<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/migrate_database', function () {
    Artisan::call('migrate:fresh');
});

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get("/department/{department_slug}", [DepartmentController::class, "view"])->name("department.view");
    Route::post("/department/{department_slug}/add_student", [StudentController::class, "add_student"])->name("student.add_student");
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
