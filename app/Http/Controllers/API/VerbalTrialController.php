<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\CustomResponseTrait;
use App\Models\Guarantee;
use App\Models\VerbalTrial;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;


/**
 * @group Procès Verbal
 *
 * EndPoints pour gérer les Procès verbaux
 */
class VerbalTrialController extends Controller
{

    use CustomResponseTrait;

    /**
     * Affiche les Procès verbaux
     *
     * @queryParam  committee_id                        string  Filtrer par ID du procès verbal                                 No-example
     * @queryParam  committee_date                      string  Filtrer par date du procès verbal                               No-example
     * @queryParam  civility                            string  Filtrer par civilité                                            No-example
     * @queryParam  applicant_first_name                string  Filtrer par prénom du demandeur                                 No-example
     * @queryParam  applicant_last_name                 string  Filtrer par nom du demandeur                                    No-example
     * @queryParam  account_number                      string  Filtrer par numéro de compte                                    No-example
     * @queryParam  activity                            string  Filtrer par activé                                              No-example
     * @queryParam  purpose_of_financing                string  Filtrer par objet du financement                                No-example
     * @queryParam  type_of_credit_id                   int     Filtrer par ID du type de credit                                No-example
     * @queryParam  amount                              float   Filtrer par montant                                             No-example
     * @queryParam  duration                            int     Filtrer par durée en mois                                       No-example
     * @queryParam  periodicity                         string  Filtrer par periodicité                                         No-example
     * @queryParam  taf                                 float   Filtrer par TAF                                                 No-example
     * @queryParam  due_amount                          float   Filtrer par montant d'une échéance                              No-example
     * @queryParam  administrative_fees_percentage      float   Filtrer par frais de dossier(pourcentage)                       No-example
     * @queryParam  insurance_premium                   float   Filtrer par prime d'assurance                                   No-example
     *
     * @queryParam  with_type_of_credit                 int     Afficher le type de crédit.                                     Example: 0
     * @queryParam  with_type_of_applicant              int     Afficher le type de demandeur du type de crédit.                Example: 1
     * @queryParam  with_guarantees                     int     Afficher les garanties.                                         Example: 1
     * @queryParam  with_contract                       int     Afficher le contrat.                                            Example: 1
     * @queryParam  paginate                            int     Utiliser la pagination.                                         Example: 0
     *
     * @response 200
     */
    public function index(Request $request)
    {
        if (($authorisation = Gate::inspect('viewAny', VerbalTrial::class))->allowed()) {
            $verbalTrialList = VerbalTrial::query();
            if ($search = $request->search) {
                $verbalTrialList
                    ->orWhere('committee_id', 'LIKE', "%$search%")
                    ->orWhere('committee_date', 'LIKE', "%$search%")
                    ->orWhere('civility', 'LIKE', "%$search%")
                    ->orWhere('applicant_first_name', 'LIKE', "%$search%")
                    ->orWhere('applicant_last_name', 'LIKE', "%$search%")
                    ->orWhere('account_number', 'LIKE', "%$search%")
                    ->orWhere('activity', 'LIKE', "%$search%")
                    ->orWhere('purpose_of_financing', 'LIKE', "%$search%")
                    ->orWhere('type_of_credit_id', 'LIKE', "%$search%")
                    ->orWhere('amount', 'LIKE', "%$search%")
                    ->orWhere('duration', 'LIKE', "%$search%")
                    ->orWhere('periodicity', 'LIKE', "%$search%")
                    ->orWhere('taf', 'LIKE', "%$search%")
                    ->orWhere('due_amount', 'LIKE', "%$search%")
                    ->orWhere('administrative_fees_percentage', 'LIKE', "%$search%")
                    ->orWhere('insurance_premium', 'LIKE', "%$search%")
                ;
            }

            foreach (["committee_id", "committee_date", "civility", "applicant_first_name", "applicant_last_name", "account_number", "activity", "purpose_of_financing", "type_of_credit_id", "amount", "duration", "periodicity", "taf", "due_amount", "administrative_fees_percentage", "insurance_premium"] as $filter) {
                if (isset($request[$filter]) && $request[$filter]) {
                    $verbalTrialList->where($filter, $request[$filter]);
                }
            }

            foreach (["with_type_of_credit" => "type_of_credit", "with_type_of_applicant" => "type_of_credit.type_of_applicant", "with_guarantees" => "guarantees", "with_contract" => "contract"] as $key => $value) {
                if (isset($request[$key]) && $request[$key]) {
                    $verbalTrialList->with($value);
                }
            }

            if (isset($request["paginate"]) && ($request->paginate == false)) {
                $verbalTrialList = $verbalTrialList->orderByDesc('updated_at')->get();
                $data = ["data" => $verbalTrialList, "total" => count($verbalTrialList)];
            } else {
                $data = $verbalTrialList->orderByDesc('updated_at')->paginate(8)->toArray();
            }

            return $this->responseOkPaginate($data);
        } else {
            return $this->responseError(["auth" => [$authorisation->message()]], 403);
        }
    }

