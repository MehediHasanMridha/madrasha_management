<?php
namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\Department;
use App\Models\Exam;
use App\Models\ExamSubject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Exam::with(['department', 'classes', 'creator'])
            ->latest();

        // Filter by department if provided
        if ($request->has('department_id') && $request->department_id) {
            $query->where('department_id', $request->department_id);
        }

        // Filter by status if provided
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Filter by year if provided
        $query->byYear($request->input('year'));

        $exams = $query->paginate(15);

        // Transform exams to include status with time
        $exams->getCollection()->transform(function ($exam) {
            $statusInfo           = $exam->getStatusWithTime();
            $exam->display_status = $statusInfo['status'];
            $exam->time_left      = $statusInfo['timeLeft'];
            return $exam;
        });

        // Get available years for the dropdown
        $availableYears = Exam::selectRaw('YEAR(start_date) as year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->filter()
            ->values();

        return Inertia::render('admin::exams/index', [
            'exams'              => $exams,
            'departments'        => Department::select('id', 'name')->get(),
            'availableYears'     => $availableYears,
            'selectedYear'       => $request->input('year', date('Y')),
            'selectedStatus'     => $request->input('status'),
            'selectedDepartment' => $request->input('department_id'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin::exams/create', [
            'departments' => Department::with('classes.subjects')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'                   => 'required|string|max:150',
            'description'            => 'nullable|string',
            'department_id'          => 'required|exists:departments,id',
            'type'                   => 'required|in:midterm,final,quiz,assessment,other',
            'start_date'             => 'required|date|after:now',
            'end_date'               => 'required|date|after:start_date',
            'registration_start'     => 'nullable|date|before:start_date',
            'registration_end'       => 'nullable|date|after:registration_start|before:start_date',
            'exam_fee'               => 'nullable|numeric|min:0',
            'is_fee_required'        => 'boolean',
            'instructions'           => 'nullable|string',
            'total_marks'            => 'required|integer|min:1',
            'pass_marks'             => 'required|integer|min:1|lte:total_marks',
            'duration_minutes'       => 'nullable|integer|min:1',
            'classes'                => 'required|array|min:1',
            'classes.*'              => 'exists:classes,id',
            'subjects'               => 'nullable|array',
            'subjects.*.subject_id'  => 'required_with:subjects|exists:subjects,id',
            'subjects.*.class_id'    => 'required_with:subjects|exists:classes,id',
            'subjects.*.exam_date'   => 'required_with:subjects|date',
            'subjects.*.start_time'  => 'required_with:subjects|date_format:H:i',
            'subjects.*.end_time'    => 'required_with:subjects|date_format:H:i|after:subjects.*.start_time',
            'subjects.*.total_marks' => 'nullable|integer|min:1',
            'subjects.*.pass_marks'  => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            DB::beginTransaction();

            $examData               = $validator->validated();
            $examData['slug']       = Str::slug($examData['name']);
            $examData['created_by'] = auth()->id();
            $examData['exam_fee']   = $examData['exam_fee'] ?? 0;

            // Create the exam
            $exam = Exam::create($examData);

            // Attach classes to exam
            $exam->classes()->attach($examData['classes']);

            // Create exam subjects if provided
            if (! empty($examData['subjects'])) {
                foreach ($examData['subjects'] as $subjectData) {
                    ExamSubject::create([
                        'exam_id'     => $exam->id,
                        'subject_id'  => $subjectData['subject_id'],
                        'class_id'    => $subjectData['class_id'],
                        'exam_date'   => $subjectData['exam_date'],
                        'start_time'  => $subjectData['start_time'],
                        'end_time'    => $subjectData['end_time'],
                        'total_marks' => $subjectData['total_marks'] ?? $exam->total_marks,
                        'pass_marks'  => $subjectData['pass_marks'] ?? $exam->pass_marks,
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('exams.index')
                ->with('success', 'Exam created successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->with('error', 'Failed to create exam. Please try again.')
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        $exam->load([
            'department',
            'classes.subjects',
            'examSubjects.subject',
            'examSubjects.class',
            'creator',
        ]);

        $statusInfo           = $exam->getStatusWithTime();
        $exam->display_status = $statusInfo['status'];
        $exam->time_left      = $statusInfo['timeLeft'];

        return Inertia::render('admin::exams/show', [
            'exam' => $exam,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        $exam->load(['classes', 'examSubjects.subject', 'examSubjects.class']);

        return Inertia::render('admin::exams/edit', [
            'exam'        => $exam,
            'departments' => Department::with('classes.subjects')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        $validator = Validator::make($request->all(), [
            'name'               => 'required|string|max:150',
            'description'        => 'nullable|string',
            'department_id'      => 'required|exists:departments,id',
            'type'               => 'required|in:midterm,final,quiz,assessment,other',
            'status'             => 'required|in:draft,scheduled,ongoing,completed,cancelled',
            'start_date'         => 'required|date',
            'end_date'           => 'required|date|after:start_date',
            'registration_start' => 'nullable|date|before:start_date',
            'registration_end'   => 'nullable|date|after:registration_start|before:start_date',
            'exam_fee'           => 'nullable|numeric|min:0',
            'is_fee_required'    => 'boolean',
            'instructions'       => 'nullable|string',
            'total_marks'        => 'required|integer|min:1',
            'pass_marks'         => 'required|integer|min:1|lte:total_marks',
            'duration_minutes'   => 'nullable|integer|min:1',
            'classes'            => 'required|array|min:1',
            'classes.*'          => 'exists:classes,id',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            DB::beginTransaction();

            $examData             = $validator->validated();
            $examData['slug']     = Str::slug($examData['name']);
            $examData['exam_fee'] = $examData['exam_fee'] ?? 0;

            $exam->update($examData);

            // Sync classes
            $exam->classes()->sync($examData['classes']);

            DB::commit();

            return redirect()->route('exams.show', $exam)
                ->with('success', 'Exam updated successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->with('error', 'Failed to update exam. Please try again.')
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        try {
            $exam->delete();
            return redirect()->route('exams.index')
                ->with('success', 'Exam deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete exam. Please try again.');
        }
    }

    /**
     * Get exams for a specific department.
     */
    public function getByDepartment($departmentId)
    {
        $exams = Exam::with(['classes', 'examSubjects.subject'])
            ->where('department_id', $departmentId)
            ->published()
            ->active()
            ->get();

        // Transform exams to include status with time
        $exams->transform(function ($exam) {
            $statusInfo           = $exam->getStatusWithTime();
            $exam->display_status = $statusInfo['status'];
            $exam->time_left      = $statusInfo['timeLeft'];
            return $exam;
        });

        return response()->json($exams);
    }

    /**
     * Publish an exam.
     */
    public function publish(Exam $exam)
    {
        try {
            $exam->update([
                'published_at' => now(),
                'status'       => 'scheduled',
            ]);

            return redirect()->back()
                ->with('success', 'Exam published successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to publish exam. Please try again.');
        }
    }

    /**
     * Unpublish an exam.
     */
    public function unpublish(Exam $exam)
    {
        try {
            $exam->update([
                'published_at' => null,
                'status'       => 'draft',
            ]);

            return redirect()->back()
                ->with('success', 'Exam unpublished successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to unpublish exam. Please try again.');
        }
    }
}
