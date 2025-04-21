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
        Schema::create('expense_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete(); // টিচারের আইডি
            $table->foreignId('voucher_type_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 10, 2);    // খরচের পরিমাণ
            $table->date('date');                // খরচের তারিখ
            $table->json('details')->nullable(); // খরচের বিস্তারিত (যেমন: "টিচার বেতন মার্চ মাসের জন্য")
            $table->text('remarks')->nullable(); // ব্যয়ের বিস্তারিত (যেমন: "টিচার বেতন মার্চ মাসের জন্য")
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expense_logs');
    }
};
