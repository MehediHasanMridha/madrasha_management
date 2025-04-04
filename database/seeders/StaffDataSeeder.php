<?php
namespace Database\Seeders;

use App\Models\Academic;
use App\Models\Address;
use App\Models\Guardian;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class StaffDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(50)->create([
            'name'     => 'John Doe',
            // 'unique_id' => 'STU' . str_pad('3453454', 6, '0', STR_PAD_LEFT),
            'phone'    => '1234567890',
            'password' => Hash::make('12345678'),
        ])->each(function ($student) {
            $role = Role::firstOrCreate(['name' => 'staff']);
            $student->assignRole($role);

            $address           = new Address();
            $address->user_id  = $student->id;
            $address->district = 'Dhaka';
            $address->upazilla = 'Gazipur';
            $address->location = 'Dhaka';
            $address->save();

            $guardian              = new Guardian();
            $guardian->user_id     = $student->id;
            $guardian->father_name = 'John Doe';
            $guardian->mother_name = 'Jane Doe';
            $guardian->numbers     = json_encode([
                '01712345678',
            ]);
            $guardian->save();

            $academic                   = new Academic();
            $academic->user_id          = $student->id;
            $academic->boarding_fee     = 854;
            $academic->academic_fee     = 854;
            $academic->blood            = 'A+';
            $academic->reference        = null;
            $academic->reference_number = null;
            $academic->class_id         = 1;
            $academic->department_id    = 2;
            $academic->save();

        });

    }
}
