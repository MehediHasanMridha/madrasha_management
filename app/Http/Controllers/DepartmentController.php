<?php
namespace App\Http\Controllers;

use App\Http\Resources\showStaffData;
use App\Http\Resources\showStudentData;
use App\Models\Department;
use App\Models\Exam;
use App\Models\FeeType;
use App\Models\User;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    private function applyStudentQuery($department)
    {
        return User::query()
            ->whereHas('academics', fn($q) => $q->where('department_id', $department->id))
            ->whereHas('roles', fn($q) => $q->where('name', 'student'))
            ->with([
                'academics.class',
                'academics.department',
                'guardians',
                'address',
            ]);
    }

    public function index()
    {
        $request   = request();
        $page      = $request->input('page', 1);
        $per_page  = $request->input('per_page', 10);
        $sortField = $request->input('sort_field', 'created_at');
        $filters   = $request->input('filters', []);
        $search    = $request->input('search', '');
        $order     = match ($request->input('order', null)) {
            'ascend' => 'asc',
            'descend' => 'desc',
            default => null,
        };

        $query = Department::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('des', 'like', '%' . $search . '%');
            });
        }

        if ($order && in_array($sortField, ['name', 'des', 'created_at'])) {
            $query->orderBy($sortField, $order);
        } else {
            $query->latest($sortField);
        }

        $departments = $query->withCount('classes as total_classes')->get();

        return Inertia::render('admin::department/view', [
            'departments' => $departments,
        ]);
    }

    public function students_show($department_slug)
    {
        try {
            $request   = request();
            $page      = $request->input('s_page', 1);
            $per_page  = $request->input('s_per_page', 10);
            $sortField = $request->input('s_sort_field', 'created_at');
            $filters   = $request->input('filters', []);
            $search    = $request->input('search', '');
            $order     = match ($request->input('s_order', 'undefined')) {
                'ascend' => 'asc',
                'descend' => 'desc',
                default => null,
            };

            $department = Department::with('classes', 'classes.feeTypes')->where('slug', $department_slug)->firstOrFail();

            $studentsQuery = $this->applyStudentQuery($department);

            $this->applyFilters($studentsQuery, $filters);
            $this->applySearch($studentsQuery, $search);
            if ($order && in_array($sortField, ['name', 'email', 'created_at'])) {
                $studentsQuery->orderBy($sortField, $order);
            } else {
                $studentsQuery->latest($sortField);
            }

            $students = $studentsQuery->paginate($per_page, ['*'], 'page', $page)->withQueryString();

            return Inertia::render('admin::department/student/students', [
                'department' => $department,
                'students'   => Inertia::defer(fn() => showStudentData::collection(
                    $students ?? [],
                )),
            ]);

        } catch (Exception $th) {
            return back()->with('error', $th->getMessage());
        }

    }
    public function teachers_show($department_slug)
    {
        try {
            $request   = request();
            $page      = $request->input('page', 1);
            $per_page  = $request->input('per_page', 10);
            $sortField = $request->input('sort_field', 'created_at');
            $filters   = $request->input('filters', []);
            $search    = $request->input('search', '');
            $order     = match ($request->input('order', null)) {
                'ascend' => 'asc',
                'descend' => 'desc',
                default => null,
            };

            $department = Department::with('classes')->where('slug', $department_slug)->firstOrFail();

            $staffQuery = User::query()
                ->whereHas('roles', fn($q) => $q->where('name', 'staff'))
                ->whereHas('classAssign', fn($q) => $q->where('dept_id', $department->id));

            $this->applyFilters($staffQuery, $filters);
            $this->applySearch($staffQuery, $search);
            if ($order && in_array($sortField, ['name', 'email', 'created_at'])) {
                $staffQuery->orderBy($sortField, $order);
            } else {
                $staffQuery->latest($sortField);
            }

            $staffs = $staffQuery->paginate($per_page, ['*'], 'page', $page)->withQueryString();

            return Inertia::render('admin::department/teachers', [
                'department' => $department,
                'staffs'     => Inertia::defer(fn() => showStaffData::collection(
                    $staffs ?? [],
                )),
            ]);

        } catch (Exception $th) {
            return back()->with('error', $th->getMessage());
        }

    }

    private function applyFilters($query, $filters)
    {
        foreach ($filters as $field => $value) {
            $query->whereHas('academics', function ($q) use ($field, $value) {
                is_array($value) ? $q->whereIn($field, $value) : $q->where($field, $value);
            });
        }
    }

    private function applySearch($query, $search)
    {
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('unique_id', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        }
    }

    public function departmentCreateView()
    {
        return Inertia::render('admin::department/create');
    }

    public function departmentStore(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try {
            $department       = new Department();
            $department->name = $request->name;
            $department->slug = Str::slug($request->name);
            $department->des  = $request->input('description');
            $department->img  = $request->icon ?? null;
            $department->save();

            return redirect()->back()->with('success', 'Department created successfully.');

        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getCode() === '23000' ? 'Department name or slug already exists.' : 'An error occurred while creating the department.');
        }
    }

    public function departmentEditView($slug)
    {
        $department = Department::where('slug', $slug)->firstOrFail();
        return Inertia::render('admin::department/editDepartment', [
            'department' => $department,
        ]);
    }

    public function departmentUpdate(Request $request, $slug)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try {
            $department       = Department::where('slug', $slug)->firstOrFail();
            $department->name = $request->name;
            $department->slug = Str::slug($request->name);
            $department->des  = $request->input('description');
            $department->img  = $request->icon ?? null;

            $department->save();

            return redirect()->route('department')->with('success', 'Department updated successfully.');

        } catch (\Throwable $th) {
            if ($th->getCode() === '23000') {
                return redirect()->back()->with('error', 'Department name or slug already exists.');
            }
            return redirect()->back()->with('error', 'An error occurred while updating the department.');
        }
    }

    public function departmentDelete(string $slug)
    {
        try {
            $department = Department::where('slug', $slug)->firstOrFail();
            $department->delete();

            return redirect()
                ->back()
                ->with('success', 'Department deleted successfully.');

        } catch (QueryException $e) {
            if ($e->errorInfo[1] === 1451) {
                return redirect()
                    ->back()
                    ->with('error', 'Cannot delete this department because it has associated students or staff. Please remove all students and staff from this department first.');
            }

            return redirect()
                ->back()
                ->with('error', 'An error occurred while deleting the department.');
        }
    }

    public function departmentClasses($department_slug)
    {
        try {
            $department = Department::with(['classes', 'classes.feeTypes', 'classes.subjects'])->where('slug', $department_slug)->firstOrFail();
            return Inertia::render('admin::department/classes', [
                'department' => $department,
                'classes'    => $department->classes,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Department not found.');
        }
    }

    public function exams_show($department_slug)
    {
        try {
            $department = Department::where('slug', $department_slug)->firstOrFail();

            // Get exams for this department with related data
            $exams = $department->exams()
                ->with(['classes', 'examSubjects.subject', 'creator'])
                ->latest()
                ->get();

            // Transform exams to include status with time
            $exams->transform(function ($exam) {
                $statusInfo           = $exam->getStatusWithTime();
                $exam->display_status = $statusInfo['status'];
                $exam->time_left      = $statusInfo['timeLeft'];
                $exam->exam_fee       = $exam->getExamFeeAmount();
                return $exam;
            });

            return Inertia::render('admin::department/exam/exams', [
                'department' => $department,
                'classes'    => $department->classes->load('subjects'),
                'exams'      => $exams,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Department not found.');
        }
    }

    /**
     * Store a new exam for the department.
     */
    public function storeExam(Request $request, $department_slug)
    {
        try {
            $department = Department::where('slug', $department_slug)->firstOrFail();

            $validator = Validator::make($request->all(), [
                'examName'             => 'required|string|max:150',
                'examType'             => 'nullable|in:midterm,final,quiz,assessment,other',
                'description'          => 'nullable|string|max:1000',
                'startDate'            => 'required|date|after:now',
                'endDate'              => 'required|date|after:startDate',
                'registrationStart'    => 'nullable|date|before:startDate',
                'registrationEnd'      => 'nullable|date|after:registrationStart|before:startDate',
                'examFee'              => 'nullable|numeric|min:0|max:999999.99',
                'selectedClasses'      => 'required|array|min:1',
                'selectedClasses.*.id' => 'exists:classes,id',
                'totalMarks'           => 'required|integer|min:1|max:1000',
                'passMarks'            => 'required|integer|min:1|lte:totalMarks',
                'durationMinutes'      => 'nullable|integer|min:1|max:1440',
                'instructions'         => 'nullable|string|max:2000',
            ]);

            if ($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            }DB::beginTransaction();

            // Handle exam fee logic using helper method
            $feeTypeId = $this->handleExamFeeType(
                $request->examName,
                $request->examFee ?? 0,
                $department
            );

            $examData = [
                'name'               => $request->examName,
                'slug'               => Str::slug($request->examName) . '-' . $department->slug,
                'description'        => $request->description,
                'department_id'      => $department->id,
                'start_date'         => $request->startDate,
                'end_date'           => $request->endDate,
                'registration_start' => $request->registrationStart,
                'registration_end'   => $request->registrationEnd,
                'fee_type_id'        => $feeTypeId,
                'is_fee_required'    => ! empty($request->examFee),
                'total_marks'        => $request->totalMarks,
                'pass_marks'         => $request->passMarks,
                'duration_minutes'   => $request->durationMinutes,
                'instructions'       => $request->instructions,
                'status'             => 'scheduled',
                'created_by'         => Auth::user()->id,
            ];

            $exam = Exam::create($examData);

            // Attach classes to exam
            $classIds = collect($request->selectedClasses)->pluck('id')->toArray();
            $exam->classes()->attach($classIds);

            DB::commit();

            return redirect()->back()->with('success', 'Exam created successfully!');

        } catch (Exception $e) {
            Log::error('Error creating exam: ' . $e->getMessage());
            DB::rollBack();
            return back()->with('error', 'Failed to create exam. Please try again.');
        }
    }

    /**
     * Update an existing exam for the department.
     */
    public function updateExam(Request $request, $department_slug, $exam_id)
    {
        try {
            $department = Department::where('slug', $department_slug)->firstOrFail();
            $exam       = Exam::where('id', $exam_id)->where('department_id', $department->id)->firstOrFail();

            $validator = Validator::make($request->all(), [
                'examName'             => 'required|string|max:150',
                'examType'             => 'nullable|in:midterm,final,quiz,assessment,other',
                'description'          => 'nullable|string|max:1000',
                'startDate'            => 'required|date',
                'endDate'              => 'required|date|after:startDate',
                'registrationStart'    => 'nullable|date|before:startDate',
                'registrationEnd'      => 'nullable|date|after:registrationStart|before:startDate',
                'examFee'              => 'nullable|numeric|min:0|max:999999.99',
                'selectedClasses'      => 'required|array|min:1',
                'selectedClasses.*.id' => 'exists:classes,id',
                'totalMarks'           => 'required|integer|min:1|max:1000',
                'passMarks'            => 'required|integer|min:1|lte:totalMarks',
                'durationMinutes'      => 'nullable|integer|min:1|max:1440',
                'instructions'         => 'nullable|string|max:2000',
            ]);

            if ($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            }
            DB::beginTransaction();

            // Handle exam fee logic using helper method
            $feeTypeId = $this->handleExamFeeType(
                $request->examName,
                $request->examFee ?? 0,
                $department,
                $exam->feeType
            );

            $examData = [
                'name'               => $request->examName,
                'slug'               => Str::slug($request->examName),
                'description'        => $request->description,
                'start_date'         => $request->startDate,
                'end_date'           => $request->endDate,
                'registration_start' => $request->registrationStart,
                'registration_end'   => $request->registrationEnd,
                'fee_type_id'        => $feeTypeId,
                'is_fee_required'    => ! empty($request->examFee),
                'total_marks'        => $request->totalMarks,
                'pass_marks'         => $request->passMarks,
                'duration_minutes'   => $request->durationMinutes,
                'instructions'       => $request->instructions,
            ];

            $exam->update($examData);

            // Sync classes to exam
            $classIds = collect($request->selectedClasses)->pluck('id')->toArray();
            $exam->classes()->sync($classIds);

            // Note: Exam fee records are now managed through the regular fee system via FeeType

            DB::commit();

            return redirect()->back()->with('success', 'Exam updated successfully!');

        } catch (Exception $e) {
            Log::error('Error updating exam: ' . $e->getMessage());
            DB::rollBack();
            return back()->with('error', 'Failed to update exam. Please try again.');
        }
    }

    public function destroyExam(Exam $exam)
    {
        try {
            $exam->delete();
            return redirect()->back()
                ->with('success', 'Exam deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete exam. Please try again.');
        }
    }

    public function exams_details($exam_slug, $department_slug)
    {
        $exam = Exam::where('slug', $exam_slug)
            ->with(['feeType', 'classes.academics.student.incomeLogs.feeType'])
            ->whereHas('department', fn($q) => $q->where('slug', $department_slug))
            ->firstOrFail();

        $examFee = $exam->feeType?->amount ?? 0;

        $data = $exam->classes->map(function ($class) use ($examFee, $exam) {
            $totalStudents = $class->academics->count();

            $paidStudents = $class->academics->filter(function ($academic) use ($exam) {
                return $exam->feeType && $academic->student->incomeLogs
                    ->where('fee_type_id', $exam->feeType->id)
                    ->isNotEmpty();
            })->count();

            $totalPaidAmount = $class->academics->sum(function ($academic) use ($exam) {
                return $exam->feeType ? $academic->student->incomeLogs
                    ->where('fee_type_id', $exam->feeType->id)
                    ->sum('amount') : 0;
            });

            return [
                'class'               => [
                    'id'   => $class->id,
                    'name' => $class->name,
                    'slug' => $class->slug,
                ],
                'total_paid_students' => $paidStudents,
                'total_paid_amount'   => $totalPaidAmount,
                'total_students'      => $totalStudents,
                'expected_total_fee'  => $totalStudents * $examFee,
            ];
        });

        return Inertia::render('admin::department/exam/exams_details', [
            'exam'       => $exam,
            'department' => $exam->department,
            'classes'    => $data,
        ]);
    }

    /**
     * Create or update fee type for exam
     */
    private function handleExamFeeType($examName, $examFee, $department, $existingFeeType = null)
    {
        if ($examFee <= 0) {
            return null;
        }

        $feeTypeName = 'Exam Fee';
        $feeTypeSlug = Str::slug($examName . ' ' . $department->slug);
        if ($existingFeeType) {
            // Update existing fee type
            $existingFeeType->update([
                'slug'   => $feeTypeSlug,
                'amount' => $examFee,
                'status' => true,
            ]);
            return $existingFeeType->id;
        }

        // Create new fee type
        $feeType = FeeType::firstOrCreate(
            [
                'slug'          => $feeTypeSlug,
                'department_id' => $department->id,
            ],
            [
                'name'   => $feeTypeName,
                'amount' => $examFee,
                'status' => true,
            ]
        );

        return $feeType->id;
    }

    /**
     * Get exam fee details for an exam
     */
    public function getExamFeeDetails($department_slug, $exam_id)
    {
        try {
            $department = Department::where('slug', $department_slug)->firstOrFail();
            $exam       = Exam::where('id', $exam_id)
                ->where('department_id', $department->id)
                ->with(['feeType'])
                ->firstOrFail();

            $examFeeDetails = [
                'exam_name'       => $exam->name,
                'is_fee_required' => $exam->is_fee_required,
                'fee_type'        => $exam->feeType ? [
                    'id'     => $exam->feeType->id,
                    'name'   => $exam->feeType->name,
                    'amount' => $exam->feeType->amount,
                ] : null,
            ];

            return response()->json([
                'success' => true,
                'data'    => $examFeeDetails,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve exam fee details: ' . $e->getMessage(),
            ], 500);
        }
    }
}
