<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\TypeOfApplicant;
use App\Models\TypeOfCredit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Dotenv;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::factory(1)->create(["full_name" => "admin", "name" => "admin", "email" => "charles.gamligo@cofinacorp.com", "profile" => "admin", "activated" => true, "password_change_required" => false, "password" => "Coftg2021"])->first();
        User::factory(1)->create(["profile" => "credit_admin"]);
        User::factory(1)->create(["profile" => "head_credit"]);
        User::factory(1)->create(["profile" => "operation"]);
        User::factory(1)->create(["profile" => "legal"]);
        User::factory(1)->create(["profile" => "dex"]);

        $physical_person = TypeOfApplicant::factory(1)->create(["name" => "Personne Physique", "slug" => "physical-person"])->first();
        TypeOfCredit::factory(1)->create(["name" => "AVANCE SUR FACTURE", "slug" => "avance-sur-facture-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AVANCE SUR FACTURE ", "slug" => "avance-sur-facture-6-12", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AVANCE SUR LOYER", "slug" => "avance-sur-loyer-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AVANCE MARCHE/BC", "slug" => "avance-marche-ou-bc-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AVANCE MARCHE/BC_SOLO ", "slug" => "avance-marche-ou-bc-solo-6-12", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AV SALAIRE/PENSION ", "slug" => "av-salaire-ou-pension-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE CAMPAGNE", "slug" => "credit-de-campagne-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE CAMPAGNE", "slug" => "credit-de-campagne-6-12", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT EXPLOITATION", "slug" => "credit-exploitation-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT EXPLOITATION", "slug" => "credit-exploitation-6-12", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE GROUPE", "slug" => "credit-de-groupe-6-12", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "slug" => "credit-dinvestissement-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "slug" => "credit-dinvestissement-6-12", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "slug" => "credit-conso-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "slug" => "credit-conso-6-12", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "ESCOMPTE DE CHEQUE", "slug" => "escompte-de-cheque-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "ESCOMPTE DE TRAITE", "slug" => "escompte-de-traite-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "ESCOMPTE DE TRAITE_SOLO", "slug" => "escompte-de-traite-solo-6-12", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT FDR ", "slug" => "credit-fdr-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT FDR ", "slug" => "credit-fdr-6-12", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE IMMOBILIER", "slug" => "credit-de-immobilier-0-6", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);

        TypeOfCredit::factory(1)->create(["name" => "CREDIT EXPLOITATION", "slug" => "credit-exploitation-12-24", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE GROUPE", "slug" => "credit-de-groupe-12-24", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "slug" => "credit-dinvestissement-12-24", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "slug" => "credit-dinvestissement-24-36", "min_month" => 24, "max_month" => 36, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "slug" => "credit-conso-12-24", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "slug" => "credit-conso-24-36", "min_month" => 24, "max_month" => 36, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT FDR ", "slug" => "credit-fdr-12-24", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT IMMOBILIER", "slug" => "credit-immobilier-24-36", "min_month" => 24, "max_month" => 36, "type_of_applicant_id" => $physical_person->id]);

        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "slug" => "credit-dinvestissement-36-120", "min_month" => 36, "max_month" => 120, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "slug" => "credit-conso-36-12", "min_month" => 36, "max_month" => 120, "type_of_applicant_id" => $physical_person->id]);

        TypeOfApplicant::factory(1)->create(["name" => "Personne Morale", "slug" => "corporation"]);

        $plainTextToken = $admin->createToken("auth-token")->plainTextToken;

        $file = public_path('../.env');
        $lines = file($file);

        if (count($lines) >= 1) {
            $lines[count($lines) - 1] = "SCRIBE_AUTH_KEY=$plainTextToken\n";

            // Réécrire le contenu modifié dans le fichier
            file_put_contents($file, implode('', $lines));
        } else {
            // Gérer le cas où le fichier n'a pas assez de lignes
            echo "Le fichier ne contient pas suffisamment de lignes pour effectuer le remplacement.";
        }

        echo "admin Token: " . $plainTextToken . "\n";
    }
}
