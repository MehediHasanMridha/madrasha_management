<?php
namespace App\Http\Controllers;

use App\Http\Resources\showStaffData;
use App\Http\Resources\showStudentData;
use App\Models\Department;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
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

    public function view($department_slug)
    {
        try {
            $request   = request();
            $page      = $request->input('s_page', 1);
            $per_page  = $request->input('s_per_page', 10);
            $sortField = $request->input('s_sort_field', 'created_at');
            $filters   = $request->input('filters', []);
            $search    = $request->input('search', '');
            $type      = $request->input('type', '');
            $order     = match ($request->input('s_order', 'undefined')) {
                'ascend' => 'asc',
                'descend' => 'desc',
                default => null,
            };

            $department = Department::with('classes')->where('slug', $department_slug)->firstOrFail();

            $studentsQuery = $this->applyStudentQuery($department);

            $this->applyFilters($studentsQuery, $filters);
            $this->applySearch($studentsQuery, $search);
            if ($order && in_array($sortField, ['name', 'email', 'created_at'])) {
                $studentsQuery->orderBy($sortField, $order);
            } else {
                $studentsQuery->latest($sortField);
            }

            $students = $studentsQuery->paginate($per_page, ['*'], 'page', $page)->withQueryString();
            $staff    = $type === 'staff' ? $this->staffDataShow($department_slug) : null;

            return Inertia::render('Department/Dashboard', [
                'department' => $department,
                'students'   => Inertia::defer(fn() => showStudentData::collection(
                    $students ?? [],
                )),
                'staff'      => Inertia::defer(fn() => showStaffData::collection(
                    $staff ?? [],
                )),
            ]);

        } catch (Exception $th) {
            return back()->with('error', $th->getMessage());
        }
    }

    private function staffDataShow($department_slug)
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

        return $staffQuery->paginate($per_page, ['*'], 'page', $page)->withQueryString();
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
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        }
    }

    public function departmentCreateView()
    {
        return Inertia::render('Department/AddDepartment');
    }

    public function departmentStore(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $department       = new Department();
        $department->name = $request->name;
        $department->slug = Str::slug($request->name) . '-' . uniqid();
        $department->des  = $request->input('description');
        $department->img  = $request->icon;

        $department->save();

        return redirect()->route('department')->with('success', 'Department created successfully.');
    }

    public function departmentEditView($slug)
    {
        $department = Department::where('slug', $slug)->firstOrFail();
        return Inertia::render('Department/EditDepartment', [
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

        $department       = Department::where('slug', $slug)->firstOrFail();
        $department->name = $request->name;
        $department->slug = Str::slug($request->name) . '-' . uniqid();
        $department->des  = $request->input('description');
        $department->img  = $request->icon;

        $department->save();

        return redirect()->route('department')->with('success', 'Department updated successfully.');
    }

    public function departmentDelete($slug)
    {
        $department = Department::where('slug', $slug)->firstOrFail();
        $department->delete();

        return redirect()->route('department')->with('success', 'Department deleted successfully.');
    }
}
