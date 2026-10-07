<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Délégations pendant les absences : le délégataire reçoit, sur la période, les droits et les dossiers du délégant
	 */
	public function up(): void
	{
		Schema::create('delegations', function (Blueprint $table) {
			$table->id();
			$table->foreignId('delegator_id')->constrained('users')->cascadeOnDelete();
			$table->foreignId('delegate_id')->constrained('users')->cascadeOnDelete();
			$table->date('starts_at');
			$table->date('ends_at');
			$table->string('reason')->nullable();
			$table->foreignId('creator_id')->nullable()->constrained('users')->nullOnDelete();
			$table->timestamps();
			$table->index(['delegate_id', 'starts_at', 'ends_at']);
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('delegations');
	}
};
