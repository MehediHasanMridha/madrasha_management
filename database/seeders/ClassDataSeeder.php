<?php
namespace Database\Seeders;

use App\Models\Classes;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ClassDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = [
            // Science Department (id: 1)
            [
                'name'          => 'Class 1 Science',
                'des'           => 'First year science class',
                'img'           => null,
                'department_id' => 1,
            ],
            [
                'name'          => 'Class 2 Science',
                'des'           => 'Second year science class',
                'img'           => null,
                'department_id' => 1,
            ],

            // Arts Department (id: 2)
            [
                'name'          => 'Class 1 Arts',
                'des'           => 'First year arts class',
                'img'           => null,
                'department_id' => 2,
            ],
            [
                'name'          => 'Class 2 Arts',
                'des'           => 'Second year arts class',
                'img'           => null,
                'department_id' => 2,
            ],

            // Commerce Department (id: 3)
            [
                'name'          => 'Class 1 Commerce',
                'des'           => 'First year commerce class',
                'img'           => null,
                'department_id' => 3,
            ],
            [
                'name'          => 'Class 2 Commerce',
                'des'           => 'Second year commerce class',
                'img'           => null,
                'department_id' => 3,
            ],

            // Computer Science Department (id: 4)
            [
                'name'          => 'Class 1 Computer Science',
                'des'           => 'First year computer science class',
                'img'           => null,
                'department_id' => 4,
            ],
            [
                'name'          => 'Class 2 Computer Science',
                'des'           => 'Second year computer science class',
                'img'           => null,
                'department_id' => 4,
            ],

            // Islamic Studies Department (id: 5)
            [
                'name'          => 'Class 1 Islamic Studies',
                'des'           => 'First year Islamic studies class',
                'img'           => null,
                'department_id' => 5,
            ],
            [
                'name'          => 'Class 2 Islamic Studies',
                'des'           => 'Second year Islamic studies class',
                'img'           => null,
                'department_id' => 5,
            ],
        ];

        foreach ($classes as $classData) {
            Classes::create([
                'name'          => $classData['name'],
                'slug'          => Str::slug($classData['name']),
                'des'           => $classData['des'],
                'img'           => $classData['img'],
                'department_id' => $classData['department_id'],
            ]);
        }

    }
}
