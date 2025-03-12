<?php
namespace App\Http\Controllers;

use App\Http\Resources\showStudentData;
use App\Models\Academic;
use App\Models\Department;
use App\Models\User;
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

        $department = Department::with('classes')->where('slug', $department_slug)->firstOrFail();
        $students   = Academic::query();
        $students->with('student', 'class')->where('department_id', $department->id);

        foreach ($filters as $field => $value) {
            if (is_array($value)) {
                $students->whereIn($field, $value);
            } else {
                $students->where($field, $value);
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
            $students->orderBy(User::select('name')->whereColumn('users.id', 'academics.user_id'), $order);
        } else {
            $students->orderBy('created_at', 'desc');
        }

        // $studentData = $students->paginate($per_page, ['*'], 'page', $page);
        // return $studentData;

        return Inertia::render('Department/Dashboard', [
            'department' => $department,
            'students'   => Inertia::defer(fn() => showStudentData::collection($students->paginate($per_page, ['*'], 'page', $page))),
            'filters'    => $filters,
            'sortOrder'  => $order ?? null,
        ]);

    }
}
