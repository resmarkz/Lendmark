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
            $table->foreignId('client_profile_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->integer('term'); // in months
            $table->float('interest_rate');
            $table->enum('status', ['ongoing', 'pending', 'approved', 'rejected', 'completed']);
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
