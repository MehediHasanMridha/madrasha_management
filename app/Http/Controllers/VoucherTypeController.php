<?php
namespace App\Http\Controllers;

use App\Models\VoucherType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class VoucherTypeController extends Controller
{
    public function index()
    {
        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $filters   = request()->input('filters', []);
        $search    = request()->input('search', '');

        $voucherTypes = VoucherType::query();
        if ($search) {
            $voucherTypes->where('name', 'like', "%{$search}%");
        }
        if (request()->has('order')) {
            $order = request()->input('order');
            $voucherTypes->orderBy($sortField, $order === 'ascend' ? 'asc' : 'desc');
        } else {
            $voucherTypes->orderBy($sortField, 'desc');
        }
        return Inertia::render('admin::voucher/index', [
            'voucherTypes' => $voucherTypes->paginate($per_page, ['*'], 'page', $page)->withQueryString(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        try {
            VoucherType::create($validated);
            return redirect()->route('settings.voucher-types.index')
                ->with('success', 'Voucher type created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', $e->getCode() === '23000' ? 'Voucher type name or slug already exists.' : 'An error occurred while creating the voucher type.');
        }
    }

    public function update(Request $request, VoucherType $voucherType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // $validated['slug'] = Str::slug($validated['name']);

        $voucherType->update($validated);

        return redirect()->route('settings.voucher-types.index')
            ->with('success', 'Voucher type updated successfully.');
    }

    public function destroy(VoucherType $voucherType)
    {
        // Check if the VoucherType is used in any expense logs
        $isUsed = $voucherType->expenseLogs()->exists();

        if ($isUsed) {
            return redirect()->route('settings.voucher-types.index')
                ->with('error', 'Voucher type cannot be deleted as it is being used in expense records.');
        }

        try {
            $voucherType->delete();
            return redirect()->route('settings.voucher-types.index')
                ->with('success', 'Voucher type deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('settings.voucher-types.index')
                ->with('error', 'An error occurred while deleting the voucher type.');
        }
    }
}
