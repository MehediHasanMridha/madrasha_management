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

        User::factory(50)->create()->each(function ($staff) {
            $staff->name      = fake()->name();
            $staff->unique_id = generateUniqueId('S');
            $staff->phone     = '1234567890';
            $staff->password  = Hash::make('12345678');
            $staff->save();

            $role = Role::firstOrCreate(['name' => 'staff']);
            $staff->assignRole($role);

            Address::create([
                'user_id'  => $staff->id,
                'district' => 'Dhaka',
                'upazilla' => 'Gazipur',
                'location' => 'Dhaka',
            ]);

            Guardian::create([
                'user_id'     => $staff->id,
                'father_name' => 'John Doe',
                'mother_name' => 'Jane Doe',
                'numbers'     => json_encode(['01712345678']),
            ]);

            $staff->academic()->create([
                'salary'           => 8540,
                'blood'            => 'A+',
                'reference'        => null,
                'reference_number' => null,
                'class_id'         => 1,
                'department_id'    => 2,
            ]);
        });

    }
}