    /**
     * Affiche un procès verbal
     *
     * @urlParam    id                          int required    L'ID du procès verbal.                              Example: 1
     *
     * @queryParam  with_type_of_credit         int             Afficher le type de crédit.                         Example: 0
     * @queryParam  with_type_of_applicant      int             Afficher le type de demandeur du type de crédit.    Example: 1
     * @queryParam  with_guarantees             int             Afficher les garanties.                             Example: 1
     * @queryParam  with_contract               int             Afficher le contrat.                                Example: 1
     *
     * @response 200
     */
    public function show(Request $request, int $id)
    {
        $verbalTrial = VerbalTrial::find($id);
        if ($verbalTrial) {
            if (($authorisation = Gate::inspect('view', $verbalTrial))->allowed()) {
                $suplementList = [];
                foreach (["with_type_of_credit" => "type_of_credit", "with_type_of_applicant" => "type_of_credit.type_of_applicant", "with_guarantees" => "guarantees", "with_contract" => "contract"] as $key => $value) {
                    if (isset($request[$key]) && $request[$key]) {
                        $suplementList[] = $value;
                    }
                }
                $verbalTrial->load($suplementList);
                return $this->responseOk(["verbalTrial" => $verbalTrial]);
            } else {
                return $this->responseError(["auth" => [$authorisation->message()]], 403);
            }
        } else {
            return $this->responseError(["id" => "Le procès verbal n'existe pas"], 404);
        }
    }

