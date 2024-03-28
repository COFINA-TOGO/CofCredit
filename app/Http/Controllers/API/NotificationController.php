<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\CustomResponseTrait;
use App\Jobs\SendEmail;
use App\Models\Company;
use App\Models\Notification;
use App\Models\IndividualBusiness;
use App\Models\Pledge;
use Carbon\Carbon;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpWord\TemplateProcessor;
use Rmunate\Utilities\SpellNumber;

class NotificationController extends Controller
{

    use CustomResponseTrait;

    /**
     * Affiche les notification
     *
     * @queryParam  verbal_trial_id                                         int                 Filtrer par ID du PV.                                                   No-example
     * @queryParam  phone_number                                            string              Filtrer par Numéro de téléphone du demandeur.                           No-example
     * @queryParam  has_signed_version                                      int                 Filtrer par présence de version signé de la notification.               Example: 0
     * @queryParam  has_signed_contract                                 int                 Filtrer par présence de version signé du contrat.                       Example: 0
     * @queryParam  has_upload_completed                                    int                 Filtrer par finalisation du dossier du contrat.                         Example: 0
     * @queryParam  has_cat                                                 int                 Filtrer par présence de cat.                                            Example: 0
     *
     * @queryParam  with_verbal_trial                                       int                 Afficher le PV.                                                         Example: 0
     * @queryParam  with_type_of_credit                                     int                 Afficher le type de crédit.                                             Example: 0
     * @queryParam  with_type_of_applicant                                  int                 Afficher le type de demandeur.                                          Example: 0
     * @queryParam  with_caf                                                int                 Afficher le caf en charge du dossier.                                   Example: 0
     * @queryParam  with_guarantees                                         int                 Afficher les garanties.                                                 Example: 0
     * @queryParam  with_type_of_guarantees                                 int                 Afficher les types des garanties.                                       Example: 0
     * @queryParam  with_creator                                            int                 Afficher le créateur du contrat.                                        Example: 0
     * @queryParam  paginate                                                int                 Utiliser la pagination.                                                 Example: 0
     *
     * @response 200
     */
    public function index(Request $request)
    {
        if (($authorisation = Gate::inspect('viewAny', Notification::class))->allowed()) {
            $notificationList = Notification::query();
            if ($search = $request->search) {
                $notificationList
                    ->where('phone_number', 'LIKE', "%$search%")
                ;
            }

            if (isset($request["has_cat"])) {
                $has_cat = (int) $request["has_cat"];
                if ($has_cat == 1) {
                    $notificationList->whereHas('c_a_t');
                } else if ($has_cat == 0) {
                    $notificationList->whereDoesntHave('c_a_t');
                }
            }

            foreach (["verbal_trial_id", "phone_number"] as $filter) {
                if (isset($request[$filter]) && $request[$filter]) {
                    $notificationList->where($filter, $request[$filter]);
                }
            }


            foreach (["with_verbal_trial" => "verbal_trial", "with_type_of_credit" => "verbal_trial.type_of_credit", "with_type_of_applicant" => "verbal_trial.type_of_credit.type_of_applicant", "with_guarantees" => "verbal_trial.guarantees", "with_caf" => "verbal_trial.caf", "with_type_of_guarantees" => "verbal_trial.guarantees.type_of_guarantee", "with_creator" => "creator", "with_pledges" => "pledges"] as $key => $value) {
                if (isset($request[$key]) && $request[$key]) {
                    $notificationList->with($value);
                }
            }

            if (($currentUser = $request->user())->profile == "caf") {
                $notificationList->whereHas('verbal_trial', function ($query) use ($currentUser) {
                    $query->where('caf_id', $currentUser->id);
                });
            }

            if (isset($request["has_signed_version"])) {
                if ($request["has_signed_version"]) {
                    $notificationList->whereNotNull('signed_version_path');
                } else {
                    $notificationList->whereNull('signed_version_path');
                }
            }

            if (isset($request["has_signed_contract"])) {
                if ($request["has_signed_contract"]) {
                    $notificationList->whereNotNull('signed_contract_path');
                } else {
                    $notificationList->whereNull('signed_contract_path');
                }
            }

            if (isset($request["has_upload_completed"])) {
                if ($request["has_upload_completed"]) {
                    $notificationList->whereNotNull('signed_version_path')->whereNotNull('signed_contract_path')->whereNotNull('signed_promissory_note_path')->where(function ($query) {
                        $query->whereDoesntHave('guarantors', function ($query) {
                            $query->whereNull('signed_promissory_note_path');
                        });
                    });
                } else {
                    $notificationList->where(function ($query) {
                        $query->whereNull('signed_version_path')->orWhere(function ($query) {
                            $query->whereNull('signed_contract_path');
                        })->orWhere(function ($query) {
                            $query->whereNull('signed_promissory_note_path');
                        })->orWhere(function ($query) {
                            $query->whereHas('guarantors', function ($query) {
                                $query->whereNull('signed_promissory_note_path');
                            });
                        });
                    });
                }
            }
            // return $notificationList->toSql();


            if (isset($request["paginate"]) && ($request->paginate == false)) {
                $notificationList = $notificationList->orderByDesc('created_at')->get();
                $data = ["data" => $notificationList, "total" => count($notificationList)];
            } else {
                $data = $notificationList->orderByDesc('created_at')->paginate(8)->toArray();
            }


            return $this->responseOkPaginate($data);
        } else {
            return $this->responseError(["auth" => [$authorisation->message()]], 403);
        }
    }

