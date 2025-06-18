<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('slug', 180)->unique();
            $table->text('description')->nullable();
            $table->foreignId('department_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['midterm', 'final', 'quiz', 'assessment', 'other'])->default('midterm');
            $table->enum('status', ['draft', 'scheduled', 'ongoing', 'completed', 'cancelled'])->default('draft');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->datetime('registration_start')->nullable();
            $table->datetime('registration_end')->nullable();
            $table->foreignId('fee_type_id')->nullable()->constrained('fee_types')->nullOnDelete();
            $table->boolean('is_fee_required')->default(false);
            $table->text('instructions')->nullable();
            $table->integer('total_marks')->default(100);
            $table->integer('pass_marks')->default(40);
            $table->integer('duration_minutes')->nullable(); // Exam duration in minutes
            $table->json('meta_data')->nullable();           // For storing additional exam configuration
            $table->timestamp('published_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            // Indexes for better performance
            $table->index(['department_id', 'status']);
            $table->index(['start_date', 'end_date']);
            $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
