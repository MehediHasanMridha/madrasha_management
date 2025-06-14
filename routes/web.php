<?php

use App\Http\Controllers\ClassController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\VoucherTypeController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('dashboard', [DashboardController::class, "index"])->name('dashboard');

    // Department
    Route::prefix('department')->group(function () {
        Route::get('/teachers/{department_slug}', [DepartmentController::class, 'teachers_show'])->name('department.teachers_show');

        // Student
        Route::prefix('students')->group(function () {
            Route::get('{department_slug}', [DepartmentController::class, 'students_show'])->name('department.students_show');
            Route::get('{department_slug}/{student_id}', [StudentController::class, 'show_student_info'])->name('show_student_info');
            Route::post('{department_slug}/add_student', [StudentController::class, 'add_student'])->name('student.add_student');
            Route::post('{student_id}/update', [StudentController::class, 'update_student'])->name('student.update_student');
        });
        Route::prefix('exams')->group(function () {
            Route::get('{department_slug}', [DepartmentController::class, 'exams_show'])->name('department.exams_show');
            Route::post('{department_slug}/store', [DepartmentController::class, 'storeExam'])->name('department.exams.store');
            Route::put('{department_slug}/{exam_id}/update', [DepartmentController::class, 'updateExam'])->name('department.exams.update');
            Route::delete('/{exam}', [DepartmentController::class, 'destroyExam'])->name('department.exams.delete');
            Route::get('{exam_slug}/{department_slug}', [DepartmentController::class, 'exams_details'])->name('department.exams_details');
        });

        // Global Exam Management Routes
        Route::prefix('exam-management')->group(function () {
            Route::get('/', [ExamController::class, 'index'])->name('exams.index');
            Route::get('/create', [ExamController::class, 'create'])->name('exams.create');
            Route::post('/', [ExamController::class, 'store'])->name('exams.store');
            Route::get('/{exam}', [ExamController::class, 'show'])->name('exams.show');
            Route::get('/{exam}/edit', [ExamController::class, 'edit'])->name('exams.edit');
            Route::put('/{exam}', [ExamController::class, 'update'])->name('exams.update');
            Route::delete('/{exam}', [ExamController::class, 'destroy'])->name('exams.destroy');
            Route::post('/{exam}/publish', [ExamController::class, 'publish'])->name('exams.publish');
            Route::post('/{exam}/unpublish', [ExamController::class, 'unpublish'])->name('exams.unpublish');
        });

        // API Routes for Frontend
        Route::prefix('api')->group(function () {
            Route::get('/departments/{departmentId}/exams', [ExamController::class, 'getByDepartment'])->name('api.department.exams');
        });

        // Assign/Unassign Teacher to Department
        Route::get('/get-assign-teacher', [StaffController::class, 'assign_staff'])->name('get_assign_staff_data');
        Route::post('/assign-teacher-to-department', [StaffController::class, 'assign_staff_store'])->name('assign.staff.store');
        Route::delete('/unassign-teacher-to-department', [StaffController::class, 'unassign_staff_store'])->name('unassign.staff.store');
    });

    // User
    Route::delete('/user/{id}', function ($id) {
        $user = User::find($id);
        $user?->delete();
        return back();
    })->name('user.delete');

    // Staff
    Route::prefix('staff')->group(function () {
        Route::get('/', [StaffController::class, 'index'])->name('staff.index');
        Route::post('add', [StaffController::class, 'store'])->name('staff.store');
        Route::post('{id}/update', [StaffController::class, 'update'])->name('staff.update');
        Route::delete('{id}', [StaffController::class, 'destroy'])->name('staff.delete');
    });

    // Settings
    Route::prefix('settings')->group(function () {

        Route::get('/', fn() => Inertia::render('admin::settings/index'))->name('settings');

        // Department Settings
        Route::prefix('department')->group(function () {
            Route::get('/', [DepartmentController::class, 'index'])->name('department.index');
            Route::get('add', [DepartmentController::class, 'departmentCreateView'])->name('department.create');
            Route::post('add', [DepartmentController::class, 'departmentStore'])->name('department.store');
            Route::get('{department_slug}/edit', [DepartmentController::class, 'departmentEditView'])->name('department.edit');
            Route::post('{department_slug}/edit', [DepartmentController::class, 'departmentUpdate'])->name('department.update');
            Route::delete('{department_slug}/delete', [DepartmentController::class, 'departmentDelete'])->name('department.delete');
            Route::get('classes/{department_slug}', [DepartmentController::class, 'departmentClasses'])->name('department.classes');
            Route::post('class/store', [ClassController::class, 'classStore'])->name('class.store');
            Route::put('{class_slug}/update', [ClassController::class, 'update'])->name(name: 'class.update');
            Route::delete('classes/{class_slug}/delete', [ClassController::class, 'destroyClass'])->name('department.class_delete');
        });

        // Fee Settings
        Route::prefix('fee-categories')->group(function () {
            Route::get('/fee', [FeeController::class, 'feeIndex'])->name('fee.fee_index');
            Route::get('create', [FeeController::class, 'create'])->name('settings.fee-types.create');
            Route::post('/store', [FeeController::class, 'store'])->name('fee.fee-types.store');
            Route::get('{fee}/edit', [FeeController::class, 'edit'])->name('settings.fee-types.edit');
            Route::put('{fee}', [FeeController::class, 'update'])->name('settings.fee-types.update');
            Route::delete('{fee}', [FeeController::class, 'destroy'])->name('settings.fee-types.destroy');
        });

        // Voucher Type Settings
        Route::resource('voucher-types', VoucherTypeController::class)->names([
            'index'   => 'settings.voucher-types.index',
            'create'  => 'settings.voucher-types.create',
            'store'   => 'settings.voucher-types.store',
            'edit'    => 'settings.voucher-types.edit',
            'update'  => 'settings.voucher-types.update',
            'destroy' => 'settings.voucher-types.destroy',
        ]);
    });

    // Finance
    Route::prefix('finance')->group(function () {
        Route::get('/summary', [FinanceController::class, 'summary'])->name('finance.summary');
        Route::get('/earnings', [FinanceController::class, 'earnings'])->name('finance.earnings');
        Route::get('/outgoings', [FinanceController::class, 'outgoings'])->name('finance.outgoings');
        Route::get('/reports', [FinanceController::class, 'reports'])->name('finance.reports');
        Route::get('/reports/daily-report', [FinanceController::class, 'daily_report'])->name('finance.daily_report');
        Route::get('/reports/daily-report/data', [FinanceController::class, 'daily_report_data'])->name('finance.daily_report_data');
        Route::get('/get_user_data/{user_id}', [FinanceController::class, 'get_user_data'])->name('finance.get_user_data');
        Route::post('/add_money', [FinanceController::class, 'add_money'])->name('finance.add_money');
        Route::post('/add_voucher', [FinanceController::class, 'add_voucher'])->name('finance.add_voucher');
        Route::delete('/delete_voucher/{voucher_id}', [FinanceController::class, 'delete_voucher'])->name('finance.delete_voucher');
        Route::get('/due-list', [FinanceController::class, 'due_list'])->name('finance.due_list');
        // add download due list students
        Route::get('/due-list/download', [FinanceController::class, 'download_due_list'])->name('finance.download_due_list');
    });

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/command.php';
