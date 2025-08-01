<?php
namespace App\Actions\Department\Student;

use App\Models\Academic;
use App\Models\Address;
use App\Models\Guardian;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Lorisleiva\Actions\Concerns\AsAction;
use Spatie\Permission\Models\Role;

class AddStudent
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle($request)
    {
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

        return $student;

    }

}
