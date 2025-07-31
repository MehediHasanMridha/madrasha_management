<?php
namespace App\Http\Controllers;

use App\Actions\Finance\Reports\MonthlyReport;
use App\Models\Department;
use App\Models\Exam;
use App\Models\User;

class PartialController extends Controller
{
    public function getAllDepartments()
    {
        $departments = Department::with(['classes', 'classes.feeTypes'])->get();
        if ($departments->isEmpty()) {
            return response()->json(['message' => 'No departments found'], 404);
        }
        return response()->json([
            'message' => 'Departments retrieved successfully',
            'data'    => $departments,
        ], 200);
    }

    /**
     * Get exam subjects for an exam
     */
    public function getExamSubjects($exam_id)
    {
        try {
            $exam = Exam::with([
                'examSubjects.subject',
                'examSubjects.class',
                'classes.subjects',
            ])->findOrFail($exam_id);

            return response()->json([
                'success' => true,
                'data'    => [
                    'exam'               => $exam,
                    'exam_subjects'      => $exam->examSubjects->map(function ($examSubject) {
                        return [
                            'id'          => $examSubject->id,
                            'subject_id'  => $examSubject->subject_id,
                            'class_id'    => $examSubject->class_id,
                            'exam_date'   => $examSubject->exam_date ? $examSubject->exam_date->format('Y-m-d') : null,
                            'start_time'  => $examSubject->start_time ? $examSubject->start_time->format('H:i') : null,
                            'end_time'    => $examSubject->end_time ? $examSubject->end_time->format('H:i') : null,
                            'total_marks' => $examSubject->total_marks,
                            'pass_marks'  => $examSubject->pass_marks,
                            'status'      => $examSubject->status,
                            'subject'     => $examSubject->subject,
                            'class'       => $examSubject->class,
                        ];
                    }),
                    'available_subjects' => $exam->classes->flatMap(function ($class) {
                        return $class->subjects->map(function ($subject) use ($class) {
                            return [
                                'id'         => $subject->id,
                                'name'       => $subject->name,
                                'code'       => $subject->code,
                                'class_id'   => $class->id,
                                'class_name' => $class->name,
                            ];
                        });
                    })->unique('id')->values(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve exam subjects: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function getAllStaff()
    {
        $staff = User::whereHas('roles', function ($q) {
            $q->where('name', 'staff');
        })->whereDoesntHave('roles', function ($q) {
            $q->where('name', 'editor');
        })->get(); // Assuming you have a Staff model
        if ($staff->isEmpty()) {
            return response()->json(['error' => 'No staff found'], 404);
        }
        return response()->json([
            'message' => 'Staff retrieved successfully',
            'data'    => $staff,
        ], 200);
    }

    public function downloadMonthlyReport($month)
    {
        try {
            // Get the monthly report data
            $dailyReports = MonthlyReport::run($month);

            // Calculate summary statistics
            $totalIncome  = $dailyReports->sum('incoming');
            $totalExpense = $dailyReports->sum('outgoing');
            $netBalance   = $totalIncome - $totalExpense;
            $totalReports = $dailyReports->count();

            // Format the data for PDF
            $formattedReports = $dailyReports->map(function ($report) use ($month) {
                return [
                    'date'    => sprintf('%02d-%s-%d', $report['day'], $month, date('Y')),
                    'income'  => number_format($report['incoming'], 2),
                    'expense' => number_format($report['outgoing'], 2),
                    'balance' => number_format($report['net_amount'], 2),
                ];
            });

            $data = [
                'month'        => $month,
                'year'         => date('Y'),
                'dailyReports' => $formattedReports,
                'totalIncome'  => number_format($totalIncome, 2),
                'totalExpense' => number_format($totalExpense, 2),
                'netBalance'   => number_format($netBalance, 2),
                'totalReports' => $totalReports,
                'generatedAt'  => now()->format('Y-m-d H:i:s'),
            ];

            return response()->json([
                'message' => 'Monthly report data retrieved successfully',
                'month'   => $month,
                'data'    => $data,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'Failed to generate monthly report',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
