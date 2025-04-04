<?php
namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DepartmentDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Science',
                'des'  => 'Science department includes Physics, Chemistry, Biology, etc.',
                'img'  => null,
            ],
            [
                'name' => 'Arts',
                'des'  => 'Arts department includes Literature, History, Geography, etc.',
                'img'  => null,
            ],
            [
                'name' => 'Commerce',
                'des'  => 'Commerce department includes Accounting, Business Studies, Economics, etc.',
                'img'  => null,
            ],
            [
                'name' => 'Computer Science',
                'des'  => 'Computer Science department includes Programming, Database, Networking, etc.',
                'img'  => null,
            ],
            [
                'name' => 'Islamic Studies',
                'des'  => 'Islamic Studies department includes Quran, Hadith, Fiqh, etc.',
                'img'  => null,
            ],
        ];

        foreach ($departments as $departmentData) {
            Department::create([
                'name' => $departmentData['name'],
                'slug' => Str::slug($departmentData['name']),
                'des'  => $departmentData['des'],
                'img'  => $departmentData['img'],
            ]);
        }

    }
}