    /**
     * Créer un nouveau procès verbal
     *
     * @bodyParam  committee_id                         string  L'ID comitée venant de créditFlow                       Example: CFNTG-044-13-12-23-01212
     * @bodyParam  committee_date                       string  La date du comitée                                      Example: 2024-02-09
     * @bodyParam  civility                             string  La Civilité                                             Example: Mr
     * @bodyParam  applicant_first_name                 string  Le prénnom du demandeur                                 Example: Cesar
     * @bodyParam  applicant_last_name                  string  Le nom du demandeur                                     Example: Endure
     * @bodyParam  account_number                       string  Le numéro de compte                                     Example: 012345678901
     * @bodyParam  activity                             string  L'activé                                                Example: Homme d'affaire
     * @bodyParam  purpose_of_financing                 string  L'objet du financement                                  Example: Achat nouveau locaux
     * @bodyParam  type_of_credit_id                    int     L'ID du type de credit                                  Example: 1
     * @bodyParam  amount                               float   Le montant                                              Example: 10000000
     * @bodyParam  duration                             int     La durée en mois                                        Example: 12
     * @bodyParam  periodicity                          string  La periodicité                                          Example: mensual
     * @bodyParam  taf                                  float   La TAF                                                  Example: 1
     * @bodyParam  due_amount                           float   Le montant d'une échéance                               Example: 500000
     * @bodyParam  administrative_fees_percentage       float   Les frais de dossier(pourcentage)                       Example: 45000
     * @bodyParam  insurance_premium                    float   La prime d'assurance                                    Example: 45000
     *
     * @response 200
     */
    public function store(Request $request)
    {
        if (($authorisation = Gate::inspect('create', VerbalTrial::class))->allowed()) {
            $requestData = $request->all();
            $validator = Validator::make($requestData, [
                "committee_id" => "required|unique:verbals_trials",
                "committee_date" => "required|date",
                'civility' => 'required|in:Mr,Mme,Mlle',
                'applicant_first_name' => 'required|min:2',
                'applicant_last_name' => 'required|min:2',
                'account_number' => 'required|min:12',
                'activity' => 'required|min:2',
                'purpose_of_financing' => 'required|min:2',
                'type_of_credit_id' => 'required|exists:types_of_credit,id',
                'amount' => 'required|numeric',
                'duration' => 'required|numeric',
                'periodicity' => 'required|in:mensual,quarterly,semi-annual,annual,in-fine',
                'taf' => 'required|numeric',
                'due_amount' => 'required|numeric',
                'administrative_fees_percentage' => 'required|numeric',
                'insurance_premium' => 'required|numeric',
                "guarantees" => "array",
                "guarantees.*.type_of_guarantee_id" => "required|exists:types_of_guarantee,id",
                "guarantees.*.value" => "required|numeric",
                "guarantees.*.expiration_date" => "required|date",
                "guarantees.*.comment" => "required|min:2",
            ]);
            if ($validator->fails()) {
                return $this->responseError($validator->errors(), 400);
            } else {
                DB::beginTransaction();
                try {
                    $verbalTrial = VerbalTrial::create($requestData);
                    if (isset($requestData["guarantees"])) {
                        foreach ($requestData["guarantees"] as $guarantee) {
                            Guarantee::create([
                                "verbal_trial_id" => $verbalTrial->id,
                                "type_of_guarantee_id" => $guarantee["type_of_guarantee_id"],
                                "expiration_date" => $guarantee["expiration_date"],
                                "value" => $guarantee["value"],
                                "comment" => $guarantee["comment"]
                            ]);
                        }
                    }
                } catch (\Exception $e) {
                    DB::rollback();
                    throw $e;
                }
                DB::commit(); // Valider les opérations
                $verbalTrial->load(["type_of_credit.type_of_applicant", "guarantees"]);
                return $this->responseOk([
                    "verbalTrial" => $verbalTrial
                ], status: 201);
            }
        } else {
            return $this->responseError(["auth" => [$authorisation->message()]], 403);
        }
    }

