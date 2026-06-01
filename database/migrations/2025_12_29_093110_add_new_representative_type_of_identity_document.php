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
            $table->enum("representative_type_of_identity_document", ["cni", "passport", "residence_certificate", "driving_licence", "consular_card", "ECOWAS_identity_card", "residence_permit", "anid_card"])->default('cni')->change();
			$table->date("representative_date_of_issue_of_identity_document")->nullable()->change();
        });
        Schema::table('notifications', function (Blueprint $table) {
            $table->enum("representative_type_of_identity_document", ["cni", "passport", "residence_certificate", "driving_licence", "consular_card", "ECOWAS_identity_card", "residence_permit", "anid_card"])->default('cni')->change();
            $table->date("representative_date_of_issue_of_identity_document")->nullable()->change();
        });
        Schema::table('guarantors', function (Blueprint $table) {
            $table->enum("type_of_identity_document", ["cni", "passport", "residence_certificate", "driving_licence", "consular_card", "ECOWAS_identity_card", "residence_permit", "anid_card"])->default('cni')->change();
            $table->date("date_of_issue_of_identity_document")->nullable()->change();
        });
    }
    
    /**
     * Reverse the migrations.
    */
    public function down(): void
    {
        Schema::table('guarantors', function (Blueprint $table) {
            $table->enum("type_of_identity_document", ["cni", "passport", "residence_certificate", "driving_licence", "consular_card", "ECOWAS_identity_card", "residence_permit"])->default('cni')->change();
            $table->date("date_of_issue_of_identity_document")->change();
        });
        Schema::table('notifications', function (Blueprint $table) {
            $table->enum("representative_type_of_identity_document", ["cni", "passport", "residence_certificate", "driving_licence", "consular_card", "ECOWAS_identity_card", "residence_permit"])->default('cni')->change();
            $table->date("representative_date_of_issue_of_identity_document")->change();
        });
        Schema::table('contracts', function (Blueprint $table) {
            $table->enum("representative_type_of_identity_document", ["cni", "passport", "residence_certificate", "driving_licence", "consular_card", "ECOWAS_identity_card", "residence_permit"])->default('cni')->change();
            $table->date("representative_date_of_issue_of_identity_document")->change();
        });
    }
};
