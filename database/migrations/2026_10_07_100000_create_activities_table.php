<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Historique des décisions d'un dossier (création, validation, rejet, renvoi, documents signés...)
	 */
	public function up(): void
	{
		Schema::create('activities', function (Blueprint $table) {
			$table->id();
			$table->string('subject_type');
			$table->unsignedBigInteger('subject_id');
			$table->string('action');
			$table->text('comment')->nullable();
			$table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
			// Renseigné quand l'auteur agissait en intérim (délégation reçue)
			$table->foreignId('on_behalf_of_id')->nullable()->constrained('users')->nullOnDelete();
			$table->timestamp('created_at')->nullable();
			$table->index(['subject_type', 'subject_id']);
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('activities');
	}
};
