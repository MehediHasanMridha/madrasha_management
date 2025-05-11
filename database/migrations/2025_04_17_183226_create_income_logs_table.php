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
        Schema::create('income_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete()->nullable();
            $table->enum('source_type', ['student', 'donation', 'sponsor', 'other'])->default('student'); // student, donation, sale, sponsor, etc.
            $table->text('source_details')->nullable();
            $table->decimal('amount', 10, 2);
            $table->foreignId('fee_type_id')->constrained()->nullable();
            $table->foreignId('payment_method_id')->constrained()->nullable();
            $table->string('payment_period', 20)->nullable(); // e.g. 2025-04
            $table->enum('status', ['paid', 'pending', 'failed'])->default('paid');
            $table->foreignId('receiver_id')->constrained('users')->nullable();
            $table->unique(['user_id', 'fee_type_id', 'payment_period', 'source_type'], 'unique_income_log'); // to avoid duplicate entries
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('income_logs');
    }
};
