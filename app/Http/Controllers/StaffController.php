<?php
namespace App\Http\Controllers;

use App\Http\Resources\showStaffData;
use App\Models\Academic;
use App\Models\Address;
use App\Models\ClassAssign;
use App\Models\Guardian;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class StaffController extends Controller
{
    public function index()
    {
        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $order     = match (request()->input('order', 'undefined')) {
            'ascend' => 'asc',
            'descend' => 'desc',
            default => null,
        };

        $filters = request()->input('filters', []);
        $search  = request()->input('search', '');

        $staff = User::with(['academics', 'guardians', 'address'])->whereHas('roles', function ($q) {
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
                    ->orWhere('unique_id', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });

        }

        if ($order && in_array($sortField, ['name', 'email', 'created_at'])) {
            $staff->orderBy($sortField, $order);
        } else {
            $staff->latest($sortField);
        }

        // return $staff->get();

        return Inertia::render('admin::staff/index', [
            'staff' => Inertia::defer(fn() => showStaffData::collection($staff->paginate($per_page, ['*'], 'page', $page))),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'                    => 'required|string|max:120',
            'blood_group'             => 'required|in:O+,O-,A+,A-,B+,B-,AB+,AB-',
            'contact_number'          => 'required|string|max:14|unique:users,phone',
            'gender'                  => 'required|in:male,female,other',
            'father_name'             => 'required|string|max:120',
            'mother_name'             => 'required|string|max:120',
            'guardian_contact_number' => 'required|string|max:14',
            'district'                => 'required|string|max:120',
            'upazilla'                => 'required|string|max:120',
            'designation'             => 'nullable|string|max:120',
            'salary'                  => 'required|numeric|min:0',
            'staff_image'             => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096', //4MB,
        ], [
            'contact_number.unique' => 'This contact number already exists',
        ]);

        $staff            = new User();
        $staff->name      = $request->name;
        $staff->unique_id = generateUniqueId('T');
        $staff->phone     = $request->contact_number;
        $staff->gender    = $request->gender;
        if ($request->hasFile('staff_image')) {
            $img        = uploadImage($staff->img, $request->file('staff_image'), 'uploads/staff_images/');
            $staff->img = $img;
        }

        $staff->password = Hash::make('12345678');
        $staff->save();

        $role = Role::where('name', 'staff')->first();
        if ($role) {
            $staff->assignRole($role);
        } else {
            $role = Role::create(['name' => 'staff']);
            $staff->assignRole($role);
        }

        $address           = new Address();
        $address->user_id  = $staff->id;
        $address->district = $request->district;
        $address->upazilla = $request->upazilla;
        $address->location = $request->location ?? null;
        $address->save();

        $guardian              = new Guardian();
        $guardian->user_id     = $staff->id;
        $guardian->father_name = $request->father_name ?? null;
        $guardian->mother_name = $request->mother_name ?? null;
        $guardian->numbers     = json_encode([
            $request->guardian_contact_number,
        ]);
        $guardian->save();

        $academic                   = new Academic();
        $academic->user_id          = $staff->id;
        $academic->blood            = $request->blood_group ?? null;
        $academic->reference        = $request->reference ?? null;
        $academic->reference_number = $request->reference_mobile_number ?? null;
        $academic->designation      = $request->designation;
        $academic->salary           = $request->salary;
        $academic->department_id    = $request->department_id;
        $academic->save();

        return back()->with('success', 'Staff added successfully');
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'name'                    => 'required|string|max:120',
            'blood_group'             => 'required|in:O+,O-,A+,A-,B+,B-,AB+,AB-,null',
            'contact_number'          => 'required|string|max:14|unique:users,phone,' . $id,
            'gender'                  => 'required|in:male,female,other',
            'father_name'             => 'required|string|max:120',
            'mother_name'             => 'required|string|max:120',
            'guardian_contact_number' => 'required|string|max:14',
            'district'                => 'required|string|max:120',
            'upazilla'                => 'required|string|max:120',
            'designation'             => 'nullable|string|max:120',
            'salary'                  => 'required|numeric|min:0',
            'staff_image'             => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
        ]);

        $staff         = User::findOrFail($id);
        $staff->name   = $request->name;
        $staff->phone  = $request->contact_number;
        $staff->gender = $request->gender;
        if ($request->hasFile('staff_image')) {
            $img        = uploadImage($staff->img, $request->file('staff_image'), 'uploads/staff_images/');
            $staff->img = $img;
        }
        $staff->save();

        // Update Address
        $address           = Address::where('user_id', $id)->firstOrFail();
        $address->district = $request->district;
        $address->upazilla = $request->upazilla;
        $address->location = $request->location ?? null;
        $address->save();

        // Update Guardian
        $guardian              = Guardian::where('user_id', $id)->firstOrFail();
        $guardian->father_name = $request->father_name;
        $guardian->mother_name = $request->mother_name;
        $guardian->numbers     = json_encode([$request->guardian_contact_number]);
        $guardian->save();

        // Update Academic
        $academic                   = Academic::where('user_id', $id)->firstOrFail();
        $academic->blood            = $request->blood_group === 'null' ? null : $request->blood_group;
        $academic->reference        = $request->reference ?? null;
        $academic->reference_number = $request->reference_mobile_number ?? null;
        $academic->designation      = $request->designation;
        $academic->salary           = $request->salary;
        $academic->save();

        return back()->with('success', 'Staff updated successfully');
    }

    public function destroy($id)
    {
        $staff = User::findOrFail($id);
        $staff->delete();
        return back()->with('success', 'Staff deleted successfully');
    }

    public function assign_staff(Request $request)
    {

        $user = User::whereHas('roles', fn($q) => $q->where('name', 'staff'))
            ->whereDoesntHave('classAssign', fn($q) => $q->where('dept_id', request()->department_id));
        return showStaffData::collection($user->paginate(20)->withQueryString());
    }

    public function unassign_staff_store(Request $request)
    {
        ClassAssign::where('user_id', $request->id)->where('dept_id', $request->department_id)->delete();
        return back()->with('success', 'Staff unassigned successfully');
    }

    public function assign_staff_store(Request $request)
    {
        // check an array
        if (is_array($request->staffs)) {
            foreach ($request->staffs as $staff) {
                $staff                = User::find($staff);
                $classAssign          = new ClassAssign();
                $classAssign->user_id = $staff->id;
                $classAssign->dept_id = $request->department_id;
                $classAssign->save();
            }
            return back()->with('success', 'Staff assigned successfully');
        }
    }

    public function staff_details($staff_id)
    {
        $year     = request()->input('year') ?? date('Y');
        $page     = request()->input('page', 1);
        $per_page = request()->input('per_page', 10);

        // Get staff details with relationships
        $staff = User::with(['academics', 'address', 'guardians', 'classAssign.department', 'expenseLogs', 'transactions'])
            ->where('unique_id', $staff_id)
            ->whereHas('roles', fn($q) => $q->where('name', 'staff'))
            ->firstOrFail();

        $staff = [
            'id'                          => $staff->id,
            'name'                        => $staff->name,
            'unique_id'                   => $staff->unique_id,
            'phone'                       => $staff->phone,
            'gender'                      => $staff->gender,
            'image'                       => $staff->img,
            'status'                      => $staff->status ? 'active' : 'inactive',
            'blood_group'                 => $staff->academics->blood ?? null,
            'designation'                 => $staff->academics->designation ?? null,
            'salary'                      => $staff->academics->salary ?? 0,
            'address'                     => [
                'district' => $staff->address->district ?? null,
                'upazilla' => $staff->address->upazilla ?? null,
                'location' => $staff->address->location ?? null,
            ],
            'guardian'                    => [
                'father_name'    => $staff->guardians->father_name ?? null,
                'mother_name'    => $staff->guardians->mother_name ?? null,
                'contact_number' => json_decode($staff->guardians->numbers, true)[0] ?? null,
            ],
            'reference'                   => $staff->academics->reference ?? null,
            'reference_mobile_number'     => $staff->academics->reference_number ?? null,
            'departments'                 => $staff->classAssign && $staff->classAssign->count() > 0
            ? $staff->classAssign->map(function ($assign) {
                return [
                    'id'   => $assign->department->id ?? null,
                    'name' => $assign->department->name ?? null,
                    'slug' => $assign->department->slug ?? null,
                ];
            })->filter(function ($dept) {
                return $dept['id'] !== null;
            })->unique('id')->values()->toArray()
            : [],
            'salary_transactions_history' => $staff->transactions()->with(['receiver'])
                ->orderBy('created_at', 'desc')
                ->paginate($per_page, ['*'], 'page', $page),
            'monthly_salary_history'      => $staff->expenseLogs()
                ->where('date', 'like', $year . '%')
                ->whereHas('voucherType', function ($query) {
                    $query->where('name', 'like', '%salary%')
                        ->orWhere('name', 'like', '%বেতন%')
                        ->orWhere('name', 'like', '%Teacher%')
                        ->orWhere('name', 'like', '%Staff%');
                })
                ->with(['voucherType'])
                ->get()
                ->map(function ($log) {
                    return [
                        'id'           => $log->id,
                        'amount'       => intval($log->amount),
                        'voucher_type' => $log->voucherType ? $log->voucherType->name : 'Salary',
                        'month'        => date('F', strtotime($log->date)),
                        'details'      => $log->details ?? null,
                        'date'         => $log->date,
                        'created_at'   => $log->created_at->format('Y-m-d'),
                    ];
                })
                ->groupBy('month')
                ->map(function ($group, $month) {
                    return [
                        'month'    => $month,
                        'salaries' => $group,
                    ];
                })
                ->values(),
        ];

        return Inertia::render('admin::staff/staff_details',
            [
                'staff' => $staff,
            ]
        );
    }

}
