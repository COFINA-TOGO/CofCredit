<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId("verbal_trial_id")->constrained(table: 'verbals_trials', column: 'id')->cascadeOnDelete();
            $table->string("phone_number");
            $table->string("head_credit_observation")->nullable();
            $table->enum("head_credit_validation", ["waiting", "rejected", "validated"])->default(("waiting"));
            $table->string("signed_version_path")->nullable();
            $table->string("signed_contract_path")->nullable();
            $table->string("signed_promissory_note_path")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
