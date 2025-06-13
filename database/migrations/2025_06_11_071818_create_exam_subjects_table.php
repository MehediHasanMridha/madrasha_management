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
        Schema::create('exam_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete();
            $table->datetime('exam_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('total_marks')->default(100);
            $table->integer('pass_marks')->default(40);
            $table->text('instructions')->nullable();
            $table->enum('status', ['scheduled', 'ongoing', 'completed', 'cancelled'])->default('scheduled');
            $table->timestamps();

            // Ensure unique combination
            $table->unique(['exam_id', 'subject_id', 'class_id']);

            // Indexes for better performance
            $table->index(['exam_id', 'class_id']);
            $table->index(['exam_date', 'start_time']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_subjects');
    }
};
