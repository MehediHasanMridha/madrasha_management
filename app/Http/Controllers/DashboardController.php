<?php
namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\Department;
use App\Models\FeeType;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Pre-load all fee types to avoid N+1 queries
        $feeTypes = FeeType::all()->keyBy(function ($feeType) {
            return $feeType->class_id . '-' . $feeType->slug;
        });

        // Pre-load all classes to avoid N+1 queries
        $classes = Classes::all()->keyBy('id');

        $data = Department::with([
            'academics'                    => function ($q) {
                $q->whereHas('student.roles', fn($q) => $q->where('name', 'student'))
                    ->with(['class', 'student']);
            },
            'academics.student.incomeLogs' => function ($q) {
                $q->where('payment_period', date('Y-m'))
                    ->with('feeType');
            },
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
        ])->get()->map(function ($item) use ($feeTypes, $classes) {
            $academics = $item->academics;

            $total_tk = $academics->reduce(function ($carry, $academic) use ($feeTypes, $classes) {
                $academic_fee = $academic->academic_fee ?? getStudentFee($academic, 'academic', $feeTypes, $classes);
                $boarding_fee = $academic->boarding_fee ?? getStudentFee($academic, 'boarding', $feeTypes, $classes);
                return $carry + $academic_fee + $boarding_fee;
            }, 0);

            $monthly_income = $academics->reduce(function ($carry, $academic) {
                $income = $academic->student->incomeLogs
                    ->filter(function ($log) {
                        return in_array($log->feeType->name ?? '', ['Academic Fee', 'Boarding Fee']);
                    })
                    ->sum('amount');
                return $carry + $income;
            }, 0);

            return [
                'name'                 => $item->name,
                'slug'                 => $item->slug,
                'student_count'        => $item->student_count,
                'teacher_count'        => $item->teacher_count,
                'student_male_count'   => $item->student_male_count,
                'student_female_count' => $item->student_female_count,
                'teacher_male_count'   => $item->teacher_male_count,
                'teacher_female_count' => $item->teacher_female_count,
                'total_tk'             => intval($total_tk),
                'monthly_income'       => intval($monthly_income),
            ];
        });

        return Inertia::render('admin::dashboard', ['data' => $data]);
    }
}
