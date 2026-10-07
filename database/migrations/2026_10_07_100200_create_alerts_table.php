<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Alertes affichées dans l'application (la cloche), en plus des e-mails
	 */
	public function up(): void
	{
		Schema::create('alerts', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
			$table->string('title');
			$table->text('body')->nullable();
			$table->string('link')->nullable();
			$table->timestamp('read_at')->nullable();
			$table->timestamps();
			$table->index(['user_id', 'read_at']);
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('alerts');
	}
};
