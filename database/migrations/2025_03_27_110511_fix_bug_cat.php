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
		Schema::table('c_a_t_s', function (Blueprint $table) {
			$table->text('instructions_from_the_risk_and_credit_department')->change();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::table('c_a_t_s', function (Blueprint $table) {
			$table->string('instructions_from_the_risk_and_credit_department')->change();
		});
	}
};
