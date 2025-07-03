<?php

use App\Models\Academic;
use App\Models\ClassAssign;
use App\Models\Department;
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
    Role::create(['name' => 'teacher']);

    // Create fee types with slugs
    FeeType::create([
        'name' => 'Academic Fee',
        'slug' => 'academic-fee',
    ]);
    FeeType::create([
        'name' => 'Boarding Fee',
        'slug' => 'boarding-fee',
    ]);
    PaymentMethod::create([
        'name' => 'Cash',
        'slug' => 'cash',
    ]);
});

test('dashboard returns successful response', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200);
});

test('dashboard calculates student counts correctly', function () {
    $user = User::factory()->create();
    expect($user)->toBeInstanceOf(User::class);

    // Create department
    $department = Department::create([
        'name' => 'Computer Science',
        'slug' => 'computer-science',
    ]);
    // Create students with role
    $student1    = User::factory()->create(['gender' => 'male']);
    $student2    = User::factory()->create(['gender' => 'female']);
    $studentRole = Role::where('name', 'student')->first();
    $student1->assignRole($studentRole);
    $student2->assignRole($studentRole);

    // Create academic records
    Academic::create([
        'department_id' => $department->id,
        'user_id'       => $student1->id,
        'academic_fee'  => 5000,
        'boarding_fee'  => 3000,
    ]);

    Academic::create([
        'department_id' => $department->id,
        'user_id'       => $student2->id,
        'academic_fee'  => 4000,
        'boarding_fee'  => 2500,
    ]);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200);

    // Check response structure and data
    $response->assertViewHas('page');
    $pageData = $response->viewData('page');

    expect($pageData)->toHaveKey('props');
    expect($pageData['props'])->toHaveKey('data');
    expect($pageData['props']['data'])->toBeArray();
    expect(count($pageData['props']['data']))->toBe(1);

    $departmentData = $pageData['props']['data'][0];
    expect($departmentData['name'])->toBe('Computer Science');
    expect($departmentData['student_count'])->toBe(2);
    expect($departmentData['student_male_count'])->toBe(1);
    expect($departmentData['student_female_count'])->toBe(1);
});

test('dashboard calculates teacher counts correctly', function () {
    $user = User::factory()->create();

    // Create department
    $department = Department::create([
        'name' => 'Mathematics',
        'slug' => 'mathematics',
    ]);

    // Create teachers
    $teacher1 = User::factory()->create(['gender' => 'male']);
    $teacher2 = User::factory()->create(['gender' => 'female']);

    $teacherRole = Role::where('name', 'teacher')->first();
    $teacher1->assignRole($teacherRole);
    $teacher2->assignRole($teacherRole);

    ClassAssign::create([
        'dept_id' => $department->id,
        'user_id' => $teacher1->id,
    ]);

    ClassAssign::create([
        'dept_id' => $department->id,
        'user_id' => $teacher2->id,
    ]);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200);

    $pageData       = $response->viewData('page');
    $departmentData = $pageData['props']['data'][0];

    expect($departmentData['teacher_count'])->toBe(2);
    expect($departmentData['teacher_male_count'])->toBe(1);
    expect($departmentData['teacher_female_count'])->toBe(1);
});

test('dashboard calculates monthly income correctly', function () {
    $user = User::factory()->create();

    // Create department and student
    $department = Department::create([
        'name' => 'Physics',
        'slug' => 'physics',
    ]);

    $student     = User::factory()->create();
    $studentRole = Role::where('name', 'student')->first();
    $student->assignRole($studentRole);

    Academic::create([
        'department_id' => $department->id,
        'user_id'       => $student->id,
        'academic_fee'  => 5000,
        'boarding_fee'  => 3000,
    ]);

    // Create income logs for current month
    $academicFeeType = FeeType::where('name', 'Academic Fee')->first();
    $boardingFeeType = FeeType::where('name', 'Boarding Fee')->first();

    IncomeLog::create([
        'user_id'           => $student->id,
        'fee_type_id'       => $academicFeeType->id,
        'amount'            => 2500,
        'payment_period'    => date('Y-m'),
        'payment_method_id' => PaymentMethod::where('name', 'Cash')->first()->id,
        'source_type'       => 'student',
        'status'            => 'paid',
        'receiver_id'       => $user->id,
    ]);

    IncomeLog::create([
        'user_id'           => $student->id,
        'fee_type_id'       => $boardingFeeType->id,
        'amount'            => 1500,
        'payment_period'    => date('Y-m'),
        'payment_method_id' => PaymentMethod::where('name', 'Cash')->first()->id,
        'source_type'       => 'student',
        'status'            => 'paid',
        'receiver_id'       => $user->id,
    ]);

    // Create income log for different month (should not be included)
    IncomeLog::create([
        'user_id'           => $student->id,
        'fee_type_id'       => $academicFeeType->id,
        'amount'            => 1000,
        'payment_period'    => '2024-12',
        'payment_method_id' => PaymentMethod::where('name', 'Cash')->first()->id,
        'source_type'       => 'student',
        'status'            => 'paid',
        'receiver_id'       => $user->id,
    ]);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200);

    $pageData       = $response->viewData('page');
    $departmentData = $pageData['props']['data'][0];

    expect($departmentData['monthly_income'])->toBe(4000); // 2500 + 1500
    expect($departmentData['total_tk'])->toBe(8000);       // 5000 + 3000
});

test('dashboard handles empty departments', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200);

    $pageData = $response->viewData('page');
    expect($pageData['props']['data'])->toBeArray();
    expect(count($pageData['props']['data']))->toBe(0);
});

test('dashboard requires authentication', function () {
    $response = $this->get('/dashboard');

    // Should redirect if not authenticated
    $response->assertRedirect();
});
