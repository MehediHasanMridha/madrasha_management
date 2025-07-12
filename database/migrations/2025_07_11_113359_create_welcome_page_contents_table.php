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
        Schema::create('welcome_page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique(); // e.g., 'hero', 'stats', 'curriculum'
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->json('data')->nullable(); // Store structured data like stats, images, etc.
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('welcome_page_contents');
    }
};
