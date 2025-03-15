<?php
namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $filters   = request()->input('filters', []);
        $search    = request()->input('search', '');

        $staff = User::with('academics')->whereHas('roles', function ($q) {
            $q->where('name', 'staff');
        });

        foreach ($filters as $field => $value) {
            if (is_array($value)) {
                $staff->whereHas('roles', function ($q) use ($field, $value) {
                    $q->whereIn($field, $value);
                });
            } else {
                $staff->whereHas('roles', function ($q) use ($field, $value) {
                    $q->where($field, $value);
                });
            }
        }

        if ($search) {
            $staff->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        if (request()->has('order')) {
            $order = request()->input('order');
            $staff->orderBy($sortField, $order);
        } else {
            $staff->orderBy($sortField, 'desc');
        }

        // return $staff->get();

        return Inertia::render('Staff/StaffList', [
            'staff'     => Inertia::defer(fn() => $staff->paginate($per_page, ['*'], 'page', $page)),
            'filters'   => $filters,
            'sortOrder' => $order ?? null,
        ]);
    }
}
