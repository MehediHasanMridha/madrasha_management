<?php

use App\Http\Controllers\ClassController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StudentController;
use App\Models\Classes;
use App\Models\Department;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');
// Route::get('/', function () {
//     return Inertia::render('Welcome');
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        // $data = User::with('roles')->get();
        $data = Department::withCount([
            'academics as student_count' => function ($query) {
                $query->whereHas('student.roles', function ($q) {
                    $q->where('name', 'student');
                });
            },
            // 'academics as teacher_count' => function ($query) {
            //     $query->whereHas('student.classAssign', function ($q) {
            //         $q->where('dept_id', '==', 1);
            //     });
            // },
            'classAssign as teacher_count',
        ])->get();

        // dd($data);
        // return $data;

        return Inertia::render('Dashboard', ['data' => $data]);
    })->name('dashboard');
    Route::get("/department/{department_slug}", [DepartmentController::class, "view"])->name("department.view");
    Route::post("/department/{department_slug}/add_student", [StudentController::class, "add_student"])->name("student.add_student");

    //staff
    Route::get("/staff", [StaffController::class, "index"])->name("staff.index");
    Route::post("/staff/add", [StaffController::class, "store"])->name("staff.store");

    //settings
    Route::prefix("settings")->group(function () {
        Route::get("/", function () {
            return Inertia::render("settings/settingDashboard");
        })->name("settings");

        //department
        Route::prefix('department')->group(function () {
            Route::get('/', function () {
                $department = Department::all();
                return Inertia::render('Department/DepartmentView', ['departments' => $department]);

            })->name('department');
            Route::get('add', [DepartmentController::class, 'departmentCreateView'])->name('department.create');
            Route::post('add', [DepartmentController::class, 'departmentStore'])->name('department.store');
            Route::get('{department_slug}/edit', [DepartmentController::class, 'edit'])->name('department.edit');
            Route::post('{department_slug}/edit', [DepartmentController::class, 'update'])->name('department.update');
            Route::delete('{department_slug}/delete', [DepartmentController::class, 'destroy'])->name('department.delete');
        });

        //class
        Route::prefix('class')->group(function () {
            Route::get('/', function () {
                $classes = Classes::with('department')->get();
                return Inertia::render('Class/ClassView', ['classes' => $classes]);

            })->name('class');
            Route::get('add', [ClassController::class, 'classCreateView'])->name('class.create');
            Route::post('add', [ClassController::class, 'classStore'])->name('class.store');
            Route::get('{class_slug}/edit', [ClassController::class, 'edit'])->name('class.edit');
            Route::post('{class_slug}/edit', [ClassController::class, 'update'])->name('class.update');
            Route::delete('{class_slug}/delete', [ClassController::class, 'destroy'])->name('class.delete');
        });

    });

    //assign teacher to department
    Route::get('/assign-teacher', [StaffController::class, 'assign_staff'])->name('assign.staff');
    Route::post('/assign-teacher-to-department', [StaffController::class, 'assign_staff_store'])->name('assign.staff.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/command.php';
