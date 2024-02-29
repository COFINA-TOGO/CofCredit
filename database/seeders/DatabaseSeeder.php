<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Company;
use App\Models\Contract;
use App\Models\Guarantee;
use App\Models\Guarantor;
use App\Models\IndividualBusiness;
use App\Models\TypeOfApplicant;
use App\Models\TypeOfCredit;
use App\Models\TypeOfGuarantee;
use App\Models\User;
use App\Models\VerbalTrial;
use DB;
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
        $credit_analyst = User::factory(1)->create(["profile" => "credit_analyst"])->first();
        $credit_admin = User::factory(1)->create(["profile" => "credit_admin"])->first();
        $head_credit = User::factory(1)->create(["profile" => "head_credit"])->first();
        $operation = User::factory(1)->create(["profile" => "operation"])->first();
        $legal = User::factory(1)->create(["profile" => "legal"])->first();
        $dex = User::factory(1)->create(["profile" => "dex"])->first();
        $caf = User::factory(1)->create(["profile" => "caf"])->first();

        $physical_person = TypeOfApplicant::factory(1)->create(["name" => "Personne Physique"])->first();
        $moral_person = TypeOfApplicant::factory(1)->create(["name" => "Personne Morale"])->first();

        $typeOfCredit = TypeOfCredit::factory(1)->create(["name" => "AVANCE SUR FACTURE", "min_month" => 0, "max_month" => 6, "type_of_applicant_id" => $moral_person->id])->first();
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

        $verbalTrial = VerbalTrial::factory(1)->create(["type_of_credit_id" => $typeOfCredit->id, "creator_id" => $credit_analyst->id])->first();
        Guarantee::factory(5)->create(["verbal_trial_id" => $verbalTrial->id]);
        // $contract = Contract::factory(1)->create(["verbal_trial_id" => $verbalTrial->id, "type" => "individual_business", "creator_id" => $credit_admin->id])->first();
        // IndividualBusiness::factory(1)->create([
        //     "contract_id" => $contract->id,
        //     "denomination" => "ganam style",
        //     "corporate_purpose" => "pme",
        //     "head_office_address" => "Lomé",
        //     "rccm_number" => "R2D2",
        //     "phone_number" => "+228 90 90 90 90"
        // ]);

        $verbalTrial = VerbalTrial::factory(1)->create(["type_of_credit_id" => $typeOfCredit->id, "creator_id" => $credit_analyst->id])->first();
        Guarantee::factory(5)->create(["verbal_trial_id" => $verbalTrial->id]);
        $contract = Contract::factory(1)->create(["verbal_trial_id" => $verbalTrial->id, "type" => "company", "creator_id" => $credit_admin->id])->first();
        Company::factory(1)->create([
            "contract_id" => $contract->id,
            "denomination" => "ganam style",
            "legal_status" => "pme",
            "head_office_address" => "Lomé",
            "rccm_number" => "R2D2",
            "phone_number" => "+228 90 90 90 90"
        ]);

        $verbalTrial = VerbalTrial::factory(1)->create(["type_of_credit_id" => $typeOfCredit->id, "creator_id" => $credit_analyst->id])->first();
        Guarantee::factory(5)->create(["verbal_trial_id" => $verbalTrial->id]);
        $contract = Contract::factory(1)->create(["verbal_trial_id" => $verbalTrial->id, "type" => "particular", "creator_id" => $credit_admin->id])->first();
        Guarantor::factory(1)->create(["contract_id" => $contract->id]);


        // VerbalTrial::factory(40)->create(["type_of_credit_id" => $typeOfCredit->id, "creator_id" => $credit_analyst->id])->each(function ($verbalTrial) {
        //     Guarantee::factory(5)->create(["verbal_trial_id" => $verbalTrial->id]);
        //     Contract::factory(1)->create(["verbal_trial_id" => $verbalTrial->id, "type" => "particular", "creator_id" => $credit_admin->id])->each(function ($contract) {
        //         Guarantor::factory(1)->create(["contract_id" => $contract->id]);
        //     });
        // });

        $plainTextToken = $admin->createToken("auth-token")->plainTextToken;
        $plainTextToken = $admin->createToken("auth-token")->plainTextToken;
        DB::update("update personal_access_tokens set TOKEN = '8fb55a1d50842403ddc4ea7dc0c80a5d2e44eeb029f1077341babd46b68fe0ba' where ID = 1");
        DB::update("update personal_access_tokens set TOKEN = '33fe21b6d2c9a877bdcb43e4e69fa85e0f084d3fe0e55af3a6750ce3bec66ae6' where ID = 2");
        $plainTextToken = "1|c96jDUWBogbtZRsU6Oo9ZbzL3ZB5ry2spd3PC5RHd9464644";
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
