<?php

use App\Models\Academic;
use App\Models\Classes;
use App\Models\Department;
use App\Models\Exam;
use App\Models\FeeType;
use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create necessary roles
    Role::create(['name' => 'student']);
    Role::create(['name' => 'staff']);
    Role::create(['name' => 'admin']);

    // Create payment method
    PaymentMethod::create([
        'name'      => 'Cash',
        'slug'      => 'cash',
        'is_active' => true,
    ]);

    // Create authenticated user
    $this->user = User::factory()->create();
    $this->user->assignRole('admin');
});

describe('DepartmentController exams_details', function () {
    test('can view exam details successfully', function () {
        // Create department
        $department = Department::factory()->create([
            'name' => 'Computer Science',
            'slug' => 'computer-science',
        ]);

        // Create fee type for exam
        $feeType = FeeType::factory()->create([
            'name'          => 'Exam Fee',
            'slug'          => 'exam-fee',
            'amount'        => 500,
            'department_id' => $department->id,
        ]);

        // Create exam
        $exam = Exam::factory()->create([
            'name'            => 'Midterm Exam',
            'slug'            => 'midterm-exam',
            'department_id'   => $department->id,
            'fee_type_id'     => $feeType->id,
            'is_fee_required' => true,
        ]);

        // Create classes
        $class1 = Classes::factory()->create([
            'name'          => 'Class 1',
            'slug'          => 'class-1',
            'department_id' => $department->id,
        ]);

        $class2 = Classes::factory()->create([
            'name'          => 'Class 2',
            'slug'          => 'class-2',
            'department_id' => $department->id,
        ]);

        // Associate classes with exam
        $exam->classes()->attach([$class1->id, $class2->id]);

        // Create students
        $student1 = User::factory()->create(['name' => 'John Doe']);
        $student1->assignRole('student');
        $student2 = User::factory()->create(['name' => 'Jane Smith']);
        $student2->assignRole('student');
        $student3 = User::factory()->create(['name' => 'Bob Johnson']);
        $student3->assignRole('student');

        // Create academics (student enrollments)
        Academic::factory()->create([
            'user_id'       => $student1->id,
            'department_id' => $department->id,
            'class_id'      => $class1->id,
        ]);

        Academic::factory()->create([
            'user_id'       => $student2->id,
            'department_id' => $department->id,
            'class_id'      => $class1->id,
        ]);

        Academic::factory()->create([
            'user_id'       => $student3->id,
            'department_id' => $department->id,
            'class_id'      => $class2->id,
        ]);

        // Create income logs (fee payments) for some students
        $paymentMethod = PaymentMethod::first();
        IncomeLog::factory()->create([
            'user_id'           => $student1->id,
            'fee_type_id'       => $feeType->id,
            'payment_method_id' => $paymentMethod->id,
            'amount'            => 500,
            'status'            => 'paid',
        ]);

        IncomeLog::factory()->create([
            'user_id'           => $student2->id,
            'fee_type_id'       => $feeType->id,
            'payment_method_id' => $paymentMethod->id,
            'amount'            => 500,
            'status'            => 'paid',
        ]);

        // Act
        $response = $this->actingAs($this->user)->get(route('department.exams_details', [
            'exam_slug'       => $exam->slug,
            'department_slug' => $department->slug,
        ]));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page
                ->component('admin::department/exam/exams_details', false)
                ->has('exam')
                ->has('department')
                ->has('classes')
                ->where('exam.id', $exam->id)
                ->where('exam.name', $exam->name)
                ->where('department.id', $department->id)
                ->where('department.name', $department->name)
        );
    });

    test('calculates fee statistics correctly', function () {
        // Create department
        $department = Department::factory()->create([
            'name' => 'Mathematics',
            'slug' => 'mathematics',
        ]);

        // Create fee type for exam
        $feeType = FeeType::factory()->create([
            'name'          => 'Exam Fee',
            'slug'          => 'exam-fee-math',
            'amount'        => 1000,
            'department_id' => $department->id,
        ]);

        // Create exam
        $exam = Exam::factory()->create([
            'name'            => 'Final Exam',
            'slug'            => 'final-exam',
            'department_id'   => $department->id,
            'fee_type_id'     => $feeType->id,
            'is_fee_required' => true,
        ]);

        // Create class
        $class = Classes::factory()->create([
            'name'          => 'Advanced Math',
            'slug'          => 'advanced-math',
            'department_id' => $department->id,
        ]);

        // Associate class with exam
        $exam->classes()->attach([$class->id]);

        // Create 5 students
        $students = User::factory()->count(5)->create();
        foreach ($students as $student) {
            $student->assignRole('student');
            Academic::factory()->create([
                'user_id'       => $student->id,
                'department_id' => $department->id,
                'class_id'      => $class->id,
            ]);
        }

        // Create payments for 3 students (2 unpaid)
        $paymentMethod = PaymentMethod::first();
        for ($i = 0; $i < 3; $i++) {
            IncomeLog::factory()->create([
                'user_id'           => $students[$i]->id,
                'fee_type_id'       => $feeType->id,
                'payment_method_id' => $paymentMethod->id,
                'amount'            => 1000,
                'status'            => 'paid',
            ]);
        }

        // Act
        $response = $this->actingAs($this->user)->get(route('department.exams_details', [
            'exam_slug'       => $exam->slug,
            'department_slug' => $department->slug,
        ]));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page
                ->has('classes', 1)
                ->where('classes.0.total_students', 5)
                ->where('classes.0.total_paid_students', 3)
                ->where('classes.0.total_paid_amount', 3000)
                ->where('classes.0.expected_total_fee', 5000)
                ->where('classes.0.class.name', 'Advanced Math')
        );
    });

    test('handles exam without fee correctly', function () {
        // Create department
        $department = Department::factory()->create([
            'name' => 'English',
            'slug' => 'english',
        ]);

        // Create exam without fee
        $exam = Exam::factory()->withoutFee()->create([
            'name'          => 'Practice Test',
            'slug'          => 'practice-test',
            'department_id' => $department->id,
        ]);

        // Create class
        $class = Classes::factory()->create([
            'name'          => 'English Literature',
            'slug'          => 'english-literature',
            'department_id' => $department->id,
        ]);

        // Associate class with exam
        $exam->classes()->attach([$class->id]);

        // Create students
        $students = User::factory()->count(3)->create();
        foreach ($students as $student) {
            $student->assignRole('student');
            Academic::factory()->create([
                'user_id'       => $student->id,
                'department_id' => $department->id,
                'class_id'      => $class->id,
            ]);
        }

        // Act
        $response = $this->actingAs($this->user)->get(route('department.exams_details', [
            'exam_slug'       => $exam->slug,
            'department_slug' => $department->slug,
        ]));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page
                ->has('classes', 1)
                ->where('classes.0.total_students', 3)
                ->where('classes.0.total_paid_students', 0)
                ->where('classes.0.total_paid_amount', 0)
                ->where('classes.0.expected_total_fee', 0)
        );
    });

    test('handles multiple classes with different payment statuses', function () {
        // Create department
        $department = Department::factory()->create([
            'name' => 'Science',
            'slug' => 'science',
        ]);

        // Create fee type for exam
        $feeType = FeeType::factory()->create([
            'name'          => 'Science Exam Fee',
            'slug'          => 'science-exam-fee',
            'amount'        => 750,
            'department_id' => $department->id,
        ]);

        // Create exam
        $exam = Exam::factory()->create([
            'name'            => 'Science Exam',
            'slug'            => 'science-exam',
            'department_id'   => $department->id,
            'fee_type_id'     => $feeType->id,
            'is_fee_required' => true,
        ]);

        // Create two classes
        $class1 = Classes::factory()->create([
            'name'          => 'Physics',
            'slug'          => 'physics',
            'department_id' => $department->id,
        ]);

        $class2 = Classes::factory()->create([
            'name'          => 'Chemistry',
            'slug'          => 'chemistry',
            'department_id' => $department->id,
        ]);

        // Associate classes with exam
        $exam->classes()->attach([$class1->id, $class2->id]);

        // Create students for class 1 (2 students, 1 paid)
        $class1Students = User::factory()->count(2)->create();
        foreach ($class1Students as $student) {
            $student->assignRole('student');
            Academic::factory()->create([
                'user_id'       => $student->id,
                'department_id' => $department->id,
                'class_id'      => $class1->id,
            ]);
        }

        // Create students for class 2 (3 students, 2 paid)
        $class2Students = User::factory()->count(3)->create();
        foreach ($class2Students as $student) {
            $student->assignRole('student');
            Academic::factory()->create([
                'user_id'       => $student->id,
                'department_id' => $department->id,
                'class_id'      => $class2->id,
            ]);
        }

        // Create payments for class 1 (1 payment)
        $paymentMethod = PaymentMethod::first();
        IncomeLog::factory()->create([
            'user_id'           => $class1Students[0]->id,
            'fee_type_id'       => $feeType->id,
            'payment_method_id' => $paymentMethod->id,
            'amount'            => 750,
            'status'            => 'paid',
        ]);

        // Create payments for class 2 (2 payments)
        for ($i = 0; $i < 2; $i++) {
            IncomeLog::factory()->create([
                'user_id'           => $class2Students[$i]->id,
                'fee_type_id'       => $feeType->id,
                'payment_method_id' => $paymentMethod->id,
                'amount'            => 750,
                'status'            => 'paid',
            ]);
        }

        // Act
        $response = $this->actingAs($this->user)->get(route('department.exams_details', [
            'exam_slug'       => $exam->slug,
            'department_slug' => $department->slug,
        ]));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page
                ->has('classes', 2)
                ->where('classes.0.total_students', 2)
                ->where('classes.0.total_paid_students', 1)
                ->where('classes.0.total_paid_amount', 750)
                ->where('classes.0.expected_total_fee', 1500)
                ->where('classes.1.total_students', 3)
                ->where('classes.1.total_paid_students', 2)
                ->where('classes.1.total_paid_amount', 1500)
                ->where('classes.1.expected_total_fee', 2250)
        );
    });

    test('returns 404 for non-existent exam', function () {
        $department = Department::factory()->create([
            'slug' => 'test-department',
        ]);

        $response = $this->actingAs($this->user)->get(route('department.exams_details', [
            'exam_slug'       => 'non-existent-exam',
            'department_slug' => $department->slug,
        ]));

        $response->assertStatus(404);
    });

    test('returns 404 for non-existent department', function () {
        $response = $this->actingAs($this->user)->get(route('department.exams_details', [
            'exam_slug'       => 'some-exam',
            'department_slug' => 'non-existent-department',
        ]));

        $response->assertStatus(404);
    });

    test('returns 404 for exam not belonging to department', function () {
        $department1 = Department::factory()->create(['slug' => 'department-1']);
        $department2 = Department::factory()->create(['slug' => 'department-2']);

        $exam = Exam::factory()->create([
            'slug'          => 'test-exam',
            'department_id' => $department1->id,
        ]);

        $response = $this->actingAs($this->user)->get(route('department.exams_details', [
            'exam_slug'       => $exam->slug,
            'department_slug' => $department2->slug,
        ]));

        $response->assertStatus(404);
    });

    test('requires authentication', function () {
        $department = Department::factory()->create(['slug' => 'test-department']);
        $exam       = Exam::factory()->create([
            'slug'          => 'test-exam',
            'department_id' => $department->id,
        ]);

        $response = $this->get('/department/exams/' . $exam->slug . '/' . $department->slug);

        $response->assertRedirect('/login');
    });
});
