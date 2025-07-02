<?php
namespace App\Http\Controllers;

use App\Models\Academic;
use App\Models\Address;
use App\Models\Department;
use App\Models\Guardian;
use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class StudentController extends Controller
{
    public function add_student($department_slug, Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name'                    => 'required|string|max:120',
            'blood_group'             => 'nullable|in:O+,O-,A+,A-,B+,B-,AB+,AB-,null',
            'gender'                  => 'required|in:male,female,other',
            'contact_number'          => 'nullable|string|max:14|unique:users,phone',
            'father_name'             => 'required|string|max:120',
            'mother_name'             => 'required|string|max:120',
            'guardian_contact_number' => 'required|string|max:14',
            'district'                => 'required|string|max:120',
            'upazilla'                => 'required|string|max:120',
            'joining_class'           => 'required',
            'department_id'           => 'required',
            'student_image'           => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
            'boarding_fee'            => 'nullable|numeric',
            'academic_fee'            => 'nullable|numeric',
        ], [
            'student_id.unique'     => 'This student id already exists',
            'contact_number.unique' => 'This contact number already exists',
        ]);

        try {
            DB::beginTransaction();
            $student            = new User();
            $student->name      = $request->name;
            $student->unique_id = generateUniqueId('S');
            $student->phone     = $request->contact_number;
            $student->gender    = $request->gender;
            if ($request->hasFile('student_image')) {
                $img          = uploadImage($student->img, $request->file('student_image'), 'uploads/student_images/');
                $student->img = $img;
            }
            $student->password = Hash::make('12345678');
            $student->save();

            $role = Role::where('name', 'student')->first();
            if ($role) {
                $student->assignRole($role);
            } else {
                $role = Role::create(['name' => 'student']);
                $student->assignRole($role);
            }

            $address           = new Address();
            $address->user_id  = $student->id;
            $address->district = $request->district;
            $address->upazilla = $request->upazilla;
            $address->location = $request->location ?? null;
            $address->save();

            $guardian              = new Guardian();
            $guardian->user_id     = $student->id;
            $guardian->father_name = $request->father_name ?? null;
            $guardian->mother_name = $request->mother_name ?? null;
            $guardian->numbers     = json_encode([
                $request->guardian_contact_number,
            ]);
            $guardian->save();

            $academic                   = new Academic();
            $academic->user_id          = $student->id;
            $academic->boarding_fee     = $request->boarding_fee ?? null;
            $academic->academic_fee     = $request->academic_fee ?? null;
            $academic->blood            = $request->blood_group === 'null' ? null : $request->blood_group;
            $academic->reference        = $request->reference ?? null;
            $academic->reference_number = $request->reference_number ?? null;
            $academic->class_id         = $request->joining_class;
            $academic->department_id    = $request->department_id;
            $academic->save();

            // with Admission Fee & Monthly Fee
            if ($request->withFee) {
                $month = date('Y-m');
                IncomeLog::create([
                    'user_id'           => $student->id,
                    'amount'            => $request->admission_fee,
                    'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Admission Fee')->first()->id,             // get from fee_types table
                    'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                    'status'            => 'paid',
                    'payment_period'    => $month,
                    'receiver_id'       => Auth::user()->id,
                ]);
                if ($request->month) {
                    $month = date('Y') . '-' . str_pad($request->month, 2, '0', STR_PAD_LEFT);
                    IncomeLog::create([
                        'user_id'           => $student->id,
                        'amount'            => getStudentFee($student->academics, 'academic'),
                        'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Academic Fee')->first()->id,              // get from fee_types table
                        'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                        'status'            => 'paid',
                        'payment_period'    => $month,
                        'receiver_id'       => Auth::user()->id,
                    ]);

                    IncomeLog::create([
                        'user_id'           => $student->id,
                        'amount'            => getStudentFee($student->academics, 'boarding'),
                        'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Boarding Fee')->first()->id,              // get from fee_types table
                        'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                        'status'            => 'paid',
                        'payment_period'    => $month,
                        'receiver_id'       => Auth::user()->id,
                    ]);
                }
            }
            DB::commit();
            return back()->with([
                'success' => 'Student added successfully',
                'data'    => $student,
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', $th->getMessage());
        }

    }

    public function update_student($student_id, Request $request)
    {
        $request->validate([
            'name'                    => 'required|string|max:120',
            'blood_group'             => 'nullable|in:O+,O-,A+,A-,B+,B-,AB+,AB-,null',
            'contact_number'          => 'nullable|string|max:14|unique:users,phone,' . $student_id,
            'gender'                  => 'required|in:male,female,other',
            'father_name'             => 'required|string|max:120',
            'mother_name'             => 'required|string|max:120',
            'guardian_contact_number' => 'required|string|max:14',
            'district'                => 'required|string|max:120',
            'upazilla'                => 'required|string|max:120',
            'joining_class'           => 'required',
            'department_id'           => 'required',
            'student_image'           => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
            'boarding_fee'            => 'numeric|nullable',
            'academic_fee'            => 'numeric|nullable',
        ]);

        $student         = User::findOrFail($student_id);
        $student->name   = $request->name;
        $student->phone  = $request->contact_number;
        $student->gender = $request->gender;

        if ($request->hasFile('student_image')) {
            $img          = uploadImage($student->img, $request->file('student_image'), 'uploads/student_images/');
            $student->img = $img;
        }

        $student->save();

        // Update Address
        $address           = Address::where('user_id', $student_id)->firstOrFail();
        $address->district = $request->district;
        $address->upazilla = $request->upazilla;
        $address->location = $request->location ?? null;
        $address->save();

        // Update Guardian
        $guardian              = Guardian::where('user_id', $student_id)->firstOrFail();
        $guardian->father_name = $request->father_name;
        $guardian->mother_name = $request->mother_name;
        $guardian->numbers     = json_encode([$request->guardian_contact_number]);
        $guardian->save();

        // Update Academic
        $academic                   = Academic::where('user_id', $student_id)->firstOrFail();
        $academic->boarding_fee     = $request->boarding_fee;
        $academic->academic_fee     = $request->academic_fee;
        $academic->blood            = $request->blood_group === 'null' ? null : $request->blood_group;
        $academic->reference        = $request->reference;
        $academic->reference_number = $request->reference_mobile_number;
        $academic->class_id         = $request->joining_class;
        $academic->department_id    = $request->department_id;
        $academic->save();

        return back()->with('success', 'Student updated successfully');
    }

    public function students()
    {
        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $order     = request()->input('order');
        $filters   = request()->input('filters', []);
        $search    = request()->input('search', '');
        $query     = User::query();

        $page      = request()->input('page', 1);
        $per_page  = request()->input('per_page', 10);
        $sortField = request()->input('sort_field', 'created_at');
        $order     = request()->input('order');
        $filters   = request()->input('filters', []);
        $search    = request()->input('search', '');
        $query     = User::query();

        foreach ($filters as $field => $value) {
            if (is_array($value)) {
                $query->whereIn($field, $value);
            } else {
                $query->where($field, $value);
            }
        }

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        }
        if ($order) {
            $query->orderBy($sortField, $order);
        }

        $user = $query->paginate($per_page, ['*'], 'page', $page);
        return Inertia::render('admin::department/dashboard', [
            'students'  => Inertia::defer(fn() => $user)->merge(),
            'filters'   => $filters,
            'sortOrder' => $order,
        ]);

    }

    public function student_details($department_slug, $student_id)
    {
        $year       = request()->input('year') ?? date('Y');
        $department = Department::where('slug', $department_slug)->firstOrFail();
        // set format for student details
        $student = User::with(['academics', 'address', 'guardians'])->where('unique_id', $student_id)->firstOrFail();
        $student = [
            'id'                  => $student->id,
            'name'                => $student->name,
            'unique_id'           => $student->unique_id,
            'phone'               => $student->phone,
            'gender'              => $student->gender,
            'image'               => $student->img,
            'status'              => $student->status ? 'active' : 'inactive',
            'blood'               => $student->academics->blood ?? null,
            'address'             => [
                'district' => $student->address->district ?? null,
                'upazilla' => $student->address->upazilla ?? null,
                'location' => $student->address->location ?? null,
            ],
            'guardian'            => [
                'father_name' => $student->guardians->father_name ?? null,
                'mother_name' => $student->guardians->mother_name ?? null,
                'phone'       => json_decode($student->guardians->numbers, true) ?? [],
            ],
            'academic'            => [
                'class'            => $student->academics->class->name ?? null,
                'boarding_fee'     => $student->academics->boarding_fee ?? getStudentFee($student->academics, 'boarding'),
                'academic_fee'     => $student->academics->academic_fee ?? getStudentFee($student->academics, 'academic'),
                'reference'        => $student->academics->reference ?? null,
                'reference_number' => $student->academics->reference_number ?? null,
            ],
            'monthly_fee_history' => $student->incomeLogs()->where('payment_period', 'like', $year . '%')->whereHas('feeType', function ($query) {
                $query->whereIn('name', ['Academic Fee', 'Boarding Fee']);
            })->with('receiver')->get()->map(function ($log) {
                return [
                    'id'             => $log->id,
                    'source_details' => $log->source_details,
                    'amount'         => intval($log->amount),
                    'fee_type'       => $log->feeType ? $log->feeType->name : null,
                    'month'          => date('F', strtotime($log->payment_period)),
                    'receiver'       => $log->receiver ? $log->receiver : null,
                ];
            })->groupBy('month')->map(function ($group, $month) {
                return [
                    'month' => $month,
                    'fees'  => $group,
                ];
            })->values(),
        ];
        return Inertia::render('admin::department/student/student_details',
            [
                'department' => $department,
                'student'    => $student,
            ]
        );
    }
}
