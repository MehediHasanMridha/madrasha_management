<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Classes;
use App\Models\Department;
use App\Models\FeeCategory;
use App\Models\FeeType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FeeController extends Controller
{
    public function index()
    {
        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $filters   = request()->input('filters', []);
        $search    = request()->input('search', '');
        $fee       = FeeCategory::query();
        if ($search) {
            $fee->where('name', 'like', '%' . $search . '%');
        }
        if (request()->has('order')) {
            $order = request()->input('order');
            $fee->orderBy($sortField, $order === 'ascend' ? 'asc' : 'desc');
        } else {
            $fee->orderBy($sortField, 'desc');
        }
        return Inertia::render('admin::fee/feeCategory/index', [
            'fee' => $fee->paginate($per_page, ['*'], 'page', $page)->withQueryString(),
        ]);
    }

    public function feeIndex()
    {
        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $classSlug     = request()->input('class', '');
        $departmentSlug = request()->input('department', '');
        $categorySlug    = request()->input('category', '');

        $fee = FeeType::query();

        if ($classSlug) {
            $fee->whereHas('class', function ($query) use ($classSlug) {
                $query->where('slug', $classSlug);
            });
        }
        if ($departmentSlug) {
            $fee->whereHas('department', function ($query) use ($departmentSlug) {
                $query->where('slug', $departmentSlug);
            });
        }
        if ($categorySlug) {
            $fee->whereHas('feeCategory', function ($query) use ($categorySlug): void {
                $query->where('slug', $categorySlug);
            });
        }

        return Inertia::render('admin::fee/index', [
            'fee' => $fee->get(),
        ]);
    }

    public function createCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $validated['slug'] = Str::slug($validated['name']);
        try {
            FeeCategory::create($validated);
            return redirect()->back()
                ->with('success', 'Fee category created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', $e->getCode() === '23000' ? 'Fee category name or slug already exists.' : 'An error occurred while creating the Fee category: ');
        }
    }
    public function create()
    {
        return Inertia::render('admin::feeTypes/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'department'=> 'required|exists:departments,slug',
            'class'      => 'required|exists:classes,slug',
            'category' => 'required|exists:fee_categories,slug',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        try {
            $feeCategory = FeeCategory::where('slug', $validated['category'])->first();
            $validated['fee_category_id'] = $feeCategory->id;
            $class = Classes::where('slug', $validated['class'])->first();
            $validated['class_id'] = $class->id;
            $department = Department::where('slug', $validated['department'])->first();
            $validated['department_id'] = $department->id;
            FeeType::create($validated);

            return redirect()->back()
                ->with('success', 'Fee type created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', $e->getCode() === '23000' ? 'Fee type name or slug already exists.' : 'An error occurred while creating the Fee type: ');
        }
    }

    public function edit(FeeType $feeType)
    {
        return Inertia::render('admin::settings/feeTypes/edit', [
            'feeType' => $feeType,
        ]);
    }

    public function update(Request $request, FeeType $feeType)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'default_amount' => 'nullable|numeric|min:0',
            'is_variable'    => 'boolean',
        ]);

        // $validated['slug'] = Str::slug($validated['name']);

        $feeType->update($validated);

        return redirect()->route('settings.fee-types.index')
            ->with('success', 'Fee type updated successfully.');
    }

    public function destroy(FeeType $feeType)
    {
                                                    // Check if the FeeType is used in any other table
        $isUsed = $feeType->incomeLogs()->exists(); // Assuming 'incomeLogs' is the relationship name

        if ($isUsed) {
            return redirect()->route('settings.fee-types.index')
                ->with('error', 'Fee type cannot be deleted as it is being used in other records.');
        }

        try {
            $feeType->delete();
            return redirect()->route('settings.fee-types.index')
                ->with('success', 'Fee type deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', $e->getCode() === '23000' ? 'Fee type cannot be deleted as it is being used in other records.' : 'An error occurred while deleting the Fee type.');
        }
    }

    public function deleteCategory(FeeCategory $category)
    {
        try {
            $category->delete();
            return redirect()->back()
                ->with('success', 'Fee category deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'An error occurred while deleting the Fee category: ' . $e->getMessage());
        }
    }

    public function updateCategory(Request $request, FeeCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $validated['slug'] = Str::slug($validated['name']);
        try {
            $category->update($validated);
            return redirect()->back()
                ->with('success', 'Fee category updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'An error occurred while updating the Fee category: ' . $e->getMessage());
        }
    }

}
