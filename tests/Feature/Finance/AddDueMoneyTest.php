<?php

use App\Models\Academic;
use App\Models\Classes;
use App\Models\Department;
use App\Models\FeeType;
use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use App\Models\StudentDue;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create necessary roles
    Role::create(['name' => 'student']);
    Role::create(['name' => 'teacher']);
    Role::create(['name' => 'admin']);

    // Create authenticated user
    $this->user = User::factory()->create();
    $this->user->assignRole('admin');

    // Create department and class
    $this->department = Department::create([
        'name' => 'Computer Science',
        'slug' => 'computer-science',
    ]);

    $this->class = Classes::create([
        'name'          => 'Class 10',
        'slug'          => 'class-10',
        'department_id' => $this->department->id,
    ]);

    // Create fee types linked to the class
    $this->academicFeeType = FeeType::create([
        'name'          => 'Academic Fee',
        'slug'          => 'academic-fee',
        'class_id'      => $this->class->id,
        'department_id' => $this->department->id,
        'amount'        => 3000,
    ]);

    $this->boardingFeeType = FeeType::create([
        'name'          => 'Boarding Fee',
        'slug'          => 'boarding-fee',
        'class_id'      => $this->class->id,
        'department_id' => $this->department->id,
        'amount'        => 2000,
    ]);

    // Create payment method
    $this->paymentMethod = PaymentMethod::create([
        'name' => 'Cash',
        'slug' => 'cash',
    ]);

    // Create student with academic record
    $this->student = User::factory()->create();
    $this->student->assignRole('student');

    Academic::create([
        'user_id'       => $this->student->id,
        'department_id' => $this->department->id,
        'class_id'      => $this->class->id,
        'academic_fee'  => 3000,
        'boarding_fee'  => 2000,
    ]);

    // Create income logs for academic and boarding fees
    $this->academicIncomeLog = IncomeLog::create([
        'user_id'           => $this->student->id,
        'amount'            => 2500, // Less than full fee (3000), so there's a due
        'fee_type_id'       => $this->academicFeeType->id,
        'payment_method_id' => $this->paymentMethod->id,
        'payment_period'    => '2025-01',
        'status'            => 'paid',
        'source_type'       => 'student',
        'receiver_id'       => $this->user->id,
    ]);

    $this->boardingIncomeLog = IncomeLog::create([
        'user_id'           => $this->student->id,
        'amount'            => 1500, // Less than full fee (2000), so there's a due
        'fee_type_id'       => $this->boardingFeeType->id,
        'payment_method_id' => $this->paymentMethod->id,
        'payment_period'    => '2025-01',
        'status'            => 'paid',
        'source_type'       => 'student',
        'receiver_id'       => $this->user->id,
    ]);

    // Create student dues
    $this->academicDue = StudentDue::create([
        'income_log_id' => $this->academicIncomeLog->id,
        'due_amount'    => 500, // 3000 - 2500
    ]);

    $this->boardingDue = StudentDue::create([
        'income_log_id' => $this->boardingIncomeLog->id,
        'due_amount'    => 500, // 2000 - 1500
    ]);
});

test('authenticated user can add due money successfully', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 300,
            'boarding_due'       => 200,
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Due money added successfully');

    // Verify that income logs were updated
    $this->academicIncomeLog->refresh();
    $this->boardingIncomeLog->refresh();

    expect((float) $this->academicIncomeLog->amount)->toBe(2800.0); // 2500 + 300
    expect((float) $this->boardingIncomeLog->amount)->toBe(1700.0); // 1500 + 200

    // Verify that student dues were deleted
    expect(StudentDue::find($this->academicDue->id))->toBeNull();
    expect(StudentDue::find($this->boardingDue->id))->toBeNull();
});

test('unauthenticated user cannot add due money', function () {
    $response = $this->post(route('finance.add_due_money'), [
        'academic_income_id' => $this->academicIncomeLog->id,
        'boarding_income_id' => $this->boardingIncomeLog->id,
        'academic_due'       => 300,
        'boarding_due'       => 200,
    ]);

    $response->assertRedirect(route('login'));
});

test('validation fails when academic_income_id is missing', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 300,
            'boarding_due'       => 200,
        ]);

    $response->assertSessionHasErrors(['academic_income_id']);
});

test('validation fails when boarding_income_id is missing', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'academic_due'       => 300,
            'boarding_due'       => 200,
        ]);

    $response->assertSessionHasErrors(['boarding_income_id']);
});

test('validation fails when academic_due is missing', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'boarding_due'       => 200,
        ]);

    $response->assertSessionHasErrors(['academic_due']);
});

test('validation fails when boarding_due is missing', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 300,
        ]);

    $response->assertSessionHasErrors(['boarding_due']);
});

test('validation fails when academic_income_id does not exist', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => 999999, // Non-existent ID
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 300,
            'boarding_due'       => 200,
        ]);

    $response->assertSessionHasErrors(['academic_income_id']);
});

test('validation fails when boarding_income_id does not exist', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => 999999, // Non-existent ID
            'academic_due'       => 300,
            'boarding_due'       => 200,
        ]);

    $response->assertSessionHasErrors(['boarding_income_id']);
});

test('validation fails when academic_due is negative', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => -100,
            'boarding_due'       => 200,
        ]);

    $response->assertSessionHasErrors(['academic_due']);
});

test('validation fails when boarding_due is negative', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 300,
            'boarding_due'       => -100,
        ]);

    $response->assertSessionHasErrors(['boarding_due']);
});

test('validation accepts zero values for due amounts', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 0,
            'boarding_due'       => 0,
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Due money added successfully');

    // Verify that income logs remain unchanged
    $this->academicIncomeLog->refresh();
    $this->boardingIncomeLog->refresh();

    expect((float) $this->academicIncomeLog->amount)->toBe(2500.0);
    expect((float) $this->boardingIncomeLog->amount)->toBe(1500.0);
});

test('can add due money when income logs have no student dues', function () {
    // Delete existing student dues
    $this->academicDue->delete();
    $this->boardingDue->delete();

    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 300,
            'boarding_due'       => 200,
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Due money added successfully');

    // Verify that income logs were updated
    $this->academicIncomeLog->refresh();
    $this->boardingIncomeLog->refresh();

    expect((float) $this->academicIncomeLog->amount)->toBe(2800.0);
    expect((float) $this->boardingIncomeLog->amount)->toBe(1700.0);
});

test('validation fails when academic_due is not numeric', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 'not-a-number',
            'boarding_due'       => 200,
        ]);

    $response->assertSessionHasErrors(['academic_due']);
});

test('validation fails when boarding_due is not numeric', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 300,
            'boarding_due'       => 'not-a-number',
        ]);

    $response->assertSessionHasErrors(['boarding_due']);
});

test('can add partial due amounts', function () {
    $response = $this->actingAs($this->user)
        ->post(route('finance.add_due_money'), [
            'academic_income_id' => $this->academicIncomeLog->id,
            'boarding_income_id' => $this->boardingIncomeLog->id,
            'academic_due'       => 250.50, // Partial amount with decimals
            'boarding_due'       => 150.75,
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Due money added successfully');

    // Verify that income logs were updated with precise amounts
    $this->academicIncomeLog->refresh();
    $this->boardingIncomeLog->refresh();

    expect((float) $this->academicIncomeLog->amount)->toBe(2750.50);
    expect((float) $this->boardingIncomeLog->amount)->toBe(1650.75);
});
