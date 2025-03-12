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
        Schema::create('academics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('nid', 120)->nullable();
            $table->decimal('salary', 10, 2)->nullable();
            $table->decimal('boarding_fee', 10, 2)->nullable();
            $table->decimal('academic_fee', 10, 2)->nullable();
            $table->string('designation', 120)->nullable();
            $table->enum('blood', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])->nullable();
            $table->string('reference', 120)->nullable();
            $table->string('reference_number', 120)->nullable();
            $table->foreignId('department_id')->nullable()->constrained();
            $table->foreignId('class_id')->nullable()->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academics');
    }
};
