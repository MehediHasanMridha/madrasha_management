<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FeeType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FeeTypeController extends Controller
{
    public function index()
    {
        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $filters   = request()->input('filters', []);
        $search    = request()->input('search', '');
        $feeTypes  = FeeType::query();
        if ($search) {
            $feeTypes->where('name', 'like', '%' . $search . '%');
        }
        if (request()->has('order')) {
            $order = request()->input('order');
            $feeTypes->orderBy($sortField, $order === 'ascend' ? 'asc' : 'desc');
        } else {
            $feeTypes->orderBy($sortField, 'desc');
        }
        return Inertia::render('FeeTypes/Index', [
            'feeTypes' => $feeTypes->paginate($per_page, ['*'], 'page', $page)->withQueryString(),
        ]);
    }

    public function create()
    {
        return Inertia::render('FeeTypes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'default_amount' => 'nullable|numeric|min:0',
            'is_variable'    => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        FeeType::create($validated);

        return redirect()->route('settings.fee-types.index')
            ->with('success', 'Fee type created successfully.');
    }

    public function edit(FeeType $feeType)
    {
        return Inertia::render('Settings/FeeTypes/Edit', [
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
}
