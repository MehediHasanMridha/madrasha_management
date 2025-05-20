<?php
namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\Department;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ClassController extends Controller
{
    public function index()
    {
        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $filters   = request()->input('filters', []);
        $search    = request()->input('search', '');

        $classes = Classes::with('department');

        if ($search) {
            $classes->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhereHas('department', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    });
            });
        }

        if (request()->has('order')) {
            $order = request()->input('order');
            $classes->orderBy($sortField, $order === 'ascend' ? 'asc' : 'desc');
        } else {
            $classes->orderBy($sortField, 'desc');
        }

        $classes     = $classes->paginate($per_page, ['*'], 'page', $page)->withQueryString();
        $departments = Department::all();

        return Inertia::render('admin::class/index', [
            'classes'     => $classes,
            'filters'     => $filters,
            'departments' => $departments,
        ]);
    }

    public function classStore(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'department'  => 'required|exists:departments,id',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string',
        ]);

        try {
            // department info
            $department           = Department::where('id', $request->input('department'))->firstOrFail();
            $class                = new Classes();
            $class->name          = $request->input('name');
            $class->department_id = $request->input('department');
            $class->slug          = Str::slug($request->input('name')) . '-' . $department->slug ?? uniqid();
            $class->des           = $request->input('description') ?? null;
            $class->img           = $request->input('icon') ?? null;

            $class->save();

            return redirect()->route('class')->with('success', 'Class created successfully.');
        } catch (QueryException $e) {
            return redirect()
                ->back()
                ->with('error', $e->getCode() === '23000' ? 'Class name or slug already exists.' : 'An error occurred while creating the Class.');
        }
    }

    public function update(Request $request, $class_slug)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string',
        ]);

        try {
            $class       = Classes::where('slug', $class_slug)->firstOrFail();
            $class->name = $request->input('name');
            $class->slug = Str::slug($request->input('name')) . '-' . $class->department->slug ?? uniqid();
            $class->des  = $request->input('description') ?? null;
            $class->img  = $request->input('icon') ?? null;

            $class->save();

            return redirect()->back()->with('success', 'Class updated successfully.');

        } catch (\Throwable $th) {
            if ($th->getCode() === '23000') {
                return redirect()
                    ->back()
                    ->with('error', 'Class name or slug already exists.');
            }

            return redirect()
                ->back()
                ->with('error', 'An error occurred while updating the Class.');
        }
    }

    public function destroy($class_slug)
    {
        try {
            $class = Classes::where('slug', $class_slug)->firstOrFail();
            $class->delete();

            return redirect()->route('class')->with('success', 'Class deleted successfully.');

        } catch (QueryException $e) {
            if ($e->errorInfo[1] === 1451) {
                return redirect()
                    ->back()
                    ->with('error', 'Cannot delete this Class because it has associated students or staff. Please remove all students and staff from this Class first.');
            }

            return redirect()
                ->back()
                ->with('error', 'An error occurred while deleting the Class.');
        }
    }
}
