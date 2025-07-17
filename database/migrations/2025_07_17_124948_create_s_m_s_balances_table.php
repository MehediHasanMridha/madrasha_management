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
        Schema::create('sms_balances', function (Blueprint $table) {
            $table->id();
            $table->decimal('balance', 10, 2)->default(0);               // Assuming a default balance of 0
            $table->decimal('last_recharged_amount', 10, 2)->nullable(); // Nullable field for last recharged amount
            $table->timestamp('last_recharge_date')->nullable();         // Nullable field for last recharge date
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sms_balances');
    }
};