    /**
     * Affiche un contrat
     *
     * @urlParam    id                                                      int     required    L'ID du contrat.                                                        Example: 1
     *
     * @queryParam  with_verbal_trial                                       int                 Afficher le PV.                                                         Example: 0
     * @queryParam  with_type_of_credit                                     int                 Afficher le type de crédit.                                             Example: 0
     * @queryParam  with_type_of_applicant                                  int                 Afficher le type de demandeur.                                          Example: 0
     * @queryParam  with_caf                                                int                 Afficher le CAF en charge du dossier.                                   Example: 0
     * @queryParam  with_guarantees                                         int                 Afficher les garanties.                                                 Example: 0
     * @queryParam  with_company                                            int                 Afficher les informations de la société                                 Example: 0
     * @queryParam  with_individual_business                                int                 Afficher les informations de l'entreprise individuelle                  Example: 0
     * @queryParam  with_type_of_guarantees                                 int                 Afficher les types des garanties.                                       Example: 0
     * @queryParam  with_pledges                                            int                 Afficher les gages.                                                     Example: 0
     *
     * @response 200
     */
    public function show(Request $request, int $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            if (($authorisation = Gate::inspect('view', $notification))->allowed()) {
                $suplementList = [];
                foreach (["with_verbal_trial" => "verbal_trial", "with_type_of_credit" => "verbal_trial.type_of_credit", "with_type_of_applicant" => "verbal_trial.type_of_credit.type_of_applicant", "with_guarantees" => "verbal_trial.guarantees", "with_caf" => "verbal_trial.caf", "with_type_of_guarantees" => "verbal_trial.guarantees.type_of_guarantee", "with_company" => "company", "with_individual_business" => "individual_business", "with_pledges" => "pledges"] as $key => $value) {
                    if (isset($request[$key]) && $request[$key]) {
                        $suplementList[] = $value;
                    }
                }
                $notification->load($suplementList);
                return $this->responseOk(["notification" => $notification]);
            } else {
                return $this->responseError(["auth" => [$authorisation->message()]], 403);
            }
        } else {
            return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
        }
    }

    /**
     * Télécharge la version word d'un contrat
     *
     * @urlParam    id                                                      int     required    L'ID du contrat.                                                        Example: 1
     *
     * @response 200
     */
    public function download(Request $request, int $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            if (($authorisation = Gate::inspect('view', $notification))->allowed()) {
                $templatePath = ($notification->has_pledges == "0") ? "../document_templates/Notifications/$notification->type/notification_$notification->type.docx" : "../document_templates/Notifications/$notification->type/with_pledge/notification_$notification->type" . "_with_pledge.docx";
                $templateProcessor = new TemplateProcessor($templatePath);

                $data = $notification->toArray();
                $data = array_merge($data, collect($notification->verbal_trial)->mapWithKeys(function ($value, $key) {
                    return ['verbal_trial.' . $key => $value];
                })->all());
                $data = array_merge($data, collect($notification->verbal_trial->type_of_credit)->mapWithKeys(function ($value, $key) {
                    return ['verbal_trial.type_of_credit.' . $key => $value];
                })->all());
                $data = array_merge($data, collect($notification->verbal_trial->type_of_credit->type_of_applicant)->mapWithKeys(function ($value, $key) {
                    return ['verbal_trial.type_of_credit.type_of_applicant.' . $key => $value];
                })->all());
                if ($notification->type == "company") {
                    $data = array_merge($data, collect($notification->company)->mapWithKeys(function ($value, $key) {
                        return ['company.' . $key => $value];
                    })->all());
                } elseif ($notification->type == "individual_business") {
                    $data = array_merge($data, collect($notification->individual_business)->mapWithKeys(function ($value, $key) {
                        return ['individual_business.' . $key => $value];
                    })->all());
                }
                $data["ht_rate"] = "17";
                $data["verbal_trial.day_due_amount"] = ((float) $data["verbal_trial.due_amount"]) / 20;
                $data["verbal_trial.day_due_amount.fr"] = SpellNumber::value((float) $data["verbal_trial.day_due_amount"])->locale('fr')->toLetters();
                $data["verbal_trial.amount.fr"] = SpellNumber::value((float) $data["verbal_trial.amount"])->locale('fr')->toLetters();
                $data["total_amount_of_interest.fr"] = SpellNumber::value((float) $data["total_amount_of_interest"])->locale('fr')->toLetters();
                $data["verbal_trial.duration.fr"] = SpellNumber::value((float) $data["verbal_trial.duration"])->locale('fr')->toLetters();
                $data["verbal_trial.due_amount.fr"] = SpellNumber::value((float) $data["verbal_trial.due_amount"])->locale('fr')->toLetters();
                $data["total_to_pay"] = (float) $data["total_amount_of_interest"] + (float) $data["verbal_trial.amount"];
                $data["total_to_pay.fr"] = SpellNumber::value((float) $data["total_to_pay"])->locale('fr')->toLetters();
                $data["verbal_trial.duration.fr"] = SpellNumber::value((float) $data["verbal_trial.duration"])->locale('fr')->toLetters();
                $data["signatory"] = (((float) $data["verbal_trial.amount"]) <= 10000000) ? "Madame Ameh Délali MESSANGAN épouse AMEDEMEGNAH, Responsable juridique" : "Mr. Koffi Djramedo GAMADO, Head Crédit";
                $data["verbal_trial.periodicity.fr"] = ["mensual" => "Mensuel", "quarterly" => "Trimestrielle", "semi-annual" => "Semestrielle", "annual" => "Annuel", "in-fine" => "A la fin"][$data["verbal_trial.periodicity"]];
                $data["verbal_trial.periodicity.fr2"] = ["mensual" => "chaque mois", "quarterly" => "chaque trimestre", "semi-annual" => "chaque semestre", "annual" => "chaque année", "in-fine" => "A la fin."][$data["verbal_trial.periodicity"]];
                $data["verbal_trial.periodicity.fr3"] = ["mensual" => "mensualité", "quarterly" => "trimestre", "semi-annual" => "semestre", "annual" => "année", "in-fine" => "echéance."][$data["verbal_trial.periodicity"]];
                $data["line_review_bonus"] = (((float) $data["verbal_trial.duration"]) < 18) ? "" : "Prime de révision de ligne      : « 1% du capital restant dû après 12 mois »";
                $data["representative_type_of_identity_document"] = [
                    "cni" => "Carte d'identité nationale",
                    "passport" => "Passeport",
                    "residence_certificate" => "Certificat de résidence",
                    "driving_licence" => "Permis de conduire"
                ][$data["representative_type_of_identity_document"]];

                $data["verbal_trial.amount"] = number_format(((float) $data["verbal_trial.amount"]), 0, ',', ' ');
                $data["verbal_trial.day_due_amount"] = number_format(((float) $data["verbal_trial.day_due_amount"]), 0, ',', ' ');
                $data["total_amount_of_interest"] = number_format(((float) $data["total_amount_of_interest"]), 0, ',', ' ');
                $data["verbal_trial.due_amount"] = number_format(((float) $data["verbal_trial.due_amount"]), 0, ',', ' ');
                $data["verbal_trial.administrative_fees_percentage"] = number_format(((float) $data["verbal_trial.administrative_fees_percentage"]), 0, ',', ' ');
                $data["verbal_trial.insurance_premium"] = number_format(((float) $data["verbal_trial.insurance_premium"]), 0, ',', ' ');
                $data["total_to_pay"] = number_format(((float) $data["total_to_pay"]), 0, ',', ' ');

                $guaranteeList = [];
                foreach ($notification->verbal_trial->guarantees as $guarantee) {
                    $tmp = $guarantee->toArray();
                    $tmp["value"] = number_format((float) $tmp["value"], 0, ',', ' ');
                    $guaranteeList[] = array_merge($tmp, collect($guarantee->type_of_guarantee)->mapWithKeys(function ($value, $key) {
                        return ['type_of_guarantee.' . $key => $value];
                    })->all());
                }
                $templateProcessor->cloneBlock('guaranteeList', 0, true, false, $guaranteeList);

                if ($notification->has_pledges == "true") {
                    $pledgeList = [];
                    foreach ($notification->pledges as $pledge) {
                        $tmp = $pledge->toArray();
                        $tmp["type.fr"] = ["vehicle" => "véhicule", "stock" => "stock"][$tmp["type"]];
                        $pledgeList[] = array_merge($tmp, collect($pledge->type_of_pledge)->mapWithKeys(function ($value, $key) {
                            return ['pledge.' . $key => $value];
                        })->all());
                    }
                    $data["vehicleCount"] = $notification->pledges()->where('type', 'vehicle')->count();
                    $data["stockCount"] = $notification->pledges()->where('type', 'stock')->count();
                    $data["number_pledge.fr"] = "";
                    if ($data["vehicleCount"] > 0) {
                        $data["number_pledge.fr"] .= SpellNumber::value((float) $data["vehicleCount"])->locale('fr')->toLetters() . " véhicule(s)";
                    }

                    if ($data["stockCount"] > 0) {
                        $data["number_pledge.fr"] .= ($data["vehicleCount"] > 0) ? " et " : "";
                        $data["number_pledge.fr"] .= SpellNumber::value((float) $data["stockCount"])->locale('fr')->toLetters() . " Stock(s)";
                    }
                    $templateProcessor->cloneBlock('pledgeList', 0, true, false, $pledgeList);
                }
                unset($data["observations"]);
                unset($data["guarantors"]);
                $templateProcessor->setValues($data);

                // Enregistrez les modifications dans un nouveau fichier
                $outputFilePath = public_path("Contrat-" . $notification->verbal_trial->committee_id . ".docx");
                $templateProcessor->saveAs($outputFilePath);

                return Response::file($outputFilePath, ["Content-Type" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document"])->deleteFileAfterSend(true);
            } else {
                return $this->responseError(["auth" => [$authorisation->message()]], 403);
            }
        } else {
            return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
        }
    }
    /**
     * Télécharge le billet à ordre d'un contrat
     *
     * @urlParam    id                                                      int     required    L'ID du contrat.                                                        Example: 1
     *
     * @response 200
     */
    public function promissory_note(Request $request, int $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            if (($authorisation = Gate::inspect('download', $notification))->allowed()) {
                $templateProcessor = new TemplateProcessor("../document_templates/Notifications/$notification->type/billet_a_ordre_$notification->type.docx");
                $data = $notification->toArray();
                $data = array_merge($data, collect($notification->verbal_trial)->mapWithKeys(function ($value, $key) {
                    return ['verbal_trial.' . $key => $value];
                })->all());

                $data = array_merge($data, collect($notification->verbal_trial->type_of_credit)->mapWithKeys(function ($value, $key) {
                    return ['verbal_trial.type_of_credit.' . $key => $value];
                })->all());
                $data = array_merge($data, collect($notification->verbal_trial->type_of_credit->type_of_applicant)->mapWithKeys(function ($value, $key) {
                    return ['verbal_trial.type_of_credit.type_of_applicant.' . $key => $value];
                })->all());
                if ($notification->type == "company") {
                    $data = array_merge($data, collect($notification->company)->mapWithKeys(function ($value, $key) {
                        return ['company.' . $key => $value];
                    })->all());
                } elseif ($notification->type == "individual_business") {
                    $data = array_merge($data, collect($notification->individual_business)->mapWithKeys(function ($value, $key) {
                        return ['individual_business.' . $key => $value];
                    })->all());
                }

                $data["ht_rate"] = "17";
                $data["current_date"] = Carbon::now()->format("d/m/Y");
                $data["verbal_trial.amount.fr"] = SpellNumber::value((float) $data["verbal_trial.amount"])->locale('fr')->toLetters();
                $data["total_amount_of_interest.fr"] = SpellNumber::value((float) $data["total_amount_of_interest"])->locale('fr')->toLetters();
                $data["verbal_trial.duration.fr"] = SpellNumber::value((float) $data["verbal_trial.duration"])->locale('fr')->toLetters();
                $data["verbal_trial.due_amount.fr"] = SpellNumber::value((float) $data["verbal_trial.due_amount"])->locale('fr')->toLetters();
                $data["total_to_pay"] = (float) $data["total_amount_of_interest"] + (float) $data["verbal_trial.amount"];
                $data["total_to_pay.fr"] = SpellNumber::value((float) $data["total_to_pay"])->locale('fr')->toLetters();
                $data["verbal_trial.duration.fr"] = SpellNumber::value((float) $data["verbal_trial.duration"])->locale('fr')->toLetters();
                $data["signatory"] = (((float) $data["verbal_trial.amount"]) <= 10000000) ? "Madame Ameh Délali MESSANGAN épouse AMEDEMEGNAH, Responsable juridique" : "Mr. Koffi Djramedo GAMADO, Head Crédit";
                $data["verbal_trial.periodicity.fr"] = ["mensual" => "Mensuel", "quarterly" => "Trimestrielle", "semi-annual" => "Semestrielle", "annual" => "Annuel", "in-fine" => "A la fin"][$data["verbal_trial.periodicity"]];
                $data["verbal_trial.periodicity.fr2"] = ["mensual" => "chaque mois", "quarterly" => "chaque trimestre", "semi-annual" => "chaque semestre", "annual" => "chaque année", "in-fine" => "A la fin."][$data["verbal_trial.periodicity"]];
                $data["verbal_trial.periodicity.fr3"] = ["mensual" => "mensualité", "quarterly" => "trimestre", "semi-annual" => "semestre", "annual" => "année", "in-fine" => "echéance."][$data["verbal_trial.periodicity"]];
                $data["line_review_bonus"] = (((float) $data["verbal_trial.duration"]) < 18) ? "" : "Prime de révision de ligne      : « 1% du capital restant dû après 12 mois »";
                $data["representative_type_of_identity_document"] = [
                    "cni" => "Carte d'identité nationale",
                    "passport" => "Passeport",
                    "residence_certificate" => "Certificat de résidence",
                    "driving_licence" => "Permis de conduire"
                ][$data["representative_type_of_identity_document"]];

                $data["verbal_trial.amount"] = number_format(((float) $data["verbal_trial.amount"]), 0, ',', ' ');
                $data["total_amount_of_interest"] = number_format(((float) $data["total_amount_of_interest"]), 0, ',', ' ');
                $data["verbal_trial.due_amount"] = number_format(((float) $data["verbal_trial.due_amount"]), 0, ',', ' ');
                $data["total_to_pay"] = number_format(((float) $data["total_to_pay"]), 0, ',', ' ');

                unset($data["observations"]);
                unset($data["guarantors"]);
                $templateProcessor->setValues($data);

                // Enregistrez les modifications dans un nouveau fichier
                $outputFilePath = public_path("Billet-a-ordre-" . $notification->verbal_trial->committee_id . ".docx");
                $templateProcessor->saveAs($outputFilePath);

                // return response()->download($outputFilePath)->deleteFileAfterSend(true);
                return Response::file($outputFilePath, ["Content-Type" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
            } else {
                return $this->responseError(["auth" => [$authorisation->message()]], 403);
            }
        } else {
            return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
        }
    }

    /**
     * Créer un nouveau contrat
     *
     * @bodyParam   verbal_trial_id                                         int                 L'ID du PV.                                                             Example: 1
     * @bodyParam   representative_birth_date                               string              La date de naissance du demandeur.                                      Example: 1988-05-01
     * @bodyParam   representative_birth_place                              string              Le lieu de naissance du demandeur.                                      Example: Lomé
     * @bodyParam   representative_nationality                              string              La nationalité du demandeur.                                            Example: Togolaise
     * @bodyParam   representative_home_address                             string              L'addresse du domicile du demandeur.                                    Example: Zip 85
     * @bodyParam   representative_type_of_identity_document                string              Le type de la pièce d'identité du demandeur.                           Example: cni
     * @bodyParam   representative_number_of_identity_document              string              Le numéro de la pièce d'identité du demandeur.                         Example: CND-4D8-84S-52S
     * @bodyParam   representative_date_of_issue_of_identity_document       string              La date de délivrance de la pièce d'identité du demandeur.              Example: 2020-01-01
     * @bodyParam   representative_phone_number                             string              Le numéro de téléphone du demandeur.                                    Example: +228 90 90 90 90
     * @bodyParam   risk_premium_percentage                                 int                 La prime de risque (en pourcentage) du crédit du demandeur.             Example: 2
     * @bodyParam   total_amount_of_interest                                int                 Le montant total des intérêts du crédit du demandeur.                   Example: 152369
     * @bodyParam   number_of_due_dates                                     int                 Le nombre d'échéance du crédit.                                         Example: 3
     * @bodyParam   type                                                    string              Le type du contrat.                                                     Example: company
     * @bodyParam   has_pledges                                             string              La présence de gage.                                                    Example: 0
     *
     * @response 200
     */
    public function store(Request $request)
    {
        if (($authorisation = Gate::inspect('create', Notification::class))->allowed()) {
            $requestData = $request->all();
            $validator = Validator::make($requestData, [
                'verbal_trial_id' => "required|exists:verbals_trials,id|unique:notifications",
                'representative_birth_date' => 'required|date',
                'representative_birth_place' => 'required|min:2',
                'representative_nationality' => 'required|min:2',
                'representative_home_address' => 'required|min:2',
                'representative_type_of_identity_document' => 'required|in:cni,passport,residence_certificate,driving_licence',
                'representative_number_of_identity_document' => 'required|min:2',
                'representative_date_of_issue_of_identity_document' => 'required|date',
                'representative_phone_number' => 'required|min:2',
                'risk_premium_percentage' => 'required|numeric',
                'total_amount_of_interest' => 'required|numeric',
                'number_of_due_dates' => 'required|numeric',
                'type' => 'required|in:particular,company,individual_business',
                'has_pledges' => 'required|boolean',
            ]);
            if ($validator->fails()) {
                return $this->responseError($validator->errors(), 400);
            }

            DB::beginTransaction();
            try {
                $relationList = ["verbal_trial", "verbal_trial.type_of_credit.type_of_applicant", "verbal_trial.guarantees"];
                $requestData["creator_id"] = $request->user()->id;
                $notification = Notification::create($requestData);
                if ($requestData["type"] == "company") {
                    $validator = Validator::make($requestData, [
                        'company_denomination' => "required|min:2",
                        'company_legal_status' => "required|min:2",
                        'company_head_office_address' => "required|min:2",
                        'company_rccm_number' => "required|min:2",
                        'company_phone_number' => "required|min:2",
                    ]);

                    if ($validator->fails()) {
                        return $this->responseError($validator->errors(), 400);
                    } else {
                        Company::create([
                            "notification_id" => $notification->id,
                            "denomination" => $requestData["company_denomination"],
                            "legal_status" => $requestData["company_legal_status"],
                            "head_office_address" => $requestData["company_head_office_address"],
                            "rccm_number" => $requestData["company_rccm_number"],
                            "phone_number" => $requestData["company_phone_number"],
                        ]);
                    }

                    $relationList[] = "company";
                } elseif ($requestData["type"] == "individual_business") {
                    $validator = Validator::make($requestData, [
                        'individual_business_denomination' => "required|min:2",
                        'individual_business_corporate_purpose' => "required|min:2",
                        'individual_business_head_office_address' => "required|min:2",
                        'individual_business_rccm_number' => "required|min:2",
                        'individual_business_phone_number' => "required|min:2",
                    ]);

                    if ($validator->fails()) {
                        return $this->responseError($validator->errors(), 400);
                    } else {
                        IndividualBusiness::create([
                            "notification_id" => $notification->id,
                            "denomination" => $requestData["individual_business_denomination"],
                            "corporate_purpose" => $requestData["individual_business_corporate_purpose"],
                            "head_office_address" => $requestData["individual_business_head_office_address"],
                            "rccm_number" => $requestData["individual_business_rccm_number"],
                            "phone_number" => $requestData["individual_business_phone_number"],
                        ]);
                    }

                    $relationList[] = "individual_business";
                }

                if (isset($requestData["has_pledges"])) {
                    if ($requestData["has_pledges"]) {
                        $validator = Validator::make($requestData, [
                            "pledges" => "required|array|min:1",
                            "pledges.*.type" => "required|in:vehicle,stock",
                            "pledges.*.comment" => "required|min:2"
                        ]);
                        if ($validator->fails()) {
                            return $this->responseError($validator->errors(), 400);
                        }
                        foreach ($requestData["pledges"] as $pledge) {
                            Pledge::create([
                                "notification_id" => $notification->id,
                                "type" => $pledge["type"],
                                "comment" => $pledge["comment"],
                            ]);
                        }
                        $relationList[] = "pledges";
                    }
                }
                $notification->load($relationList);
            } catch (Exception $e) {
                DB::rollback();
                throw $e;
            }
            DB::commit(); // Valider les opérations
            $receiver = $notification->verbal_trial->caf;
            $link = env("APP_URL") . "/notification";
            SendEmail::dispatch(
                $receiver->email,
                "Notification de mise en place d'un pv",
                "
              <h1 style='color: #333333;text-align: center; font-size: 24px; margin-bottom: 20px;'>Cher(e) $receiver->full_name,</U></h1>
  
              <p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge immédiatement le contrat en attente de signature par le client: <a href='$link'>Consulter l</a></p>
  
              <p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>
  
              <hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>
  
              <p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
          "
            );
            return $this->responseOk([
                "notification" => $notification
            ], status: 201);
        } else {
            return $this->responseError(["auth" => [$authorisation->message()]], 403);
        }
    }

    /**
     * Mettre à jour un contrat
     *
     * @urlParam    id                                                      int     required    L'ID du contrat.                                                        Example: 1
     *
     * @bodyParam   verbal_trial_id                                         int                 L'ID du PV.                                                             Example: 1
     * @bodyParam   representative_birth_date                               string              La date de naissance du demandeur.                                      Example: 1988-05-01
     * @bodyParam   representative_birth_place                              string              Le lieu de naissance du demandeur.                                      Example: Lomé
     * @bodyParam   representative_nationality                              string              La nationalité du demandeur.                                            Example: Togolaise
     * @bodyParam   representative_home_address                             string              L'addresse du domicile du demandeur.                                    Example: Zip 85
     * @bodyParam   representative_type_of_identity_document                string              Le type de la pièce d'identité du demandeur.                           Example: cni
     * @bodyParam   representative_number_of_identity_document              string              Le numéro de la pièce d'identité du demandeur.                         Example: CND-4D8-84S-52S
     * @bodyParam   representative_date_of_issue_of_identity_document       string              La date de délivrance de la pièce d'identité du demandeur.              Example: 2020-01-01
     * @bodyParam   representative_phone_number                             string              Le numéro de téléphone du demandeur.                                    Example: +228 90 90 90 90
     * @bodyParam   risk_premium_percentage                                 int                 La prime de risque (en pourcentage) du crédit du demandeur.             Example: 2
     * @bodyParam   total_amount_of_interest                                int                 Le montant total des intérêts du crédit du demandeur.                   Example: 152369
     * @bodyParam   number_of_due_dates                                     int                 Le nombre d'échéance du crédit.                                         Example: 3
     * @bodyParam   type                                                    string              Le type du contrat.                                                     Example: company
     *
     * @response 200
     *
     */
    public function update(Request $request, int $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            if (($authorisation = Gate::inspect('update', $notification))->allowed()) {
                $requestData = $request->all();
                $validator = Validator::make($requestData, [
                    'verbal_trial_id' => "required|exists:verbals_trials,id|unique:notifications,verbal_trial_id," . $id,
                    'representative_birth_date' => 'required|date',
                    'representative_birth_place' => 'required|min:2',
                    'representative_nationality' => 'required|min:2',
                    'representative_home_address' => 'required|min:2',
                    'representative_type_of_identity_document' => 'required|in:cni,passport,residence_certificate,driving_licence',
                    'representative_number_of_identity_document' => 'required|min:2',
                    'representative_date_of_issue_of_identity_document' => 'required|date',
                    'representative_phone_number' => 'required|min:2',
                    'risk_premium_percentage' => 'required|numeric',
                    'total_amount_of_interest' => 'required|numeric',
                    'number_of_due_dates' => 'required|numeric',
                    'type' => 'required|in:particular,company,individual_business',
                    'has_pledges' => 'required|boolean',
                ]);
                if ($validator->fails()) {
                    return $this->responseError($validator->errors(), 400);
                }

                DB::beginTransaction();
                try {
                    $relationList = ["verbal_trial", "verbal_trial.type_of_credit.type_of_applicant", "verbal_trial.guarantees"];
                    $requestData["creator_id"] = $request->user()->id;
                    $notification->update($requestData);
                    $notification->company?->delete();
                    $notification->individual_business?->delete();
                    if ($requestData["type"] == "company") {
                        $validator = Validator::make($requestData, [
                            'company_denomination' => "required|min:2",
                            'company_legal_status' => "required|min:2",
                            'company_head_office_address' => "required|min:2",
                            'company_rccm_number' => "required|min:2",
                            'company_phone_number' => "required|min:2",
                        ]);

                        if ($validator->fails()) {
                            return $this->responseError($validator->errors(), 400);
                        } else {
                            Company::create([
                                "notification_id" => $notification->id,
                                "denomination" => $requestData["company_denomination"],
                                "legal_status" => $requestData["company_legal_status"],
                                "head_office_address" => $requestData["company_head_office_address"],
                                "rccm_number" => $requestData["company_rccm_number"],
                                "phone_number" => $requestData["company_phone_number"],
                            ]);
                        }

                        $relationList[] = "company";
                    } elseif ($requestData["type"] == "individual_business") {
                        $validator = Validator::make($requestData, [
                            'individual_business_denomination' => "required|min:2",
                            'individual_business_corporate_purpose' => "required|min:2",
                            'individual_business_head_office_address' => "required|min:2",
                            'individual_business_rccm_number' => "required|min:2",
                            'individual_business_phone_number' => "required|min:2",
                        ]);

                        if ($validator->fails()) {
                            return $this->responseError($validator->errors(), 400);
                        } else {
                            IndividualBusiness::create([
                                "notification_id" => $notification->id,
                                "denomination" => $requestData["individual_business_denomination"],
                                "corporate_purpose" => $requestData["individual_business_corporate_purpose"],
                                "head_office_address" => $requestData["individual_business_head_office_address"],
                                "rccm_number" => $requestData["individual_business_rccm_number"],
                                "phone_number" => $requestData["individual_business_phone_number"],
                            ]);
                        }

                        $relationList[] = "individual_business";
                    }

                    if (isset($requestData["has_pledges"])) {
                        if ($requestData["has_pledges"]) {
                            $validator = Validator::make($requestData, [
                                "pledges" => "required|array|min:1",
                                "pledges.*.type" => "required|in:vehicle,stock",
                                "pledges.*.comment" => "required|min:2"
                            ]);
                            if ($validator->fails()) {
                                return $this->responseError($validator->errors(), 400);
                            }
                            foreach ($requestData["pledges"] as $pledge) {
                                Pledge::create([
                                    "notification_id" => $notification->id,
                                    "type" => $pledge["type"],
                                    "comment" => $pledge["comment"],
                                ]);
                            }
                            $relationList[] = "pledges";
                        }
                    }
                    $notification->load($relationList);
                } catch (Exception $e) {
                    DB::rollback();
                    throw $e;
                }
                DB::commit(); // Valider les opérations
                return $this->responseOk([
                    "notification" => $notification
                ], status: 201);
            } else {
                return $this->responseError(["auth" => [$authorisation->message()]], 403);
            }
        } else {
            return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
        }
    }

    /**
     * Sauvegarde le contrat ou procès verbal signé
     *
     * @urlParam    id                                                      int     required    L'ID du contrat.                                                        Example: 1
     *
     * @response 204
     */

    public function upload(Request $request, int $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            if (($authorisation = Gate::inspect('upload', $notification))->allowed()) {
                DB::beginTransaction();
                if ($request->has('signed_notification')) {
                    $document_category = "notification";
                    $base64Document = $request->input('signed_notification');
                } else if ($request->has('signed_promissory_note')) {
                    $document_category = "promissory_note";
                    $base64Document = $request->input('signed_promissory_note');
                } else {
                    DB::rollBack();
                    return $this->responseError(["error" => "Vous devez uploader un contrat signé ou un billet à ordre signé"], 400);
                }

                // Vérifier si le document est un PDF
                if (strpos($base64Document, 'data:application/pdf;base64,') === 0) {
                    // Le document est un PDF
                    $extension = 'pdf';
                } elseif (strpos($base64Document, 'data:image/') === 0) {
                    // Le document est une image
                    // Extraire l'extension de l'image
                    $start = strpos($base64Document, '/') + 1;
                    $end = strpos($base64Document, ';');
                    $extension = substr($base64Document, $start, $end - $start);
                } else {
                    // Type de document non pris en charge
                    DB::rollBack();
                    return $this->responseError(["error" => "Le document doit être un pdf ou une image"], 400);
                }

                $documentData = base64_decode(preg_replace('/^data:\w+\/\w+;base64,/', '', $base64Document));
                $path = 'upload/Notifications/signed_' . $document_category . 's/' . $notification->verbal_trial->committee_id . '-signed.' . $extension;
                Storage::disk("public")->put($path, $documentData);
                $notification->update(["signed_{$document_category}_path" => "/storage/" . $path]);

                DB::commit();
                return $this->responseOk(["notification" => $notification]);
            } else {
                return $this->responseError(["auth" => [$authorisation->message()]], 403);
            }
        } else {
            return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
        }
    }

    /**
     * Supprime un contrat
     *
     * @urlParam    id                                                      int     required    L'ID du contrat.                                                        Example: 1
     *
     * @response 204
     */
    public function destroy(int $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            if (($authorisation = Gate::inspect('delete', $notification))->allowed()) {
                if ($notification->delete()) {
                    return $this->responseOk(messages: ["notification" => "Le contrat a été supprimé"], status: 204);
                } else {
                    return $this->responseError(["server" => "Erreur du serveur"], 500);
                }
            } else {
                return $this->responseError(["auth" => [$authorisation->message()]], 403);
            }
        } else {
            return $this->responseError(["id" => ["Le contrat n'existe pas"]], 404);
        }

    }
}
