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
            $table->decimal('security_deposit_percentage', 5, 2)->default(20)->after('guarantees_total_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('c_a_t_s', function (Blueprint $table) {
            $table->dropColumn('security_deposit_percentage');
        });
    }
};
