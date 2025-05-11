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
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();           // টিচারের আইডি
            $table->string('holder_name')->nullable();                                            // খরচের জন্য যিনি অনুমোদন দিয়েছেন
            $table->foreignId('voucher_type_id')->constrained()->nullable();                      // ভাউচার টাইপ (যেমন: টিচার বেতন, বিদ্যুৎ বিল, পানি বিল)
            $table->decimal('amount', 10, 2);                                                     // খরচের পরিমাণ
            $table->date('date')->nullable();                                                     // খরচের সময়কাল (যেমন: "2025-04")
            $table->json('details')->nullable();                                                  // খরচের বিস্তারিত (যেমন: "টিচার বেতন মার্চ মাসের জন্য")
            $table->text('note')->nullable();                                                     // খরচের বর্ণনা
            $table->foreignId('created_by')->nullable()->constrained('users')->cascadeOnDelete(); // track who created the record
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
