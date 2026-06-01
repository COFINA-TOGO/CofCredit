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
			$table->decimal('guarantees_total_amount', 30, 3)->change();
        });
    }
	
    /**
	 * Reverse the migrations.
     */
	public function down(): void
    {
		Schema::table('c_a_t_s', function (Blueprint $table) {
			$table->decimal('guarantees_total_amount')->change();
        });
    }
};
