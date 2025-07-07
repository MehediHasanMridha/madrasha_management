<?php
namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Exam;

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
}