    /**
     * Mettre à jour un procès verbal
     *
     * @urlParam id required L'ID du procès verbal. Example: 1
     *
     * @bodyParam  committee_id                         string  L'ID comitée venant de créditFlow                       Example: CFNTG-044-13-12-23-01212
     * @bodyParam  committee_date                       string  La date du comitée                                      Example: 2024-02-09
     * @bodyParam  civility                             string  La Civilité                                             Example: Mme
     * @bodyParam  applicant_first_name                 string  Le prénnom du demandeur                                 Example: Cesar
     * @bodyParam  applicant_last_name                  string  Le nom du demandeur                                     Example: Endure
     * @bodyParam  account_number                       string  Le numéro de compte                                     Example: 012345678901
     * @bodyParam  activity                             string  L'activé                                                Example: Femme d'affaire
     * @bodyParam  purpose_of_financing                 string  L'objet du financement                                  Example: Achat nouveau locaux
     * @bodyParam  type_of_credit_id                    int     L'ID du type de credit                                  Example: 3
     * @bodyParam  amount                               float   Le montant                                              Example: 0
     * @bodyParam  duration                             int     La durée en mois                                        Example: 12
     * @bodyParam  periodicity                          string  La periodicité                                          Example: quarterly
     * @bodyParam  taf                                  float   La TAF                                                  Example: 1
     * @bodyParam  due_amount                           float   Le montant d'une échéance                               Example: 500000
     * @bodyParam  administrative_fees_percentage       float   Les frais de dossier(pourcentage)                       Example: 45000
     * @bodyParam  insurance_premium                    float   La prime d'assurance                                    Example: 45000
     *
     * @response 200
     *
     */
    public function update(Request $request, int $id)
    {
        $verbalTrial = VerbalTrial::find($id);
        if ($verbalTrial) {
            if (($authorisation = Gate::inspect('update', $verbalTrial))->allowed()) {
                $requestData = $request->all();
                $validator = Validator::make($requestData, [
                    "committee_id" => "required|unique:verbals_trials,committee_id," . $id,
                    "committee_date" => "required|date",
                    'civility' => 'required|in:Mr,Mme,Mlle',
                    'applicant_first_name' => 'required|min:2',
                    'applicant_last_name' => 'required|min:2',
                    'account_number' => 'required|min:12',
                    'activity' => 'required|min:2',
                    'purpose_of_financing' => 'required|min:2',
                    'type_of_credit_id' => 'required|exists:types_of_credit,id',
                    'amount' => 'required|numeric',
                    'duration' => 'required|numeric',
                    'periodicity' => 'required|in:mensual,quarterly,semi-annual,annual,in-fine',
                    'taf' => 'required|numeric',
                    'due_amount' => 'required|numeric',
                    'administrative_fees_percentage' => 'required|numeric',
                    'insurance_premium' => 'required|numeric',
                    "guarantees" => "array",
                    "guarantees.*.value" => "required|numeric",
                    "guarantees.*.expiration_date" => "required|date",
                    "guarantees.*.type_of_guarantee_id" => "required|exists:types_of_guarantee,id"
                ]);
                if ($validator->fails()) {
                    return $this->responseError($validator->errors(), 400);
                } else {
                    DB::beginTransaction();
                    try {
                        $verbalTrial->update($requestData);
                        $verbalTrial->guarantees()->delete();
                        if (isset($requestData["guarantees"])) {
                            foreach ($requestData["guarantees"] as $guarantee) {
                                Guarantee::create([
                                    "verbal_trial_id" => $verbalTrial->id,
                                    "type_of_guarantee_id" => $guarantee["type_of_guarantee_id"],
                                    "expiration_date" => $guarantee["expiration_date"],
                                    "value" => $guarantee["value"],
                                    "comment" => $guarantee["comment"]
                                ]);
                            }
                        }
                    } catch (\Exception $e) {
                        DB::rollback();
                        throw $e;
                    }
                    DB::commit(); // Valider les opérations
                    $verbalTrial->load(["type_of_credit.type_of_applicant", "guarantees", "contract"]);
                    return $this->responseOk([
                        "verbalTrial" => $verbalTrial
                    ]);
                }
            } else {
                return $this->responseError(["auth" => [$authorisation->message()]], 403);
            }
        } else {
            return $this->responseError(["id" => "Le procès verbal n'existe pas"], 404);
        }
    }

    /**
     * Supprime un procès verbal
     *
     * @urlParam id int required L'ID du procès verbal
     *
     * @response 204
     */
    public function destroy(int $id)
    {
        $verbalTrial = VerbalTrial::find($id);
        if ($verbalTrial) {
            if (($authorisation = Gate::inspect('delete', $verbalTrial))->allowed()) {
                if ($verbalTrial->delete()) {
                    return $this->responseOk(messages: ["verbalTrial" => "Procès verbal supprimé"], status: 204);
                } else {
                    return $this->responseError(["server" => "Erreur du serveur"], 500);
                }
            } else {
                return $this->responseError(["auth" => [$authorisation->message()]], 403);
            }
        } else {
            return $this->responseError(["id" => ["Le procès verbal n'existe pas"]], 404);
        }

    }
}
