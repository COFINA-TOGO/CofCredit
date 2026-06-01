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
		Schema::table('contracts', function (Blueprint $table) {
			$table->decimal('deferred_amount', 21, 2)->after('due_amount');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::table('contracts', function (Blueprint $table) {
			$table->dropColumn('deferred_amount');
		});
	}
};
