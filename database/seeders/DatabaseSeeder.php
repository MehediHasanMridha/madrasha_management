<?php
namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user           = new User();
        $user->name     = 'Admin';
        $user->email    = 'admin@gmail.com';
        $user->password = Hash::make('12345678');
        $user->save();

        $role = Role::firstOrCreate(['name' => 'super-admin']);
        $user->assignRole($role);

        // call other seeders
        $this->call([
            DepartmentDataSeeder::class,
            ClassDataSeeder::class,
            StaffDataSeeder::class,
            StudentDataSeeder::class,
            // SubjectDataSeeder::class,
            // GuardianDataSeeder::class,
            // AddressDataSeeder::class,
            // AcademicDataSeeder::class,
        ]);
    }
}
