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
        Schema::create('fee_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();                     // example: academic, boarding, admission
            $table->decimal('default_amount', 10, 2)->nullable(); // যদি সব ছাত্রের জন্য এক হয়
            $table->boolean('is_variable')->default(false);       // true হলে student-custom amount লাগবে
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_types');
    }
};
