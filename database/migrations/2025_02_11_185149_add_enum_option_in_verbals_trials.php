<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('verbals_trials', function (Blueprint $table) {
            DB::statement("ALTER TABLE `verbals_trials` MODIFY COLUMN validation_level enum('credit_analyst', 'credit_admin','head_credit','md') default 'credit_analyst' not null;");
        });
    }
	
    /**
	 * Reverse the migrations.
     */
	public function down(): void
    {
		Schema::table('verbals_trials', function (Blueprint $table) {
			DB::statement("ALTER TABLE `verbals_trials` MODIFY COLUMN validation_level enum('credit_admin','head_credit','md') not null;");
        });
    }
};
