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
		Schema::table('verbals_trials', function (Blueprint $table) {
			$table->integer('number_deferred')->default(0)->after('has_line_review_bonus');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::table('verbals_trials', function (Blueprint $table) {
			$table->dropColumn('number_deferred');
		});
	}
};
