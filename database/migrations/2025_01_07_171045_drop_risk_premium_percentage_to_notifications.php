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
		Schema::table('notifications', function (Blueprint $table) {
			$table->dropColumn('risk_premium_percentage');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::table('notifications', function (Blueprint $table) {
			$table->float('risk_premium_percentage')->after('due_amount')->default(0.5);
		});
	}
};
