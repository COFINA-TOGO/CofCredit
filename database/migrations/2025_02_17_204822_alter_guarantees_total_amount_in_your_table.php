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
        // Modification de colonne propre à MySQL ; ignorée sur SQLite (base des tests)
        if (DB::getDriverName() !== 'mysql') {
        	return;
        }
        Schema::table('c_a_t_s', function (Blueprint $table) {
			$table->decimal('guarantees_total_amount', 30, 3)->change();
        });
    }
	
    /**
	 * Reverse the migrations.
     */
	public function down(): void
    {
		// Modification de colonne propre à MySQL ; ignorée sur SQLite (base des tests)
		if (DB::getDriverName() !== 'mysql') {
			return;
		}
		Schema::table('c_a_t_s', function (Blueprint $table) {
			$table->decimal('guarantees_total_amount')->change();
        });
    }
};
