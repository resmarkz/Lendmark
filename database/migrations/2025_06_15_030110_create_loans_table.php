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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->string('marketing_id')->nullable()->unique();
            $table->decimal('amount', 10, 2);
            $table->integer('term'); // in months
            $table->float('interest_rate');
            $table->enum('status', ['ongoing', 'pending', 'approved', 'rejected', 'completed', 'settled'])->default('pending');
            $table->date('due_date')->nullable();
            $table->foreignId('collector_profile_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('client_profile_id')->nullable()->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
