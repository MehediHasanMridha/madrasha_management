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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique(); // Unique transaction ID
            $table->foreignId('user_id')->constrained()->cascadeOnDelete()->nullable();
            $table->enum('transaction_type', ['income', 'expense'])->default('income'); // income or expense
            $table->text('description')->nullable();                                    // Description of the transaction
            $table->decimal('amount', 10, 2);                                           // Amount of the transaction
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
