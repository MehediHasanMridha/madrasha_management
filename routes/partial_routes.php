<?php

use App\Http\Controllers\PartialController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/get-all-departments', [PartialController::class, 'getAllDepartments'])
        ->name('get.all.departments');
    Route::get('/get-all-staff', [PartialController::class, 'getAllStaff'])
        ->name('get.all.staff');
    Route::get('get-exam-subjects/{exam_id}/subjects', [PartialController::class, 'getExamSubjects'])->name('department.get_exams_subjects');
});
