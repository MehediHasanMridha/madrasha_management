<?php

use App\Http\Controllers\ClassController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StudentController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, "index"])->name('dashboard');
    Route::prefix('department')->group(function () {
        Route::get("/students/{department_slug}", [DepartmentController::class, "students_show"])->name("department.students_show");
        Route::get("/teachers/{department_slug}", [DepartmentController::class, "teachers_show"])->name("department.teachers_show");
    });
    Route::post("/student/{department_slug}/add_student", [StudentController::class, "add_student"])->name("student.add_student");
    Route::post("/student/{student_id}/update", [StudentController::class, "update_student"])->name("student.update_student");

    // delete user
    Route::delete('/user/{id}', function ($id) {
        $user = User::find($id);
        $user->delete();
        return back();
    })->name('user.delete');

    //staff
    Route::get("/staff", [StaffController::class, "index"])->name("staff.index");
    Route::post("/staff/add", [StaffController::class, "store"])->name("staff.store");
    Route::post("/staff/{id}/update", [StaffController::class, "update"])->name("staff.update");
    Route::delete("/staff/{id}", [StaffController::class, "destroy"])->name("staff.delete");

    //settings
    Route::prefix("settings")->group(function () {
        Route::get("/", function () {
            return Inertia::render("settings/settingDashboard");
        })->name("settings");

        //department
        Route::prefix('department')->group(function () {
            Route::get('/', [DepartmentController::class, 'index'])->name('department');
            Route::get('add', [DepartmentController::class, 'departmentCreateView'])->name('department.create');
            Route::post('add', [DepartmentController::class, 'departmentStore'])->name('department.store');
            Route::get('{department_slug}/edit', [DepartmentController::class, 'departmentEditView'])->name('department.edit');
            Route::post('{department_slug}/edit', [DepartmentController::class, 'departmentUpdate'])->name('department.update');
            Route::delete('{department_slug}/delete', [DepartmentController::class, 'departmentDelete'])->name('department.delete');
        });

        //class
        Route::prefix('class')->group(function () {
            Route::get('/', [ClassController::class, 'index'])->name('class');
            Route::post('store', [ClassController::class, 'classStore'])->name('class.store');
            Route::post('{class_slug}/update', [ClassController::class, 'update'])->name('class.update');
            Route::delete('{class_slug}/delete', [ClassController::class, 'destroy'])->name('class.delete');
        });

    });

    //assign teacher to department
    Route::get('/assign-teacher', [StaffController::class, 'assign_staff'])->name('assign.staff');
    Route::post('/assign-teacher-to-department', [StaffController::class, 'assign_staff_store'])->name('assign.staff.store');
    Route::delete('/unassign-teacher-to-department', [StaffController::class, 'unassign_staff_store'])->name('unassign.staff.store');

    //finance routes
    Route::prefix('finance')->group(function () {
        Route::get('/summary', [FinanceController::class, 'summary'])->name('finance.summary');
        Route::get('/earnings', [FinanceController::class, 'earnings'])->name('finance.earnings');
        Route::get('/outgoings', [FinanceController::class, 'outgoings'])->name('finance.outgoings');
        Route::get('/monthly-reports', [FinanceController::class, 'monthlyReports'])->name('finance.monthly-reports');
        Route::get('/get_user_data/{user_id}', [FinanceController::class, 'get_user_data'])->name('finance.get_user_data');
        Route::post('/add_money', [FinanceController::class, 'add_money'])->name('finance.add_money');
        Route::post('/add_voucher', [FinanceController::class, 'add_voucher'])->name('finance.add_voucher');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/command.php';
