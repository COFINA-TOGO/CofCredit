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
            $table->foreignId("contract_id")->constrained()->cascadeOnDelete();                                                     //Le contrat du
            $table->string("credit_number");                                                                                        //Le numéro du prêt
            $table->string("sector");                                                                                               //Le secteur
            $table->date("first_deadline");                                                                                         //La date de première échéance
            $table->date("last_deadline");                                                                                          //La date de dernière échéance
            $table->enum("source_of_reimbursement", ["revenue_from_the_activity", "final_payer_settlement", "resale_of_goods"]);    //La source du remboursement
            $table->string("instructions_from_the_risk_and_credit_department");                                                     //Les instructions du département risque et crédit
            $table->string("outstanding_number_ready_to_settle");                                                                   //Le numéro encours prêt à solder
            $table->decimal("other_expenses", 30, 3);                                                                               //Les autres frais
            $table->decimal("teg", 30, 3);                                                                                          //Le TEG
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
