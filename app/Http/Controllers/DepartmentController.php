<?php
namespace App\Http\Controllers;

use App\Http\Resources\showStudentData;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function view($department_slug)
    {

        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $filters   = request()->input('filters', []);
        $search    = request()->input('search', '');
        $type      = request()->input('type', '');
        $staff     = null;

        $department = Department::with('classes')->where('slug', $department_slug)->firstOrFail();
        $students   = User::whereHas('academics', function ($q) use ($department) {
            $q->where('department_id', $department->id);
        })->whereHas('roles', function ($q) {
            $q->where('name', 'student');
        })->with(['academics.class', 'academics.department']);

        foreach ($filters as $field => $value) {
            if (is_array($value)) {
                $students->whereHas('academics', function ($q) use ($field, $value) {
                    $q->whereIn($field, $value);
                });
            } else {
                $students->whereHas('academics', function ($q) use ($field, $value) {
                    $q->where($field, $value);
                });
            }
        }

        if ($search) {
            $students->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        if (request()->has('order')) {
            $order = request()->input('order');
            $students->orderBy($sortField, $order);
        } else {
            $students->orderBy($sortField, 'desc');
        }

        if ($type == 'staff') {
            $staff = $this->staffDataShow($department_slug);
        }

        return Inertia::render('Department/Dashboard', [
            'department' => $department,
            'students'   => Inertia::defer(fn() => showStudentData::collection($students->paginate($per_page, ['*'], 'page', $page))),
            'filters'    => $filters,
            'sortOrder'  => $order ?? null,
            'staff'      => Inertia::defer(fn() => ($staff ? $staff->paginate($per_page, ['*'], 'page', $page) : null)),
        ]);

    }

    private function staffDataShow($department_slug)
    {
        $page       = request()->input('page', 1);
        $per_page   = request()->input('per_page', 10);
        $sortField  = request()->input('sort_field', 'created_at');
        $filters    = request()->input('filters', []);
        $search     = request()->input('search', '');
        $department = Department::with('classes')->where('slug', $department_slug)->firstOrFail();

        $data = User::whereHas('roles', function ($q) {
            $q->where('name', 'staff');
        });
        return $data;
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
