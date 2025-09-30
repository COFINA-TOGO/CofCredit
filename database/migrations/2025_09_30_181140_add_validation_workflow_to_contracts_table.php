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
            // Modifier l'enum status pour inclure les nouveaux statuts
            $table->enum('status', [
                'waiting', 
                'pending_admin_validation', 
                'pending_head_validation', 
                'rejected', 
                'validated'
            ])->default('waiting')->change();
            
            // Ajouter des colonnes pour tracer les validations
            $table->timestamp('admin_validated_at')->nullable()->after('status_observation');
            $table->foreignId('admin_validator_id')->nullable()->constrained('users')->after('admin_validated_at');
            $table->timestamp('head_validated_at')->nullable()->after('admin_validator_id');
            $table->foreignId('head_validator_id')->nullable()->constrained('users')->after('head_validated_at');
            $table->text('admin_validation_comment')->nullable()->after('head_validator_id');
            $table->text('head_validation_comment')->nullable()->after('admin_validation_comment');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contracts', function (Blueprint $table) {
            // Restaurer l'enum original
            $table->enum('status', ['waiting', 'rejected', 'validated'])->default('waiting')->change();
            
            // Supprimer les nouvelles colonnes
            $table->dropForeign(['admin_validator_id']);
            $table->dropForeign(['head_validator_id']);
            $table->dropColumn([
                'admin_validated_at',
                'admin_validator_id', 
                'head_validated_at',
                'head_validator_id',
                'admin_validation_comment',
                'head_validation_comment'
            ]);
        });
    }
};