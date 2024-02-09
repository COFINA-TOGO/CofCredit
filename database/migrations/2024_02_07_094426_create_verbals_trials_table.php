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
        Schema::create('verbals_trials', function (Blueprint $table) {
            $table->id();
            $table->string("committee_id")->unique();
            $table->date("committee_date");
            $table->enum("civility", ["mr", "mme", "mlle"]);
            $table->string("applicant_name");
            $table->string("account_number");
            $table->string("activity");
            $table->string("purpose_of_financing");
            $table->foreignId('type_of_credit_id')->constrained(table: 'types_of_credit', column: 'id')->cascadeOnDelete();
            $table->bigInteger('amount');
            $table->integer('duration');
            $table->enum('periodicity', ['mensual', 'quarterly', "semi-annual", "annual", 'in-fine']);
            $table->decimal('taf');
            $table->decimal('due_amount');
            $table->float('administrative_fees_percentage');
            $table->decimal('insurance_premium');
            $table->float('line_review_bonus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verbals_trials');
    }
};
