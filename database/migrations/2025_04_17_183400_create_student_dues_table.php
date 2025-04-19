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
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();                   // ছাত্র
            $table->foreignId('fee_type_id')->constrained()->cascadeOnDelete();               // academic, boarding etc.
            $table->string('due_period', 20);                                                 // eg: '2025-04'
            $table->decimal('expected_amount', 10, 2);                                        // মোট কত টাকা expected
            $table->decimal('paid_amount', 10, 2)->default(0);                                // এখন পর্যন্ত কত দিয়েছে
            $table->decimal('due_amount', 10, 2)->virtualAs('expected_amount - paid_amount'); // অটোম্যাটিক হিসেব
            $table->unique(['user_id', 'fee_type_id', 'due_period']);                         // যেন ডুপ্লিকেট না হয়
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
