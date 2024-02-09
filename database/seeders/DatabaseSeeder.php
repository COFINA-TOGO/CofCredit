<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\TypeOfApplicant;
use App\Models\TypeOfCredit;
use App\Models\TypeOfGuarantee;
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

        $physical_person = TypeOfApplicant::factory(1)->create(["name" => "Personne Physique"])->first();
        $moral_person = TypeOfApplicant::factory(1)->create(["name" => "Personne Morale"])->first();

        TypeOfCredit::factory(1)->create(["name" => "AVANCE SUR FACTURE", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AVANCE SUR FACTURE ", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AVANCE SUR LOYER", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AVANCE MARCHE/BC", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AVANCE MARCHE/BC_SOLO ", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "AV SALAIRE/PENSION ", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE CAMPAGNE", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE CAMPAGNE", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT EXPLOITATION", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT EXPLOITATION", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE GROUPE", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "ESCOMPTE DE CHEQUE", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "ESCOMPTE DE TRAITE", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "ESCOMPTE DE TRAITE_SOLO", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT FDR ", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT FDR ", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE IMMOBILIER", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT EXPLOITATION", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT DE GROUPE", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "min_month" => 24, "max_month" => 36, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "min_month" => 24, "max_month" => 36, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT FDR ", "min_month" => 12, "max_month" => 24, "type_of_applicant_id" => $moral_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT IMMOBILIER", "min_month" => 24, "max_month" => 36, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT D'INVESTISSEMENT", "min_month" => 36, "max_month" => 120, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  CONSO", "min_month" => 36, "max_month" => 120, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  BFR", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $physical_person->id]);
        TypeOfCredit::factory(1)->create(["name" => "CREDIT  BFR", "min_month" => 6, "max_month" => 12, "type_of_applicant_id" => $physical_person->id]);

        TypeOfGuarantee::factory(1)->create(["name" => "Dépôt de garantie"]);
        TypeOfGuarantee::factory(1)->create(["name" => "Caution personnelle et solidaire"]);
        TypeOfGuarantee::factory(1)->create(["name" => "Gage de véhicule"]);
        TypeOfGuarantee::factory(1)->create(["name" => "Gage d'équipement"]);
        TypeOfGuarantee::factory(1)->create(["name" => "Billet à ordre"]);
        TypeOfGuarantee::factory(1)->create(["name" => "Engagement de domiciliation de paiement"]);
        TypeOfGuarantee::factory(1)->create(["name" => "Constitution de PEP"]);
        TypeOfGuarantee::factory(1)->create(["name" => "Constitution de dépôt hebdomadaire"]);
        TypeOfGuarantee::factory(1)->create(["name" => "Hypothèque"]);
        TypeOfGuarantee::factory(1)->create(["name" => "Nantissement de Dépôt à terme (DAT)"]);

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
