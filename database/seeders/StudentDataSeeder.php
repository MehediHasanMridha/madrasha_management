<?php
namespace Database\Seeders;

use App\Models\Academic;
use App\Models\Address;
use App\Models\Guardian;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class StudentDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(50)->make()->each(function ($student) {
            $student->name      = fake()->name();
            $student->unique_id = generateUniqueId('S');
            $student->phone     = '1234567890';
            $student->password  = Hash::make('12345678');
            $student->save();

            $role = Role::firstOrCreate(['name' => 'student']);
            $student->assignRole($role);

            Address::create([
                'user_id'  => $student->id,
                'district' => 'Dhaka',
                'upazilla' => 'Gazipur',
                'location' => 'Dhaka',
            ]);

            Guardian::create([
                'user_id'     => $student->id,
                'father_name' => 'John Doe',
                'mother_name' => 'Jane Doe',
                'numbers'     => json_encode(['01712345678']),
            ]);

            Academic::create([
                'user_id'          => $student->id,
                'boarding_fee'     => 854,
                'academic_fee'     => 854,
                'blood'            => 'A+',
                'reference'        => null,
                'reference_number' => null,
                'class_id'         => 1,
                'department_id'    => 2,
            ]);
        });

    }
}
