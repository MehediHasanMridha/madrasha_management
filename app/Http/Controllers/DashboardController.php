<?php
namespace App\Http\Controllers;

use App\Models\Department;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $data = Department::with([
            'academics'                    =>
            fn($q)                         => $q->whereHas('student.roles', fn($q) => $q->where('name', 'student')),
            'academics.student.incomeLogs' =>
            fn($q)                         => $q->where('payment_period', date('Y-m')),
        ])->withCount([
            'academics as student_count'          => function ($query) {
                $query->whereHas('student.roles', function ($q) {
                    $q->where('name', 'student');
                });
            },
            'classAssign as teacher_count',
            'academics as student_male_count'     => function ($query) {
                $query->whereHas('student.roles', function ($q) {
                    $q->where('name', 'student');
                })->whereHas('student', function ($q) {
                    $q->where('gender', 'male');
                });
            },
            'academics as student_female_count'   => function ($query) {
                $query->whereHas('student.roles', function ($q) {
                    $q->where('name', 'student');
                })->whereHas('student', function ($q) {
                    $q->where('gender', 'female');
                });
            },
            'classAssign as teacher_male_count'   => function ($query) {
                $query->whereHas('user', function ($q) {
                    $q->where('gender', 'male');
                });
            },
            'classAssign as teacher_female_count' => function ($query) {
                $query->whereHas('user', function ($q) {
                    $q->where('gender', 'female');
                });
            },
        ])->get()->map(function ($item) {
            $total_tk = $item->academics->sum(function ($academic) {
                return ($academic->academic_fee ?? getStudentFee($academic->id, 'academic')) +
                    ($academic->boarding_fee ?? getStudentFee($academic->id, 'boarding'));
            });

            $monthly_income = $item->academics->sum(function ($academic) {
                return $academic->student->incomeLogs->sum('amount');
            });

            return [
                'name'                 => $item->name,
                'slug'                 => $item->slug,
                'student_count'        => $item->student_count,
                'teacher_count'        => $item->teacher_count,
                'student_male_count'   => $item->student_male_count,
                'student_female_count' => $item->student_female_count,
                'teacher_male_count'   => $item->teacher_male_count,
                'teacher_female_count' => $item->teacher_female_count,
                'total_tk'             => $total_tk,
                'monthly_income'       => $monthly_income,
            ];
        });

        return Inertia::render('Dashboard', ['data' => $data]);
    }
}
