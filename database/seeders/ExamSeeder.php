<?php
namespace Database\Seeders;

use App\Models\Classes;
use App\Models\Department;
use App\Models\Exam;
use App\Models\ExamSubject;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create a test user to be the exam creator
        $creator = User::first();

        if (! $creator) {
            $creator = User::create([
                'name'     => 'Test Admin',
                'email'    => 'admin@test.com',
                'password' => bcrypt('password'),
            ]);
        }

        // Get departments with their classes
        $departments = Department::with('classes.subjects')->get();

        foreach ($departments as $department) {
            if ($department->classes->isEmpty()) {
                continue;
            }

            // Create 3-5 exams per department
            $examCount = rand(3, 5);

            for ($i = 1; $i <= $examCount; $i++) {
                $examTypes    = ['midterm', 'final', 'quiz', 'assessment'];
                $examStatuses = ['draft', 'scheduled', 'ongoing', 'completed'];

                // Create exams across multiple years for better testing
                $years        = [2023, 2024, 2025];
                $selectedYear = $years[array_rand($years)];

                $baseDate  = now()->setYear($selectedYear)->setMonth(rand(1, 12))->setDay(1);
                $startDate = $baseDate->copy()->addDays(rand(0, 28));
                $endDate   = $startDate->copy()->addDays(rand(1, 14));

                $exam = Exam::create([
                    'name'               => $department->name . ' ' . ucfirst($examTypes[array_rand($examTypes)]) . ' Exam ' . $i,
                    'slug'               => Str::slug($department->name . ' ' . $examTypes[array_rand($examTypes)] . ' exam ' . $i),
                    'description'        => 'This is a comprehensive examination for ' . $department->name . ' department students.',
                    'department_id'      => $department->id,
                    'type'               => $examTypes[array_rand($examTypes)],
                    'status'             => $examStatuses[array_rand($examStatuses)],
                    'start_date'         => $startDate,
                    'end_date'           => $endDate,
                    'registration_start' => $startDate->copy()->subDays(rand(7, 21)),
                    'registration_end'   => $startDate->copy()->subDays(rand(1, 7)),
                    'exam_fee'           => rand(0, 1) ? rand(100, 1000) : 0,
                    'is_fee_required'    => rand(0, 1),
                    'instructions'       => 'Please arrive 30 minutes before the exam starts. Bring your student ID and necessary stationery.',
                    'total_marks'        => rand(80, 120),
                    'pass_marks'         => rand(32, 48),
                    'duration_minutes'   => rand(60, 180),
                    'published_at'       => rand(0, 1) ? now() : null,
                    'created_by'         => $creator->id,
                ]);

                // Attach random classes to the exam
                $classesToAttach = $department->classes->random(rand(1, min(3, $department->classes->count())));
                $exam->classes()->attach($classesToAttach->pluck('id'));

                // Create exam subjects for each attached class
                foreach ($classesToAttach as $class) {
                    $subjects = $class->subjects;

                    if ($subjects->isNotEmpty()) {
                        // Select 2-4 subjects randomly for the exam
                        $examSubjects = $subjects->random(min(rand(2, 4), $subjects->count()));

                        foreach ($examSubjects as $subject) {
                            $subjectExamDate = $startDate->copy()->addDays(rand(0, ($endDate->diffInDays($startDate))));

                            ExamSubject::create([
                                'exam_id'      => $exam->id,
                                'subject_id'   => $subject->id,
                                'class_id'     => $class->id,
                                'exam_date'    => $subjectExamDate,
                                'start_time'   => sprintf('%02d:%02d', rand(8, 14), [0, 30][rand(0, 1)]),
                                'end_time'     => sprintf('%02d:%02d', rand(15, 17), [0, 30][rand(0, 1)]),
                                'total_marks'  => rand(50, 100),
                                'pass_marks'   => rand(20, 40),
                                'instructions' => 'Subject-specific instructions for ' . $subject->name,
                                'status'       => 'scheduled',
                            ]);
                        }
                    }
                }
            }
        }

        $this->command->info('Exam seeding completed successfully!');
        $this->command->info('Created exams for ' . $departments->count() . ' departments.');
    }
}
