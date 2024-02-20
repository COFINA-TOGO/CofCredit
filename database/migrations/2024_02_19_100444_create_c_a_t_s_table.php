<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('c_a_t_s', function (Blueprint $table) {
            $table->id();
            $table->string("credit_number");            //Le numéro du prêt
            $table->string("sector_code");              //Le code secteur
            $table->string("case_manager_code");        //Le code Chargé d'affaire
            $table->date("first_deadline");             //La date de première échéance
            $table->date("last_deadline");              //La date de dernière échéance
            $table->string("credit_risk_rating");       //La note du risque Crédit ??
            $table->string("source_of_reimbursement");  //La source du remboursement
            $table->string("past_repayments");          //Les payements passé
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('c_a_t_s');
    }
};

"

pour des questions de sécurité, les retraits E-coficash sont limité au total de 500 000 par opération avec un minimum de 5000

Prière de nous apporter le support nécessaire pour apporter les dites modifications.

";
