<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		DB::statement("ALTER TABLE users MODIFY COLUMN profile ENUM('admin', 'credit_analyst', 'credit_admin', 'head_credit', 'operation', 'legal', 'dex', 'caf', 'ca', 'md', 'courier') NOT NULL");
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		DB::statement("ALTER TABLE users MODIFY COLUMN profile ENUM('admin', 'credit_analyst', 'credit_admin', 'head_credit', 'operation', 'legal', 'dex', 'caf', 'ca', 'md') NOT NULL");
	}
};
