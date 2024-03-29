<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CAT;
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
        $admin = User::factory(1)->create(["full_name" => "Charles GAMLIGO DD", "name" => "charles.gamligo", "email" => "charles.gamligo@cofinacorp.com", "profile" => "admin", "activated" => true, "password_change_required" => false, "password" => "Coftg2021"])->first();
        $credit_analyst = User::factory(1)->create(["full_name" => "admin", "profile" => "admin", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "admin@cofinacorp.com"])->first();
        $credit_analyst = User::factory(1)->create(["full_name" => "credit_analyst", "profile" => "credit_analyst", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "credit_analyst@cofinacorp.com"])->first();
        $credit_admin = User::factory(1)->create(["full_name" => "credit_admin", "profile" => "credit_admin", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "credit_admin@cofinacorp.com"])->first();
        $credit_admin2 = User::factory(1)->create(["full_name" => "credit_admin2", "profile" => "credit_admin", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "credit_admin2@cofinacorp.com"])->first();
        $head_credit = User::factory(1)->create(["full_name" => "head_credit", "profile" => "head_credit", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "head_credit@cofinacorp.com"])->first();
        $operation = User::factory(1)->create(["full_name" => "operation", "profile" => "operation", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "operation@cofinacorp.com"])->first();
        $legal = User::factory(1)->create(["full_name" => "legal", "profile" => "legal", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "legal@cofinacorp.com"])->first();
        $dex = User::factory(1)->create(["full_name" => "dex", "profile" => "dex", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "dex@cofinacorp.com"])->first();
        $caf = User::factory(1)->create(["full_name" => "caf", "profile" => "caf", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "caf@cofinacorp.com"])->first();
        $caf2 = User::factory(1)->create(["full_name" => "caf2", "profile" => "caf", "password" => "Coftg2021", "password_change_required" => false, "activated" => true, "email" => "caf2@cofinacorp.com"])->first();

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

        foreach (["Dépôt de garantie", "Caution personnelle et solidaire", "Gage de véhicule", "Gage d'équipement", "Billet à ordre", "Engagement de domiciliation de paiement", "Constitution de PEP", "Constitution de dépôt hebdomadaire", "Hypothèque", "Nantissement de Dépôt à terme (DAT)"] as $typeOfGuaranteeName) {
            TypeOfGuarantee::factory(1)->create(["name" => $typeOfGuaranteeName]);
        }

        VerbalTrial::factory(5)->create(["creator_id" => $credit_analyst->id])->each(function ($verbalTrial) use ($credit_admin) {
            Guarantee::factory(5)->create(["verbal_trial_id" => $verbalTrial->id]);
            Contract::factory(1)->create(["verbal_trial_id" => $verbalTrial->id, "type" => "individual_business", "creator_id" => $credit_admin->id])->each(function ($contract) {
                Guarantor::factory(3)->create(["contract_id" => $contract->id]);
                IndividualBusiness::factory(1)->create(["contract_id" => $contract->id]);
            });
        });

        VerbalTrial::factory(5)->create(["creator_id" => $credit_analyst->id])->each(function ($verbalTrial) use ($credit_admin) {
            Guarantee::factory(5)->create(["verbal_trial_id" => $verbalTrial->id]);
            Contract::factory(1)->create(["verbal_trial_id" => $verbalTrial->id, "type" => "company", "creator_id" => $credit_admin->id])->each(function ($contract) {
                Guarantor::factory(3)->create(["contract_id" => $contract->id]);
                Company::factory(1)->create(["contract_id" => $contract->id]);
            });
        });

        VerbalTrial::factory(5)->create(["creator_id" => $credit_analyst->id])->each(function ($verbalTrial) use ($credit_admin) {
            Guarantee::factory(5)->create(["verbal_trial_id" => $verbalTrial->id]);
            Contract::factory(1)->create(["verbal_trial_id" => $verbalTrial->id, "type" => "particular", "creator_id" => $credit_admin->id])->each(function ($contract) {
                Guarantor::factory(3)->create(["contract_id" => $contract->id]);
            });
        });

        VerbalTrial::factory(5)->create(["creator_id" => $credit_analyst->id])->each(function ($verbalTrial) use ($credit_admin) {
            Guarantee::factory(5)->create(["verbal_trial_id" => $verbalTrial->id]);
            Contract::factory(1)->create(["verbal_trial_id" => $verbalTrial->id, "type" => "particular", "creator_id" => $credit_admin->id])->each(function ($contract) {
                Guarantor::factory(3)->create(["contract_id" => $contract->id]);
                CAT::factory(1)->create(["contract_id" => $contract->id]);
            });
        });


        VerbalTrial::factory(15)->create(["creator_id" => $credit_analyst->id])->each(function ($verbalTrial) {
            Guarantee::factory(5)->create(["verbal_trial_id" => $verbalTrial->id]);
            // Contract::factory(1)->create(["verbal_trial_id" => $verbalTrial->id, "type" => "particular", "creator_id" => $credit_admin->id])->each(function ($contract) {
            //     Guarantor::factory(1)->create(["contract_id" => $contract->id]);
            // });
        });

        $plainTextToken = $admin->createToken("auth-token")->plainTextToken;
        DB::update("update personal_access_tokens set TOKEN = '8fb55a1d50842403ddc4ea7dc0c80a5d2e44eeb029f1077341babd46b68fe0ba' where ID = 1");
        $plainTextToken = $admin->createToken("auth-token")->plainTextToken;
        DB::update("update personal_access_tokens set TOKEN = '96b91ec21dfc7acd2bb8489528e67dbabaf8d6da488267f72069ebb0f09658d6' where ID = 2");
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
