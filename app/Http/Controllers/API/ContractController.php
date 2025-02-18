<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Exception;
use Carbon\Carbon;
use App\Models\Pledge;
use App\Jobs\SendEmail;
use App\Models\Company;
use App\Models\Contract;
use Illuminate\Http\Request;
use App\Models\IndividualBusiness;
use Illuminate\Support\Facades\DB;
use Rmunate\Utilities\SpellNumber;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use PhpOffice\PhpWord\TemplateProcessor;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Process\Process;


/**
 * @group Contrat
 *
 * EndPoints pour gérer les contrats
 */
class ContractController extends Controller
{

	/**
	 * Affiche les contrats
	 *
	 * @queryParam  verbal_trial_id										 	int				Filtrer par ID du PV.													No-example
	 * @queryParam  representative_birth_date							   	string			Filtrer par date de naissance du demandeur.							 	No-example
	 * @queryParam  representative_birth_place							  	string			Filtrer par lieu de naissance du demandeur.							 	No-example
	 * @queryParam  representative_nationality							  	string			Filtrer par nationalité du demandeur.								   	No-example
	 * @queryParam  represenstative_home_address							string			Filtrer par addresse du domicile du demandeur.						  	No-example
	 * @queryParam  representative_type_of_identity_document				string			Filtrer par type de la pièce d'identité du demandeur.				   	No-example
	 * @queryParam  representative_number_of_identity_document			  	string			Filtrer par numéro de la pièce d'identité du demandeur.				 	No-example
	 * @queryParam  representative_date_of_issue_of_identity_document	   	string			Filtrer par date de délivrance de la pièce d'identité du demandeur.	 	No-example
	 * @queryParam  representative_phone_number							 	string			Filtrer par numéro de téléphone du demandeur.						   	No-example
	 * @queryParam  total_amount_of_interest								int				Filtrer par montant total des intérêts du crédit du demandeur.		  	No-example
	 * @queryParam  number_of_due_dates									 	int				Filtrer par nombre d'échéance.										  	No-example
	 * @queryParam  type													string		 	Filtrer par type de contract.										   	No-example
	 * @queryParam  has_pledges											 	int				Filtrer par présence de gage											No-example
	 * @queryParam  creator_id											  	int				Filtrer par ID du créateur											  	No-example
	 * @queryParam  has_upload_completed									int				Filtrer par finalisation du dossier du contrat.						 	Example: 0
	 * @queryParam  has_cat												 	int				Filtrer par présence de cat.											Example: 0
	 * @queryParam  status												  	string			Filtrer par statut du contrat										   	Example: waiting
	 *
	 * @queryParam  with_verbal_trial									   	int				Afficher le PV.														 	Example: 0
	 * @queryParam  with_verbal_trial_credit_admin						  	int				Afficher l'admin crédit du PV.										  	Example: 0
	 * @queryParam  with_verbal_trial_credit_analyst						int				Afficher l'analyst crédit du PV.										Example: 0
	 * @queryParam  with_type_of_credit									 	int				Afficher le type de crédit.											 	Example: 0
	 * @queryParam  with_type_of_applicant								  	int				Afficher le type de demandeur.										  	Example: 0
	 * @queryParam  with_caf												int				Afficher le caf en charge du dossier.								   	Example: 0
	 * @queryParam  with_guarantees										 	int				Afficher les garanties.												 	Example: 0
	 * @queryParam  with_type_of_guarantees								 	int				Afficher les types des garanties.									   	Example: 0
	 * @queryParam  with_company											int				Afficher les informations de la société								 	Example: 0
	 * @queryParam  with_individual_business								int				Afficher les informations de l'entreprise individuelle				  	Example: 0
	 * @queryParam  with_type_of_guarantees								 	int				Afficher les types des garanties.									   	Example: 0
	 * @queryParam  with_creator											int				Afficher le créateur du contrat.										Example: 0
	 * @queryParam  with_pledges											int				Afficher les gages.													 	Example: 0
	 * @queryParam  paginate												int				Utiliser la pagination.												 	Example: 0
	 *
	 * @response 200
	 */
	public function index(Request $request)
	{
		if (($authorisation = Gate::inspect('viewAny', Contract::class))->allowed()) {
			$contractList = Contract::query();
			if ($search = $request->search) {
				$contractList
					->where(function ($query) use ($search) {
						$query
							->where('representative_birth_date', 'LIKE', "%$search%")
							->orWhere('representative_birth_place', 'LIKE', "%$search%")
							->orWhere('representative_nationality', 'LIKE', "%$search%")
							->orWhere('representative_home_address', 'LIKE', "%$search%")
							->orWhere('representative_type_of_identity_document', 'LIKE', "%$search%")
							->orWhere('representative_number_of_identity_document', 'LIKE', "%$search%")
							->orWhere('representative_date_of_issue_of_identity_document', 'LIKE', "%$search%")
							->orWhere('representative_phone_number', 'LIKE', "%$search%")
							->orWhere('total_amount_of_interest', 'LIKE', "%$search%")
							->orWhere('number_of_due_dates', 'LIKE', "%$search%")
							->orWhere('type', 'LIKE', "%$search%")
							->orWhere('has_pledges', 'LIKE', "%$search%")
							->orWhereHas('verbal_trial', function ($query) use ($search) {
								$query->where('committee_id', 'LIKE', "%$search%")
									->orWhere(DB::raw("CONCAT(applicant_first_name, ' ', applicant_last_name)"), 'LIKE', "%$search%");
							});
					});
			}

			if (isset($request["has_cat"])) {
				$has_cat = (int) $request["has_cat"];
				if ($has_cat == 1) {
					$contractList->whereHas('c_a_t');
				} else if ($has_cat == 0) {
					$contractList->whereDoesntHave('c_a_t');
				}
			}

			foreach (["verbal_trial_id", "representative_birth_date", "representative_birth_place", "representative_nationality", "representative_home_address", "representative_type_of_identity_document", "representative_number_of_identity_document", "representative_date_of_issue_of_identity_document", "representative_phone_number", "total_amount_of_interest", "number_of_due_dates", "type", "has_pledges", "creator_id"] as $filter) {
				if (isset($request[$filter]) && $request[$filter]) {
					$contractList->where($filter, $request[$filter]);
				}
			}

			if (isset($request["status"])) {
				$contractList->where(function ($query) use ($request) {
					foreach (str_split($request["status"]) as $char) {
						if (in_array($char, ['w', 'v', 'r', 'c'])) {
							$query->orWhere("status", ["w" => "waiting", "v" => "validated", "r" => "rejected"][$char]);
						}
					}
				});
			}

			foreach (["with_verbal_trial" => "verbal_trial", "with_type_of_credit" => "verbal_trial.type_of_credit", "with_type_of_applicant" => "verbal_trial.type_of_credit.type_of_applicant", "with_guarantees" => "verbal_trial.guarantees", "with_caf" => "verbal_trial.caf", "with_type_of_guarantees" => "verbal_trial.guarantees.type_of_guarantee", "with_company" => "company", "with_individual_business" => "individual_business", "with_creator" => "creator", "with_pledges" => "pledges", "with_verbal_trial_credit_analyst" => "verbal_trial.credit_analyst", "with_verbal_trial_credit_admin" => "verbal_trial.credit_admin"] as $key => $value) {
				if (isset($request[$key]) && $request[$key]) {
					$contractList->with($value);
				}
			}
			if (($currentUser = $request->user())->profile == "caf") {
				$contractList->whereHas('verbal_trial', function ($query) use ($currentUser) {
					$query->where('caf_id', $currentUser->id);
				});
			}

			if (isset($request["has_upload_completed"])) {
				if ($request["has_upload_completed"]) {
					$contractList->whereNotNull('signed_contract_path')->whereNotNull('signed_promissory_note_path')->where(function ($query) {
						$query->whereDoesntHave('guarantors', function ($query) {
							$query->whereNull('signed_contract_path')->orWhere(function ($query) {
								$query->whereNull('signed_promissory_note_path');
							});
						});
					});
				} else {
					$contractList->where(function ($query) {
						$query->whereNull('signed_contract_path')->orWhere(function ($query) {
							$query->whereNull('signed_promissory_note_path');
						})->orWhere(function ($query) {
							$query->whereHas('guarantors', function ($query) {
								$query->whereNull('signed_contract_path')->orWhere(function ($query) {
									$query->whereNull('signed_promissory_note_path');
								});
							});
						});
					});
				}
			}

			if (isset($request["paginate"]) && ($request->paginate == false)) {
				$contractList = $contractList->orderByDesc('updated_at')->get();
				$data = ["data" => $contractList, "total" => count($contractList)];
			} else {
				$data = $contractList->orderByDesc('updated_at')->paginate(8)->toArray();
			}


			return $this->responseOkPaginate($data);
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}

	/**
	 * Affiche un contrat
	 *
	 * @urlParam	id													  int	 required	L'ID du contrat.														Example: 1
	 *
	 * @queryParam  with_verbal_trial									   int				 Afficher le PV.														 Example: 0
	 * @queryParam  with_verbal_trial_credit_admin						  int				 Afficher l'admin crédit du PV.										  Example: 0
	 * @queryParam  with_verbal_trial_credit_analyst						int				 Afficher l'analyst crédit du PV.										Example: 0
	 * @queryParam  with_type_of_credit									 int				 Afficher le type de crédit.											 Example: 0
	 * @queryParam  with_type_of_applicant								  int				 Afficher le type de demandeur.										  Example: 0
	 * @queryParam  with_caf												int				 Afficher le CAF en charge du dossier.								   Example: 0
	 * @queryParam  with_guarantees										 int				 Afficher les garanties.												 Example: 0
	 * @queryParam  with_company											int				 Afficher les informations de la société								 Example: 0
	 * @queryParam  with_individual_business								int				 Afficher les informations de l'entreprise individuelle				  Example: 0
	 * @queryParam  with_type_of_guarantees								 int				 Afficher les types des garanties.									   Example: 0
	 * @queryParam  with_creator											int				 Afficher le créateur du contrat.										Example: 0
	 * @queryParam  with_pledges											int				 Afficher les gages.													 Example: 0
	 *
	 * @response 200
	 */
	public function show(Request $request, int $id)
	{
		$contract = Contract::find($id);
		if ($contract) {
			if (($authorisation = Gate::inspect('view', $contract))->allowed()) {
				$suplementList = [];
				foreach (["with_verbal_trial" => "verbal_trial", "with_type_of_credit" => "verbal_trial.type_of_credit", "with_type_of_applicant" => "verbal_trial.type_of_credit.type_of_applicant", "with_guarantees" => "verbal_trial.guarantees", "with_caf" => "verbal_trial.caf", "with_type_of_guarantees" => "verbal_trial.guarantees.type_of_guarantee", "with_company" => "company", "with_individual_business" => "individual_business", "with_pledges" => "pledges", "with_creator" => "creator", "with_verbal_trial_credit_analyst" => "verbal_trial.credit_analyst", "with_verbal_trial_credit_admin" => "verbal_trial.credit_admin"] as $key => $value) {
					if (isset($request[$key]) && $request[$key]) {
						$suplementList[] = $value;
					}
				}
				$contract->load($suplementList);
				return $this->responseOk(["contract" => $contract]);
			} else {
				return $this->responseError(
					["auth" => [$authorisation->message()]],
					403
				);
			}
		} else {
			return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
		}
	}

	/**
	 * Télécharge la version word d'un contrat
	 *
	 * @urlParam	id													  int	 required	L'ID du contrat.														Example: 1
	 *
	 * @response 200
	 */
	public function download(Request $request, int $id)
	{
		$contract = Contract::find($id);
		if ($contract) {
			if (($authorisation = Gate::inspect('view', $contract))->allowed()) {
				$contract_dir = $contract->verbal_trial->number_deferred == 0 ? "Contracts" : "Contracts-deferral";
				$templatePath = ($contract->has_pledges) ? "../document_templates/$contract_dir/$contract->type/with_pledge/contract_$contract->type" . "_with_pledge.docx" : "../document_templates/$contract_dir/$contract->type/contract_$contract->type.docx";
				$templateProcessor = new TemplateProcessor($templatePath);

				$data = $contract->toArray();
				$data = array_merge($data, collect($contract->verbal_trial)->mapWithKeys(function ($value, $key) {
					return ['verbal_trial.' . $key => $value];
				})->all());
				$data = array_merge($data, collect($contract->verbal_trial->type_of_credit)->mapWithKeys(function ($value, $key) {
					return ['verbal_trial.type_of_credit.' . $key => $value];
				})->all());
				$data = array_merge($data, collect($contract->verbal_trial->type_of_credit->type_of_applicant)->mapWithKeys(function ($value, $key) {
					return ['verbal_trial.type_of_credit.type_of_applicant.' . $key => $value];
				})->all());
				if ($contract->type == "company") {
					$data = array_merge($data, collect($contract->company)->mapWithKeys(function ($value, $key) {
						return ['company.' . $key => $value];
					})->all());
				} elseif ($contract->type == "individual_business") {
					$data = array_merge($data, collect($contract->individual_business)->mapWithKeys(function ($value, $key) {
						return ['individual_business.' . $key => $value];
					})->all());
				}
				$data["ht_rate"] = "17";
				$data["day_due_amount"] = ((float) $data["due_amount"]) / 20;
				$data["day_due_amount.fr"] = SpellNumber::value((float) $data["day_due_amount"])->locale('fr')->toLetters();
				$data["verbal_trial.amount.fr"] = SpellNumber::value((float) $data["verbal_trial.amount"])->locale('fr')->toLetters();
				$data["total_amount_of_interest.fr"] = SpellNumber::value((float) $data["total_amount_of_interest"])->locale('fr')->toLetters();
				$data["verbal_trial.duration.fr"] = SpellNumber::value((float) $data["verbal_trial.duration"])->locale('fr')->toLetters();
				$data["due_amount.fr"] = SpellNumber::value((float) $data["due_amount"])->locale('fr')->toLetters();
				$data["total_to_pay"] = (float) $data["total_amount_of_interest"] + (float) $data["verbal_trial.amount"];
				$data["total_to_pay.fr"] = SpellNumber::value((float) $data["total_to_pay"])->locale('fr')->toLetters();
				$data["verbal_trial.duration.fr"] = SpellNumber::value((float) $data["verbal_trial.duration"])->locale('fr')->toLetters();
				$data["signatory"] = (((float) $data["verbal_trial.amount"]) <= 10000000) ? "Madame Ameh Délali MESSANGAN épouse AMEDEMEGNAH, Responsable juridique" : "Mr. Koffi Djramedo GAMADO, Head Crédit";
				$data["verbal_trial.periodicity.fr"] = ["mensual" => "Mensuel", "quarterly" => "Trimestrielle", "semi-annual" => "Semestrielle", "annual" => "Annuel", "in-fine" => "A la fin"][$data["verbal_trial.periodicity"]];
				$data["verbal_trial.periodicity.fr2"] = ["mensual" => "chaque mois", "quarterly" => "chaque trimestre", "semi-annual" => "chaque semestre", "annual" => "chaque année", "in-fine" => "A la fin."][$data["verbal_trial.periodicity"]];
				$data["verbal_trial.periodicity.fr3"] = ["mensual" => "mensualité", "quarterly" => "trimestre", "semi-annual" => "semestre", "annual" => "année", "in-fine" => "echéance"][$data["verbal_trial.periodicity"]];
				$data["verbal_trial.periodicity.fr3"] .= ($data["number_of_due_dates"] > 1) ? "s" : "";
				$data["verbal_trial.risk_premium"] = (((float) $data["verbal_trial.risk_premium_percentage"]) == 0) ? "0" : number_format($data["verbal_trial.risk_premium_percentage"] * $data["verbal_trial.amount"] / 100, 0, ',', " ") . " F CFA";

				$data["line_risk_premium_percentage"] = (((float) $data["verbal_trial.risk_premium_percentage"]) == 0) ? "" : "<br/> \n Prime de risque (" . $data["verbal_trial.risk_premium_percentage"] . " %)";
				$data["line_risk_premium_percentage_value"] = (((float) $data["verbal_trial.risk_premium_percentage"]) == 0) ? "" : ": " . number_format($data["verbal_trial.risk_premium_percentage"] * $data["verbal_trial.amount"] / 100, 0, ',', " ") . " F CFA";


				$data["line_review_bonus"] = $data["verbal_trial.has_line_review_bonus"] ? "Prime de révision de ligne" : "";
				$data["line_review_bonus_value"] = $data["verbal_trial.has_line_review_bonus"] ? ": 1% du capital restant dû après 12 mois" : "";

				$data["representative_type_of_identity_document"] = [
					"cni" => "Carte d'identité nationale",
					"passport" => "Passeport",
					"residence_certificate" => "Certificat de résidence",
					"driving_licence" => "Permis de conduire",
					"consular_card" => "Carte consulaire",
					"ECOWAS_identity_card" => "Carte d’identité de la CEDEAO",
					"residence_permit" => "Carte de séjour",
				][$data["representative_type_of_identity_document"]];

				$data["day_due_amount"] = number_format(((float) $data["day_due_amount"]), 0, ',', ' ');
				$data["total_amount_of_interest"] = number_format(((float) $data["total_amount_of_interest"]), 0, ',', ' ');
				$data["due_amount"] = number_format(((float) $data["due_amount"]), 0, ',', ' ');
				$tmp_fees = (float) $data["verbal_trial.administrative_fees_percentage"];
				$data["verbal_trial.administrative_fees_percentage"] = number_format($tmp_fees, ($tmp_fees == (int) $tmp_fees) ? 0 : 2, ',', ' ');
				$data["total_to_pay"] = number_format(((float) $data["total_to_pay"]), 0, ',', ' ');

				if ($contract->verbal_trial->number_deferred > 0) {
					$data["deferred_amount.fr"] = SpellNumber::value((float) $data["deferred_amount"])->locale('fr')->toLetters();
					$data["deferred_amount"] = number_format(((float) $data["deferred_amount"]), 0, ',', ' ');
					$data["number_deferred_fr"] = "le " . SpellNumber::value((float) $data["verbal_trial.number_deferred"])->locale('fr')->toLetters() . " mois";
					if ($data["verbal_trial.number_deferred"] == 1) {
						$data["number_deferred_fr"] = "le premier mois";
					} else {
						$data["number_deferred_fr"] = "les " . SpellNumber::value($contract->verbal_trial->number_deferred)->locale('fr')->toLetters() . " premiers mois";
					}
				}


				$guaranteeList = [];
				foreach ($contract->verbal_trial->guarantees as $guarantee) {
					$tmp = $guarantee->toArray();
					$guaranteeList[] = array_merge($tmp, collect($guarantee->type_of_guarantee)->mapWithKeys(function ($value, $key) {
						return ['type_of_guarantee.' . $key => $value];
					})->all());
				}
				$templateProcessor->cloneBlock('guaranteeList', 0, true, false, $guaranteeList);

				$insuranceList = $contract->verbal_trial->has_insurance ? [["key" => "Prime d’assurance", "value" => "Selon la grille de l’assureur"]] : [];
				$templateProcessor->cloneBlock('insurance', 0, true, false, $insuranceList);

				$riskPremiumPercentageList = (((float) $data["verbal_trial.risk_premium_percentage"]) == 0) ? [] : [["key" => "Prime de risque (" . $data["verbal_trial.risk_premium_percentage"] . " %)", "value" => "" . number_format($data["verbal_trial.risk_premium_percentage"] * $data["verbal_trial.amount"] / 100, 0, ',', " ") . " F CFA"]];
				$templateProcessor->cloneBlock('riskPremiumPercentage', 0, true, false, $riskPremiumPercentageList);

				$reviewBonusList = $data["verbal_trial.has_line_review_bonus"] ? [["key" => "Prime de révision de ligne", "value" => "1% du capital restant dû après 12 mois"]] : [];
				$templateProcessor->cloneBlock('reviewBonus', 0, true, false, $reviewBonusList);

				if ($contract->has_pledges) {
					$pledgeList = [];
					foreach ($contract->pledges as $pledge) {
						$tmp = $pledge->toArray();
						$tmp["type.fr"] = ["vehicle" => "véhicule", "stock" => "stock"][$tmp["type"]];
						$pledgeList[] = array_merge($tmp, collect($pledge->type_of_pledge)->mapWithKeys(function ($value, $key) {
							return ['pledge.' . $key => $value];
						})->all());
					}
					$data["vehicleCount"] = $contract->pledges()->where('type', 'vehicle')->count();
					$data["stockCount"] = $contract->pledges()->where('type', 'stock')->count();
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
				unset($data["verbal_trial"]);
				unset($data["verbal_trial.next"]);
				unset($data["verbal_trial.guarantees"]);
				unset($data["verbal_trial.contract"]);

				$data["client_name"] = $contract->type == "particular" ? $contract->verbal_trial->civility . " " . $contract->verbal_trial->applicant_full_name : $contract->verbal_trial->entity_name;

				$data["verbal_trial.amount"] = number_format(((float) $data["verbal_trial.amount"]), 0, ',', ' ');
				$templateProcessor->setValues($data);

				// Enregistrez les modifications dans un nouveau fichier
				$outputFilePath = public_path("generated/docx/Contrat-" . $contract->verbal_trial->committee_id . ".docx");
				$templateProcessor->saveAs($outputFilePath);
				$outputFilePdfFolderPath = public_path("generated/pdf");
				$outputFilePdfPath = public_path("generated/pdf/Contrat-" . $contract->verbal_trial->committee_id . ".pdf");


				$command = sprintf('/usr/bin/libreoffice --headless --convert-to pdf %s --outdir %s', escapeshellarg($outputFilePath), escapeshellarg($outputFilePdfFolderPath));
				$output = [];
				$returnVar = 0;
				exec($command, $output, $returnVar);
				// Vérification du succès
				if ($returnVar === 0) {
					File::delete($outputFilePath);
					return Response::file($outputFilePdfPath, ["Content-Type" => "application/pdf"])->deleteFileAfterSend(true);
				}
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
	 * @urlParam	id													  int	 required	L'ID du contrat.														Example: 1
	 *
	 * @response 200
	 */
	public function promissory_note(Request $request, int $id)
	{
		$contract = Contract::find($id);
		if ($contract) {
			$templateProcessor = new TemplateProcessor("../document_templates/Contracts/$contract->type/billet_a_ordre_$contract->type.docx");
			$data = $contract->toArray();
			$data = array_merge($data, collect($contract->verbal_trial)->mapWithKeys(function ($value, $key) {
				return ['verbal_trial.' . $key => $value];
			})->all());

			$data = array_merge($data, collect($contract->verbal_trial->type_of_credit)->mapWithKeys(function ($value, $key) {
				return ['verbal_trial.type_of_credit.' . $key => $value];
			})->all());
			$data = array_merge($data, collect($contract->verbal_trial->type_of_credit->type_of_applicant)->mapWithKeys(function ($value, $key) {
				return ['verbal_trial.type_of_credit.type_of_applicant.' . $key => $value];
			})->all());
			if ($contract->type == "company") {
				$data = array_merge($data, collect($contract->company)->mapWithKeys(function ($value, $key) {
					return ['company.' . $key => $value];
				})->all());
			} elseif ($contract->type == "individual_business") {
				$data = array_merge($data, collect($contract->individual_business)->mapWithKeys(function ($value, $key) {
					return ['individual_business.' . $key => $value];
				})->all());
			}

			$data["ht_rate"] = "17";
			$data["current_date"] = Carbon::now()->format("d/m/Y");
			$data["verbal_trial.amount.fr"] = SpellNumber::value((float) $data["verbal_trial.amount"])->locale('fr')->toLetters();
			$data["total_amount_of_interest.fr"] = SpellNumber::value((float) $data["total_amount_of_interest"])->locale('fr')->toLetters();
			$data["verbal_trial.duration.fr"] = SpellNumber::value((float) $data["verbal_trial.duration"])->locale('fr')->toLetters();
			$data["due_amount.fr"] = SpellNumber::value((float) $data["due_amount"])->locale('fr')->toLetters();
			$data["total_to_pay"] = (float) $data["total_amount_of_interest"] + (float) $data["verbal_trial.amount"];
			$data["total_to_pay.fr"] = SpellNumber::value((float) $data["total_to_pay"])->locale('fr')->toLetters();
			$data["verbal_trial.duration.fr"] = SpellNumber::value((float) $data["verbal_trial.duration"])->locale('fr')->toLetters();
			$data["signatory"] = (((float) $data["verbal_trial.amount"]) <= 10000000) ? "Madame Ameh Délali MESSANGAN épouse AMEDEMEGNAH, Responsable juridique" : "Mr. Koffi Djramedo GAMADO, Head Crédit";
			$data["verbal_trial.periodicity.fr"] = ["mensual" => "Mensuel", "quarterly" => "Trimestrielle", "semi-annual" => "Semestrielle", "annual" => "Annuel", "in-fine" => "A la fin"][$data["verbal_trial.periodicity"]];
			$data["verbal_trial.periodicity.fr2"] = ["mensual" => "chaque mois", "quarterly" => "chaque trimestre", "semi-annual" => "chaque semestre", "annual" => "chaque année", "in-fine" => "A la fin."][$data["verbal_trial.periodicity"]];
			$data["verbal_trial.periodicity.fr3"] = ["mensual" => "mensualité", "quarterly" => "trimestre", "semi-annual" => "semestre", "annual" => "année", "in-fine" => "echéance"][$data["verbal_trial.periodicity"]];
			$data["verbal_trial.periodicity.fr3"] .= ($data["number_of_due_dates"] > 1) ? "s" : "";

			$data["line_review_bonus"] = $data["verbal_trial.has_line_review_bonus"] ? "Prime de révision de ligne	  : 1% du capital restant dû après 12 mois" : "";

			$data["representative_type_of_identity_document"] = [
				"cni" => "Carte d'identité nationale",
				"passport" => "Passeport",
				"residence_certificate" => "Certificat de résidence",
				"driving_licence" => "Permis de conduire",
				"consular_card" => "Carte consulaire",
				"ECOWAS_identity_card" => "Carte d’identité de la CEDEAO",
				"residence_permit" => "Carte de séjour",
			][$data["representative_type_of_identity_document"]];

			$data["verbal_trial.amount"] = number_format(((float) $data["verbal_trial.amount"]), 0, ',', ' ');
			$data["total_amount_of_interest"] = number_format(((float) $data["total_amount_of_interest"]), 0, ',', ' ');
			$data["due_amount"] = number_format(((float) $data["due_amount"]), 0, ',', ' ');
			$data["total_to_pay"] = number_format(((float) $data["total_to_pay"]), 0, ',', ' ');

			unset($data["observations"]);
			unset($data["guarantors"]);
			unset($data["verbal_trial.next"]);
			unset($data["verbal_trial.guarantees"]);
			unset($data["verbal_trial.contract"]);
			$templateProcessor->setValues($data);

			// Enregistrez les modifications dans un nouveau fichier
			$outputFilePath = public_path("generated/docx/Billet-a-ordre-" . $contract->verbal_trial->committee_id . ".docx");
			$templateProcessor->saveAs($outputFilePath);
			$outputFilePdfFolderPath = public_path("generated/pdf");
			$outputFilePdfPath = public_path("generated/pdf/Billet-a-ordre-" . $contract->verbal_trial->committee_id . ".pdf");


			$command = sprintf('/usr/bin/libreoffice --headless --convert-to pdf %s --outdir %s', escapeshellarg($outputFilePath), escapeshellarg($outputFilePdfFolderPath));
			$output = [];
			$returnVar = 0;
			exec($command, $output, $returnVar);
			// Vérification du succès
			if ($returnVar === 0) {
				File::delete($outputFilePath);
				return Response::file($outputFilePdfPath, ["Content-Type" => "application/pdf"])->deleteFileAfterSend(true);
			}
		} else {
			return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
		}
	}


	/**
	 * Télécharge la mention manuscrite
	 *
	 * @urlParam	id													  int	 required	L'ID du contrat.														Example: 1
	 *
	 * @response 200
	 */
	public function handwritten_mention(Request $request, int $id)
	{
		$contract = Contract::find($id);
		if ($contract) {
			$templateProcessor = new TemplateProcessor("../document_templates/Mention-manuscrite/mention_manuscrite.docx");
			$data = $contract->toArray();
			$data["amount_float"] = ((float) $data["total_amount_of_interest"]) + $contract->verbal_trial->amount;
			$data["amount"] = number_format($data["amount_float"], 0, ',', ' ');
			$data["amount.fr"] = SpellNumber::value((float) $data["amount_float"])->locale('fr')->toLetters();
			$templateProcessor->setValues(["amount" => $data["amount"], "amount.fr" => $data["amount.fr"],]);

			// Enregistrez les modifications dans un nouveau fichier
			$outputFilePath = public_path("generated/docx/HandwrittenMention-" . $contract->verbal_trial->committee_id . ".docx");
			$templateProcessor->saveAs($outputFilePath);
			$outputFilePdfFolderPath = public_path("generated/pdf");
			$outputFilePdfPath = public_path("generated/pdf/HandwrittenMention-" . $contract->verbal_trial->committee_id . ".pdf");


			$command = sprintf('/usr/bin/libreoffice --headless --convert-to pdf %s --outdir %s', escapeshellarg($outputFilePath), escapeshellarg($outputFilePdfFolderPath));
			$output = [];
			$returnVar = 0;
			exec($command, $output, $returnVar);
			// Vérification du succès
			if ($returnVar === 0) {
				File::delete($outputFilePath);
				return Response::file($outputFilePdfPath, ["Content-Type" => "application/pdf"])->deleteFileAfterSend(true);
			}
		} else {
			return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
		}
	}

	/**
	 * Créer un nouveau contrat
	 *
	 * @bodyParam   verbal_trial_id										 int				 L'ID du PV.															 Example: 1
	 * @bodyParam   representative_birth_date							   string			  La date de naissance du demandeur.									  Example: 1988-05-01
	 * @bodyParam   representative_birth_place							  string			  Le lieu de naissance du demandeur.									  Example: Lomé
	 * @bodyParam   representative_nationality							  string			  La nationalité du demandeur.											Example: Togolaise
	 * @bodyParam   representative_home_address							 string			  L'addresse du domicile du demandeur.									Example: Zip 85
	 * @bodyParam   representative_type_of_identity_document				string			  Le type de la pièce d'identité du demandeur.						   Example: cni
	 * @bodyParam   representative_number_of_identity_document			  string			  Le numéro de la pièce d'identité du demandeur.						 Example: CND-4D8-84S-52S
	 * @bodyParam   representative_date_of_issue_of_identity_document	   string			  La date de délivrance de la pièce d'identité du demandeur.			  Example: 2020-01-01
	 * @bodyParam   representative_phone_number							 string			  Le numéro de téléphone du demandeur.									Example: +228 90 90 90 90
	 * @bodyParam   risk_premium_percentage								 int				 La prime de risque (en pourcentage) du crédit du demandeur.			 Example: 2
	 * @bodyParam   total_amount_of_interest								int				 Le montant total des intérêts du crédit du demandeur.				   Example: 152369
	 * @bodyParam   number_of_due_dates									 int				 Le nombre d'échéance du crédit.										 Example: 3
	 * @bodyParam   type													string			  Le type du contrat.													 Example: company
	 * @bodyParam   has_pledges											 string			  La présence de gage.													Example: 0
	 * @bodyParam   due_amount											 	int			  	Le montant d'une échéance.											  Example: 250000
	 *
	 * @response 200
	 */
	public function store(Request $request)
	{
		if (($authorisation = Gate::inspect('create', Contract::class))->allowed()) {
			$requestData = $request->all();
			$validator = Validator::make($requestData, [
				'verbal_trial_id' => "required|exists:verbals_trials,id|unique:contracts",
				'representative_birth_date' => 'required|date',
				'representative_birth_place' => 'required|min:2',
				'representative_nationality' => 'required|min:2',
				'representative_home_address' => 'required|min:2',
				'representative_type_of_identity_document' => 'required|in:cni,passport,residence_certificate,driving_licence,consular_card,ECOWAS_identity_card,residence_permit',
				'representative_number_of_identity_document' => 'required|min:2',
				'representative_date_of_issue_of_identity_document' => 'required|date',
				'representative_phone_number' => 'required|min:2',
				'total_amount_of_interest' => 'required|numeric',
				'number_of_due_dates' => 'required|numeric',
				'type' => 'required|in:particular,company,individual_business',
				'has_pledges' => 'required|boolean',
				'due_amount' => 'required|numeric',
				'deferred_amount' => 'required|numeric',
			]);
			if ($validator->fails()) {
				return $this->responseError($validator->errors(), 400);
			}

			DB::beginTransaction();
			try {
				$relationList = ["verbal_trial", "verbal_trial.type_of_credit.type_of_applicant", "verbal_trial.guarantees"];
				$requestData["creator_id"] = $request->user()->id;
				$contract = Contract::create($requestData);
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
							"contract_id" => $contract->id,
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
							"contract_id" => $contract->id,
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
					if ($requestData["has_pledges"] == "1") {
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
								"contract_id" => $contract->id,
								"type" => $pledge["type"],
								"comment" => $pledge["comment"],
							]);
						}
						$relationList[] = "pledges";
					}
				}
				$requestData["has_pledges"] = $requestData["has_pledges"] == "1";
				$contract->update($requestData);
				$contract->load($relationList);
			} catch (Exception $e) {
				DB::rollback();
				throw $e;
			}
			DB::commit(); // Valider les opérations
			$receiver = $contract->verbal_trial->caf;
			$link = env("APP_URL") . "/contract";
			SendEmail::dispatch(
				$receiver->email,
				"Notification de mise en place d'un contrat",
				"
				<h1 style='color: #333333;text-align: center; font-size: 24px; margin-bottom: 20px;'>Cher(e)
					$receiver->full_name,</U></h1>

				<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application
					cofina credit digital et de prendre en charge immédiatement le contrat en attente de signature par le client: <a
						href='$link'>Consulter les contrats</a></p>

				<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations,
					n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>

				<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>

				<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
				"
			);
			return $this->responseOk([
				"contract" => $contract
			], status: 201);
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}

	/**
	 * Mettre à jour un contrat
	 *
	 * @urlParam	id													  int	 required	L'ID du contrat.														Example: 1
	 *
	 * @bodyParam   verbal_trial_id										 int				 L'ID du PV.															 Example: 1
	 * @bodyParam   representative_birth_date							   string			  La date de naissance du demandeur.									  Example: 1988-05-01
	 * @bodyParam   representative_birth_place							  string			  Le lieu de naissance du demandeur.									  Example: Lomé
	 * @bodyParam   representative_nationality							  string			  La nationalité du demandeur.											Example: Togolaise
	 * @bodyParam   representative_home_address							 string			  L'addresse du domicile du demandeur.									Example: Zip 85
	 * @bodyParam   representative_type_of_identity_document				string			  Le type de la pièce d'identité du demandeur.						   Example: cni
	 * @bodyParam   representative_number_of_identity_document			  string			  Le numéro de la pièce d'identité du demandeur.						 Example: CND-4D8-84S-52S
	 * @bodyParam   representative_date_of_issue_of_identity_document	   string			  La date de délivrance de la pièce d'identité du demandeur.			  Example: 2020-01-01
	 * @bodyParam   representative_phone_number							 string			  Le numéro de téléphone du demandeur.									Example: +228 90 90 90 90
	 * @bodyParam   risk_premium_percentage								 int				 La prime de risque (en pourcentage) du crédit du demandeur.			 Example: 2
	 * @bodyParam   total_amount_of_interest								int				 Le montant total des intérêts du crédit du demandeur.				   Example: 152369
	 * @bodyParam   number_of_due_dates									 int				 Le nombre d'échéance du crédit.										 Example: 3
	 * @bodyParam   type													string			  Le type du contrat.													 Example: company
	 * @bodyParam   due_amount											 	int			  	Le montant d'une échéance.											  Example: 250000
	 *
	 * @response 200
	 *
	 */
	public function update(Request $request, int $id)
	{
		$contract = Contract::find($id);
		if ($contract) {
			if (($authorisation = Gate::inspect('update', $contract))->allowed()) {
				$requestData = $request->all();
				$validator = Validator::make($requestData, [
					'verbal_trial_id' => "required|exists:verbals_trials,id|unique:contracts,verbal_trial_id," . $id,
					'representative_birth_date' => 'required|date',
					'representative_birth_place' => 'required|min:2',
					'representative_nationality' => 'required|min:2',
					'representative_home_address' => 'required|min:2',
					'representative_type_of_identity_document' => 'required|in:cni,passport,residence_certificate,driving_licence,consular_card,ECOWAS_identity_card,residence_permit',
					'representative_number_of_identity_document' => 'required|min:2',
					'representative_date_of_issue_of_identity_document' => 'required|date',
					'representative_phone_number' => 'required|min:2',
					'total_amount_of_interest' => 'required|numeric',
					'number_of_due_dates' => 'required|numeric',
					'type' => 'required|in:particular,company,individual_business',
					'has_pledges' => 'required|boolean',
					'due_amount' => 'required|numeric',
					'deferred_amount' => 'required|numeric',
				]);
				if ($validator->fails()) {
					return $this->responseError($validator->errors(), 400);
				}

				DB::beginTransaction();
				try {
					$relationList = ["verbal_trial", "verbal_trial.type_of_credit.type_of_applicant", "verbal_trial.guarantees"];
					$requestData["creator_id"] = $request->user()->id;
					$requestData["status"] = "waiting";
					$contract->update($requestData);
					$contract->company?->delete();
					$contract->individual_business?->delete();
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
								"contract_id" => $contract->id,
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
								"contract_id" => $contract->id,
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
						if ($requestData["has_pledges"] == "1") {
							$validator = Validator::make($requestData, [
								"pledges" => "required|array|min:1",
								"pledges.*.type" => "required|in:vehicle,stock",
								"pledges.*.comment" => "required|min:2"
							]);
							if ($validator->fails()) {
								return $this->responseError($validator->errors(), 400);
							}
							$contract->pledges()->delete();
							foreach ($requestData["pledges"] as $pledge) {
								Pledge::create([
									"contract_id" => $contract->id,
									"type" => $pledge["type"],
									"comment" => $pledge["comment"],
								]);
							}
							$relationList[] = "pledges";
						}
					}
					$requestData["has_pledges"] = $requestData["has_pledges"] == "1";
					$contract->update($requestData);

					$receiver = $contract->verbal_trial->caf;
					$link = env("APP_URL") . "/contract";
					SendEmail::dispatch(
						$receiver->email,
						"Notification de modification d'un contrat",
						"
						<h1 style='color: #333333;text-align: center; font-size: 24px; margin-bottom: 20px;'>Cher(e)
							$receiver->full_name,</U></h1>
		
						<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application
							cofina credit digital et de prendre en charge immédiatement le contrat en attente de signature par le client: <a
								href='$link'>Consulter les contrats</a></p>
		
						<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations,
							n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>
		
						<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>
		
						<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
						"
					);
					$contract->load($relationList);
				} catch (Exception $e) {
					DB::rollback();
					throw $e;
				}
				DB::commit(); // Valider les opérations
				return $this->responseOk([
					"contract" => $contract
				]);
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
	 * @urlParam	id													  int	 required	L'ID du contrat.														Example: 1
	 *
	 * @response 204
	 */

	public function upload(Request $request, int $id)
	{
		$contract = Contract::find($id);
		if ($contract) {
			if (($authorisation = Gate::inspect('upload', $contract))->allowed()) {
				DB::beginTransaction();
				if ($request->has('signed_contract')) {
					$document_category = "contract";
					$base64Document = $request->input('signed_contract');
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
				$path = 'upload/Contracts/signed_' . $document_category . 's/' . $contract->verbal_trial->committee_id . '-signed.' . $extension;
				Storage::disk("public")->put($path, $documentData);
				$contract->update(["signed_{$document_category}_path" => "/storage/" . $path, "status" => "waiting"]);
				DB::commit();
				$receiver = $contract->verbal_trial->credit_admin;
				$link = env("APP_URL") . "/contract";
				$document_type = ["contract" => "contrat", "promissory_note" => "billet à ordre"][$document_category];
				$pv_commitee_id = $contract->verbal_trial->committee_id;
				if($contract->signed_contract_path && $contract->signed_promissory_note_path){
					SendEmail::dispatch(
						$receiver->email,
						"Notification de chargement de $document_type signé du contrat $pv_commitee_id",
						"
						<h1 style='color: #333333;text-align: center; font-size: 24px; margin-bottom: 20px;'>Cher(e)
							Admin Crédit,</U></h1>
		
						<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application
							cofina credit digital et de valider les documents chargés par le caf du dossier $pv_commitee_id: <a
								href='$link'>Consulter les contrats</a></p>
		
						<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations,
							n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>
		
						<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>
		
						<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
						"
					);
				}
				return $this->responseOk(["contract" => $contract]);
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
		}
	}

	/**
	 * Mettre à jour le statut d'un contrat
	 *
	 * @urlParam	id	  required					int			 L'ID du contrat.										Example: 1
	 *
	 * @bodyParam   status							  string		  Le nouveau statut									   Example: rejected
	 * @bodyParam   comment							 string		  Commentaire du changement							   Example: Trop bas
	 *
	 * @response 200
	 *
	 */
	public function change_status(Request $request, $id)
	{
		$contract = Contract::find($id);
		if ($contract) {
			if (($authorisation = Gate::inspect("change_status", $contract))->allowed()) {
				$requestData = $request->all();
				$validator = Validator::make($requestData, [
					'status' => 'required|in:rejected,validated',
					'comment' => "min:0",
				]);
				if ($validator->fails()) {
					return $this->responseError($validator->errors(), 400);
				} else {
					$receiverList = [
						"caf_list" => [User::find($contract->verbal_trial->caf_id)],
						"credit_admin_list" => [User::find($contract->verbal_trial->credit_admin_id)],
						"credit_analyst_list" => [User::find($contract->verbal_trial->credit_analyst_id)],
						"head_credit_list" => User::where('profile', 'head_credit')->get(),
						"md_list" => User::where('profile', 'md')->get(),
					];
					$mailsDataList = [
						"validated" =>
						[
							[
								"receiverList" => $receiverList["credit_admin_list"],
								"subject" => "Notification de validation du contrat " . $contract->verbal_trial->committee_id,
								"message" => "
											<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher(e) Admin crédit,</U></h1>
	
											<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge immédiatement le contrat" . $contract->verbal_trial->committee_id . "en attente de cat: <a href='" . env("APP_URL") . "/cat/add?id=" . $contract->id . "'>Créer le cat</a></p>
	
											<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>
	
											<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>
	
											<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
										",
							]
						],
						"rejected" =>
						[
							[
								"receiverList" => $receiverList["caf_list"],
								"subject" => "Notifcation de rejet du PV " . $contract->verbal_trial->committee_id,
								"message" => "
											<h1 style='color: #333333; font-size: 24px; margin-bottom: 20px;'>Cher(e) CAF,</h1>
	
											<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
											Nous vous informons que les documents chargés pour le dossier <strong>" . $contract->verbal_trial->committee_id . "</strong> ont été rejetés. Nous vous invitons à vous connecter à l'application Cofina Crédit Digital pour consulter les motifs de rejet et effectuer les actions nécessaires.
											</p>
	
											<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
											Pour accéder directement aux contrats, cliquez sur le lien suivant : <a href='#'>Voir les contrats</a>.
											</p>
	
											<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
											Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous restons à votre disposition pour toute assistance !
											</p>
	
											<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>
	
											<p style='color: #999999; font-size: 12px;'>
											Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.
											</p>
										",
							]
						],
					];
					$mailsData = $mailsDataList[$requestData["status"]];
					foreach ($mailsData as $mailData) {
						foreach ($mailData["receiverList"] as $receiver) {
							SendEmail::dispatch($receiver->email, $mailData["subject"], $mailData["message"]);
						}
					}
					$contract->update([
						"status" => $requestData["status"],
						"status_observation" => $requestData["comment"],
					]);
				}
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => ["Le contrat n'existe pas"]], 404);
		}
	}

	/**
	 * Supprime un contrat
	 *
	 * @urlParam	id													  int	 required	L'ID du contrat.														Example: 1
	 *
	 * @response 204
	 */
	public function destroy(int $id)
	{
		$contract = Contract::find($id);
		if ($contract) {
			if (($authorisation = Gate::inspect('delete', $contract))->allowed()) {
				if ($contract->delete()) {
					return $this->responseOk(messages: ["contract" => "Le contrat a été supprimé"], status: 204);
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
