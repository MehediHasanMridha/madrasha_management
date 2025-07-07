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
        Schema::create('exam_marks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete();
            $table->decimal('marks_obtained', 5, 2)->nullable();
            $table->decimal('total_marks', 5, 2)->default(100);
            $table->decimal('pass_marks', 5, 2)->default(40);
            $table->enum('grade', ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'])->nullable();
            $table->enum('status', ['present', 'absent', 'incomplete'])->default('present');
            $table->text('remarks')->nullable();
            $table->timestamps();

            // Ensure unique combination
            $table->unique(['exam_id', 'student_id', 'subject_id', 'class_id']);

            // Indexes for better performance
            $table->index(['exam_id', 'class_id']);
            $table->index(['student_id', 'exam_id']);
            $table->index(['exam_id', 'subject_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_marks');
    }
};
