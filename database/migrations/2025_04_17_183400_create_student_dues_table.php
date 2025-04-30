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
        Schema::create('student_dues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('income_log_id')->constrained()->cascadeOnDelete(); // ছাত্র
            $table->decimal('due_amount', 10, 2);                                 //virtualAs('expected_amount - paid_amount'); // অটোম্যাটিক হিসেব
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_dues');
    }
};
