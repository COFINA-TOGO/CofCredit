<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\CustomResponseTrait;
use App\Jobs\SendEmail;
use App\Models\Guarantee;
use App\Models\User;
use App\Models\VerbalTrial;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpWord\TemplateProcessor;

use Exception;
use Rmunate\Utilities\SpellNumber;

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
	 * @queryParam  committee_id                                            string              Filtrer par ID du procès verbal                                         No-example
	 * @queryParam  committee_date                                          string              Filtrer par date du procès verbal                                       No-example
	 * @queryParam  civility                                                string              Filtrer par civilité                                                    No-example
	 * @queryParam  applicant_first_name                                    string              Filtrer par prénom du demandeur                                         No-example
	 * @queryParam  applicant_last_name                                     string              Filtrer par nom du demandeur                                            No-example
	 * @queryParam  account_number                                          string              Filtrer par numéro de compte                                            No-example
	 * @queryParam  activity                                                string              Filtrer par activé                                                      No-example
	 * @queryParam  purpose_of_financing                                    string              Filtrer par objet du financement                                        No-example
	 * @queryParam  type_of_credit_id                                       int                 Filtrer par ID du type de credit                                        No-example
	 * @queryParam  amount                                                  float               Filtrer par montant                                                     No-example
	 * @queryParam  duration                                                int                 Filtrer par durée en mois                                               No-example
	 * @queryParam  periodicity                                             string              Filtrer par periodicité                                                 No-example
	 * @queryParam  taf                                                     float               Filtrer par TAF                                                         No-example
	 * @queryParam  due_amount                                              float               Filtrer par montant d'une échéance                                      No-example
	 * @queryParam  administrative_fees_percentage                          float               Filtrer par frais de dossier(pourcentage)                               No-example
	 * @queryParam  tax_fee_interest_rate                                   float               Filter par taux d'intérêt hors taxe(%)                                  No-example
	 * @queryParam  caf_id                                                  int                 Filtrer par ID du CAF                                                   No-example
	 * @queryParam  credit_admin_id                                         int                 Filtrer par ID de l'admin credit                                        No-example
	 * @queryParam  credit_analyst_id                                       int                 Filtrer par ID de l'analyste credit                                     No-example
	 * @queryParam  creator_id                                              int                 Filtrer par ID du créateur                                              No-example
	 * @queryParam  has_contract                                            int                 Filtrer par présence de contrat                                         No-example
	 * @queryParam  has_notification                                        int                 Filtrer par présence de notification                                    No-example
	 * @queryParam  has_mortgage                                            int                 Filtrer par présence d'hypothèque                                       No-example
	 * @queryParam  status                                                  string              Filtrer par statut du pv                                                No-example
	 * @queryParam  entity_name                                             string              Filtrer par nom de l'entité                                             No-example
	 * @queryParam  risk_premium_percentage								 	int					Filtrer par prime de risque (en pourcentage) du crédit du demandeur.	No-example
	 *
	 * @queryParam  with_type_of_credit                                     int                 Afficher le type de crédit.                                             Example: 0
	 * @queryParam  with_type_of_applicant                                  int                 Afficher le type de demandeur du type de crédit.                        Example: 1
	 * @queryParam  with_guarantees                                         int                 Afficher les garanties.                                                 Example: 1
	 * @queryParam  with_type_of_guarantees                                 int                 Afficher les types des garanties.                                       Example: 1
	 * @queryParam  with_contract                                           int                 Afficher le contrat.                                                    Example: 1
	 * @queryParam  with_caf                                                int                 Afficher le CAF.                                                        Example: 1
	 * @queryParam  with_credit_amdin                                       int                 Afficher l'admin Credit.                                                Example: 1
	 * @queryParam  with_credit_analyst                                     int                 Afficher l'analyst credit.                                              Example: 1
	 * @queryParam  with_creator                                            int                 Afficher le créateur du pv.                                             Example: 0
	 * @queryParam  paginate                                                int                 Utiliser la pagination.                                                 Example: 0
	 *
	 * @response 200
	 */
	public function index(Request $request)
	{
		if (($authorisation = Gate::inspect('viewAny', VerbalTrial::class))->allowed()) {
			$verbalTrialList = VerbalTrial::query();
			$currentUser = $request->user();
			if ($search = $request->search) {
				$verbalTrialList
					->where(function ($query) use ($search) {
						$query
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
							->orWhere('administrative_fees_percentage', 'LIKE', "%$search%")
							->orWhere('reserve', 'LIKE', "%$search%")
							->orWhere(DB::raw("CONCAT(applicant_first_name, ' ', applicant_last_name)"), 'LIKE', "%$search%");
					});;
			}

			foreach (["committee_id", "committee_date", "civility", "applicant_first_name", "applicant_last_name", "account_number", "activity", "purpose_of_financing", "type_of_credit_id", "amount", "duration", "periodicity", "taf", "due_amount", "administrative_fees_percentage", "caf_id", "credit_admin_id", "credit_analyst_di", "creator_id", "risk_premium_percentage"] as $filter) {
				if (isset($request[$filter]) && $request[$filter] != "") {
					$verbalTrialList->where($filter, $request[$filter]);
				}
			}

			if (isset($request["status"])) {
				$verbalTrialList->where(function ($query) use ($request) {
					foreach (str_split($request["status"]) as $char) {
						if (in_array($char, ['w', 'v', 'r', 'c'])) {
							$query->orWhere("status", ["w" => "waiting", "v" => "validated", "r" => "rejected"][$char]);
						}
					}
				});
			}

			if (isset($request["in_validation_level"])) {
				$verbalTrialList->where(function ($query) use ($request) {
					foreach (str_split($request["in_validation_level"]) as $char) {
						if (in_array($char, ['y', 'a', 'h', 'm'])) {
							$query->orWhere("validation_level", ["y" => "credit_analyst", "a" => "credit_admin", "h" => "head_credit", "m" => "md"][$char]);
						}
					}
				});
			}

			if (isset($request["has_contract"])) {
				$has_contract = (int) $request["has_contract"];
				if ($has_contract == 1) {
					$verbalTrialList->whereHas('contract');
				} else if ($has_contract == 0) {
					$verbalTrialList->whereDoesntHave('contract');
				}
			}

			if (isset($request["has_notification"])) {
				$has_notification = (int) $request["has_notification"];
				if ($has_notification == 1) {
					$verbalTrialList->whereHas('notification');
				} else if ($has_notification == 0) {
					$verbalTrialList->whereDoesntHave('notification');
				}
			}

			if (isset($request["has_next"])) {
				$has_next = (int) $request["has_next"];
				if ($has_next == 1) {
					$verbalTrialList->where(function ($query) {
						$query->whereHas('notification')->orWhereHas('contract');
					});
				} else if ($has_next == 0) {
					$verbalTrialList->whereDoesntHave('notification')->whereDoesntHave('contract');
				}
			}

			if (isset($request["has_mortgage"])) {
				$has_mortgage = (int) $request["has_mortgage"];
				if ($has_mortgage == 1) {
					$verbalTrialList->whereHas('guarantees', function ($query) {
						$query->where('type_of_guarantee_id', 9);
					});
				} else if ($has_mortgage == 0) {
					$verbalTrialList->whereDoesntHave('guarantees', function ($query) {
						$query->where('type_of_guarantee_id', 9);
					});
				}
			}

			foreach (["with_type_of_credit" => "type_of_credit", "with_type_of_applicant" => "type_of_credit.type_of_applicant", "with_guarantees" => "guarantees", "with_type_of_guarantees" => "guarantees.type_of_guarantee", "with_contract" => "contract", "with_caf" => "caf", "with_credit_admin" => "credit_admin", "with_credit_analyst" => "credit_analyst", "with_creator" => "creator"] as $key => $value) {
				if (isset($request[$key]) && $request[$key]) {
					$verbalTrialList->with($value);
				}
			}

			if ($currentUser->profile == "credit_admin") {
				$verbalTrialList->where('credit_admin_id', $currentUser->id);
			}
			if ($currentUser->profile == "credit_analyst") {
				$verbalTrialList->where('credit_analyst_id', $currentUser->id);
			}
			if ($currentUser->profile == "caf") {
				$verbalTrialList->where('caf_id', $currentUser->id);
			}

			if (isset($request["paginate"]) && ($request->paginate == false)) {
				$verbalTrialList = $verbalTrialList->orderByDesc('created_at')->get();
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
	 * @urlParam    id                                                      int required    L'ID du procès verbal.                                          Example: 1
	 *
	 * @queryParam  with_type_of_credit                                     int             Afficher le type de crédit.                                     Example: 0
	 * @queryParam  with_type_of_applicant                                  int             Afficher le type de demandeur du type de crédit.                Example: 1
	 * @queryParam  with_guarantees                                         int             Afficher les garanties.                                         Example: 1
	 * @queryParam  with_type_of_guarantees                                 int             Afficher les types des garanties.                               Example: 1
	 * @queryParam  with_contract                                           int             Afficher le contrat.                                            Example: 1
	 * @queryParam  with_caf                                                int             Afficher le CAF.                                                Example: 1
	 *
	 * @response 200
	 */
	public function show(Request $request, int $id)
	{
		$verbalTrial = VerbalTrial::find($id);
		if ($verbalTrial) {
			if (($authorisation = Gate::inspect('view', $verbalTrial))->allowed()) {
				$suplementList = [];
				foreach (["with_type_of_credit" => "type_of_credit", "with_type_of_applicant" => "type_of_credit.type_of_applicant", "with_guarantees" => "guarantees", "with_type_of_guarantees" => "guarantees.type_of_guarantee", "with_contract" => "contract", "with_caf" => "caf", "with_credit_admin" => "credit_admin", "with_credit_analyst" => "credit_analyst", "with_creator" => "creator"] as $key => $value) {
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
	 * Télécharge la version word d'un PV
	 *
	 * @urlParam    id                                                      int     required    L'ID du PV.                                                         Example: 1
	 *
	 * @response 200
	 */
	public function download(Request $request, int $id)
	{
		$verbal_trial = VerbalTrial::find($id);
		if ($verbal_trial) {
			// if (($authorisation = Gate::inspect('view', $verbalTrial))->allowed()) {
			$pv_dir = $verbal_trial->number_deferred == 0 ? "PVs" : "PVs-deferral";
			$template_path  = "../document_templates/$pv_dir/PV-$verbal_trial->status-$verbal_trial->validation_level.docx";
			$templateProcessor = new TemplateProcessor($template_path);
			$data = $verbal_trial->toArray();
			$data = array_merge($data, collect($verbal_trial->caf)->mapWithKeys(function ($value, $key) {
				return ['caf.' . $key => $value];
			})->all());
			$data = array_merge($data, collect($verbal_trial->credit_analyst)->mapWithKeys(function ($value, $key) {
				return ['credit_analyst.' . $key => $value];
			})->all());
			$data = array_merge($data, collect($verbal_trial->type_of_credit)->mapWithKeys(function ($value, $key) {
				return ['type_of_credit.' . $key => $value];
			})->all());

			$guaranteeList = [];
			foreach ($verbal_trial->guarantees as $guarantee) {
				$tmp = $guarantee->toArray();
				$guaranteeList[] = array_merge($tmp, collect($guarantee->type_of_guarantee)->mapWithKeys(function ($value, $key) {
					return ['type_of_guarantee.' . $key => $value];
				})->all());
			}
			foreach (["head_credit", "md"] as $signatoryProfile) {
				$currentSignatory = User::where('profile', $signatoryProfile)->first();
				if ($currentSignatory) {
					($currentSignatory->signatory_path) ? $templateProcessor->setImageValue($signatoryProfile . "_sign", array("path" => "storage" . $currentSignatory->signatory_path, 'width' => 240, 'height' => 240, 'ratio' => true)) : $templateProcessor->setValue($signatoryProfile . "_sign", "");
				}
			}
			$templateProcessor->cloneBlock('guaranteeList', 0, true, false, $guaranteeList);

			$insuranceList = $verbal_trial->has_insurance ? [["key" => "Prime d’assurance", "value" => "Selon la grille de l’assureur"]] : [];
			$templateProcessor->cloneBlock('insurance', 0, true, false, $insuranceList);

			$data["risk_premium_percentage.value"] = ($data["risk_premium_percentage"] * $data["amount"] / 100);

			$riskPremiumPercentageList = (((float) $data["risk_premium_percentage"]) == 0) ? [] : [["key" => "Prime de risque (" . $data["risk_premium_percentage"] . " %)", "value" => "" . number_format($data["risk_premium_percentage.value"], 0, ',', " ") . " F CFA"]];
			$templateProcessor->cloneBlock('riskPremiumPercentage', 0, true, false, $riskPremiumPercentageList);

			$reviewBonusList = $data["has_line_review_bonus"] ? [["key" => "Prime de révision de ligne", "value" => "1% du capital restant dû après 12 mois"]] : [];
			$templateProcessor->cloneBlock('reviewBonus', 0, true, false, $reviewBonusList);

			$data["created_at"] = Carbon::parse($verbal_trial->created_at)->format("d/m/Y");
			$data["civility.2"] = ["Mr" => "Monsieur", "Mme" => "Madame", "Mlle" => "Madame"][$data["civility"]];
			$data["current_date"] = Carbon::now()->translatedFormat('d F Y');
			$data["administrative_fees_percentage.value"] = number_format((float) $data["administrative_fees_percentage"] * $data["amount"] / 100, 0, ',', ' ');
			$data["amount.fr"] = SpellNumber::value((float) $data["amount"])->locale('fr')->toLetters();
			$data["duration.fr"] = SpellNumber::value((float) $data["duration"])->locale('fr')->toLetters();
			$data["duration.fr"] = SpellNumber::value((float) $data["duration"])->locale('fr')->toLetters();
			$data["periodicity.fr"] = ["mensual" => "Mensuel", "quarterly" => "Trimestrielle", "semi-annual" => "Semestrielle", "annual" => "Annuel", "in-fine" => "A la fin"][$data["periodicity"]];
			$data["periodicity.fr2"] = ["mensual" => "chaque mois", "quarterly" => "chaque trimestre", "semi-annual" => "chaque semestre", "annual" => "chaque année", "in-fine" => "A la fin."][$data["periodicity"]];
			$data["periodicity.fr3"] = ["mensual" => "mensualité", "quarterly" => "trimestre", "semi-annual" => "semestre", "annual" => "année", "in-fine" => "echéance."][$data["periodicity"]];
			$data["amount"] = number_format(((float) $data["amount"]), 0, ',', ' ');

			unset($data["caf.ability_rules"]);
			unset($data["guarantees"]);
			unset($data["credit_analyst.ability_rules"]);
			unset($data["notification"]);
			unset($data["next"]);
			$templateProcessor->setValues($data);
			// return $data;

			// Enregistrez les modifications dans un nouveau fichier
			$bsaseName = "PV-" . $verbal_trial->committee_id;
			$wordFilePath = public_path("generated/docx/" . $bsaseName . ".docx");
			$templateProcessor->saveAs($wordFilePath);
			return Response::file($wordFilePath, ["Content-Type" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document"])->deleteFileAfterSend(true);

			// $outputFilePdfFolderPath = public_path("generated/pdf");
			// $command = sprintf('/usr/bin/libreoffice --headless --convert-to pdf %s --outdir %s', escapeshellarg($wordFilePath), escapeshellarg($outputFilePdfFolderPath));
			// $output = [];
			// $returnVar = 0;
			// exec($command, $output, $returnVar);
			// if ($returnVar === 0) {
			// 	File::delete($wordFilePath);
			// 	return Response::file($outputFilePdfFolderPath . "/" . $bsaseName . ".pdf", ["Content-Type" => "application/pdf"])
			// 		->deleteFileAfterSend(true)
			// 	;
			// }
		} else {
			return $this->responseError(["id" => "Le contrat n'existe pas"], 404);
		}
	}

	public function download_notification(Request $request, int $id)
	{
		$verbal_trial = VerbalTrial::find($id);
		if ($verbal_trial) {
			// if (($authorisation = Gate::inspect('view', $notification))->allowed()) {
			// $template_path = (($verbal_trial->validation_level == "head_credit") && ($verbal_trial->status == "validated")) ? "../document_templates/Notifications/PV-Notification-validated.docx" : "../document_templates/Notifications/PV-Notification.docx";
			$template_path = "../document_templates/Notifications/PV-Notification.docx";
			$templateProcessor = new TemplateProcessor($template_path);
			$data = $verbal_trial->toArray();
			$data = array_merge($data, collect($verbal_trial->type_of_credit)->mapWithKeys(function ($value, $key) {
				return ['type_of_credit.' . $key => $value];
			})->all());
			$data = array_merge($data, collect($verbal_trial->type_of_credit->type_of_applicant)->mapWithKeys(function ($value, $key) {
				return ['type_of_credit.type_of_applicant.' . $key => $value];
			})->all());
			if ($verbal_trial->type == "company") {
				$data = array_merge($data, collect($verbal_trial->company)->mapWithKeys(function ($value, $key) {
					return ['company.' . $key => $value];
				})->all());
			} elseif ($verbal_trial->type == "individual_business") {
				$data = array_merge($data, collect($verbal_trial->individual_business)->mapWithKeys(function ($value, $key) {
					return ['individual_business.' . $key => $value];
				})->all());
			}

			//$data["insurance_premium"] = number_format(((float) $data["insurance_premium"]), 0, ',', ' ');

			$guaranteeList = [];
			foreach ($verbal_trial->guarantees as $guarantee) {
				$tmp = $guarantee->toArray();
				$guaranteeList[] = array_merge($tmp, collect($guarantee->type_of_guarantee)->mapWithKeys(function ($value, $key) {
					return ['type_of_guarantee.' . $key => $value];
				})->all());
			}
			$currentSignatory = User::where('profile', "head_credit")->first();
			if ($currentSignatory) {
				($currentSignatory->signatory_path) ? $templateProcessor->setImageValue("head_credit_sign", array("path" => "storage" . $currentSignatory->signatory_path, 'width' => 240, 'height' => 240, 'ratio' => true)) : $templateProcessor->setValue("head_credit_sign", "");
			}
			$templateProcessor->cloneBlock('guaranteeList', 0, true, false, $guaranteeList);

			$insuranceList = $verbal_trial->has_insurance ? [["key" => "Prime d’assurance", "value" => "Selon la grille de l’assureur"]] : [];
			$templateProcessor->cloneBlock('insurance', 0, true, false, $insuranceList);

			$data["risk_premium_percentage.value"] = ($data["risk_premium_percentage"] * $data["amount"] / 100);

			$riskPremiumPercentageList = (((float) $data["risk_premium_percentage"]) == 0) ? [] : [["key" => "Prime de risque (" . $data["risk_premium_percentage"] . " %)", "value" => "" . number_format($data["risk_premium_percentage.value"], 0, ',', " ") . " F CFA"]];
			$templateProcessor->cloneBlock('riskPremiumPercentage', 0, true, false, $riskPremiumPercentageList);

			$reviewBonusList = $data["has_line_review_bonus"] ? [["key" => "Prime de révision de ligne", "value" => "1% du capital restant dû après 12 mois"]] : [];
			$templateProcessor->cloneBlock('reviewBonus', 0, true, false, $reviewBonusList);

			$data["ht_rate"] = "17";
			$data["civility.2"] = ["Mr" => "Monsieur", "Mme" => "Madame", "Mlle" => "Madame"][$data["civility"]];
			$data["current_date"] = Carbon::now()->translatedFormat('d F Y');
			$data["administrative_fees_percentage.value"] = number_format((float) $data["administrative_fees_percentage"] * $data["amount"] / 100, 0, ',', ' ');
			$data["amount.fr"] = SpellNumber::value((float) $data["amount"])->locale('fr')->toLetters();
			$data["duration.fr"] = SpellNumber::value((float) $data["duration"])->locale('fr')->toLetters();
			$data["duration.fr"] = SpellNumber::value((float) $data["duration"])->locale('fr')->toLetters();
			$data["periodicity.fr"] = ["mensual" => "Mensuel", "quarterly" => "Trimestrielle", "semi-annual" => "Semestrielle", "annual" => "Annuel", "in-fine" => "A la fin"][$data["periodicity"]];
			$data["periodicity.fr2"] = ["mensual" => "chaque mois", "quarterly" => "chaque trimestre", "semi-annual" => "chaque semestre", "annual" => "chaque année", "in-fine" => "A la fin."][$data["periodicity"]];
			$data["periodicity.fr3"] = ["mensual" => "mensualité", "quarterly" => "trimestre", "semi-annual" => "semestre", "annual" => "année", "in-fine" => "echéance."][$data["periodicity"]];
			$data["amount"] = number_format(((float) $data["amount"]), 0, ',', ' ');
			
			$data["representator"] = $data["applicant_first_name"] . " " . $data["applicant_last_name"] == $data["entity_name"] ? "" : " représenté par " . $data["civility.2"] . " " . $data["applicant_first_name"] . " " . $data["applicant_last_name"];

			unset($data["observations"]);
			unset($data["guarantors"]);
			unset($data["next"]);
			unset($data["guarantees"]);
			unset($data["notification"]);
			unset($data["contract"]);
			$templateProcessor->setValues($data);

			$bsaseName = "Contrat-" . $verbal_trial->committee_id;
			$wordFilePath = public_path($bsaseName . ".docx");
			$templateProcessor->saveAs($wordFilePath);
			return Response::file($wordFilePath, ["Content-Type" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document"])->deleteFileAfterSend(true);
			
			// $outputFilePdfFolderPath = public_path("generated/pdf");
			// $command = sprintf('/usr/bin/libreoffice --headless --convert-to pdf %s --outdir %s', escapeshellarg($wordFilePath), escapeshellarg($outputFilePdfFolderPath));
			// $output = [];
			// $returnVar = 0;
			// exec($command, $output, $returnVar);
			// // Vérification du succès
			// if ($returnVar === 0) {
			// 	File::delete($wordFilePath);
			// 	return Response::file($outputFilePdfFolderPath . "/" . $bsaseName . ".pdf", ["Content-Type" => "application/pdf"])->deleteFileAfterSend(true);
			// }
		} else {
			return $this->responseError(["id" => "La notification n'existe pas"], 404);
		}
	}

	/**
	 * Créer un nouveau procès verbal
	 *
	 * @bodyParam   committee_id                        string          L'ID comitée venant de créditFlow                       				Example: CFNTG-044-13-12-23-01212
	 * @bodyParam   committee_date                      string          La date du comitée                                      				Example: 2024-02-09
	 * @bodyParam   civility                            string          La Civilité                                             				Example: Mr
	 * @bodyParam   applicant_first_name                string          Le prénom du demandeur                                  				Example: Cesar
	 * @bodyParam   applicant_last_name                 string          Le nom du demandeur                                     				Example: Endure
	 * @bodyParam   account_number                      string          Le numéro de compte                                     				Example: 012345678901
	 * @bodyParam   activity                            string          L'activé                                                				Example: Homme d'affaire
	 * @bodyParam   purpose_of_financing                string          L'objet du financement                                  				Example: Achat nouveau locaux
	 * @bodyParam   type_of_credit_id                   int             L'ID du type de credit                                  				Example: 1
	 * @bodyParam   amount                              float           Le montant                                              				Example: 10000000
	 * @bodyParam   duration                            int             La durée en mois                                        				Example: 12
	 * @bodyParam   periodicity                         string          La periodicité                                          				Example: mensual
	 * @bodyParam   taf                                 float           La TAF(%)                                               				Example: 10
	 * @bodyParam   administrative_fees_percentage      float           Les frais de dossier(%)                                 				Example: 2.5
	 * @bodyParam   tax_fee_interest_rate               float           Le taux d'intérêt hors taxe(%)                          				Example: 10
	 * @bodyParam   caf_id                              int             L'ID du CAF                                             				Example: 4
	 * @bodyParam   credit_admin_id                     int             L'ID de l'admin credit                                  				Example: 4
	 * @bodyParam   credit_analyst_id                   int             L'ID de l'analyste credit                               				Example: 4
	 * @bodyParam   reserve                             string          La reserve de l'analyste credit                         				Example: RAS
	 * @bodyParam   entity_name                         string          Le nom de l'entité                                      				Example: ETS Cling
	 * @bodyParam   release_type                        string          Le type de deblocage                                    				Example: progressive
	 * @bodyParam   risk_premium_percentage				int				La prime de risque (en pourcentage) du crédit du demandeur.				Example: 2
	 * @bodyParam   has_line_review_bonus				int				Présence de la ligne de revision de ligne.								Example: 0
	 * @bodyParam   has_insurance						int				Présence d'assurance.													Example: 1
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
				'administrative_fees_percentage' => 'required|numeric',
				'tax_fee_interest_rate' => 'required|numeric',
				'caf_id' => 'required|exists:users,id',
				'credit_admin_id' => 'required|exists:users,id',
				'credit_analyst_id' => 'required|exists:users,id',
				"guarantees" => "array",
				"guarantees.*.type_of_guarantee_id" => "required|exists:types_of_guarantee,id",
				"guarantees.*.comment" => "required|min:2",
				"release_type" => "required|in:non-progressive,progressive",
				'risk_premium_percentage' => 'required|numeric',
				'has_line_review_bonus' => 'required|boolean',
				'number_deferred' => 'required|numeric',
				'has_insurance' => 'required|boolean',
				'representative_phone_number' => 'required',
			]);
			if ($validator->fails()) {
				return $this->responseError($validator->errors(), 400);
			} else {
				if (User::where("profile", "credit_admin")->where('id', $requestData["credit_admin_id"])->exists()) {
					if (User::where("profile", "caf")->where('id', $requestData["caf_id"])->exists()) {
						DB::beginTransaction();
						try {
							$requestData["creator_id"] = $request->user()->id;
							$requestData["validation_level"] = "credit_analyst";
							if (!isset($requestData["entity_name"])) {
								$requestData["entity_name"] = $requestData["applicant_first_name"] . " " . $requestData["applicant_last_name"];
							}
							$verbalTrial = VerbalTrial::create($requestData);
							if (isset($requestData["guarantees"])) {
								$guaranteesCollection = new Collection($requestData["guarantees"]);
								if (
									$guaranteesCollection->contains(function ($objet) {
										return $objet["type_of_guarantee_id"] === 9;
									})
								) {
									$verbalTrial->update(["has_mortgage" => true]);
								}
								foreach ($requestData["guarantees"] as $guarantee) {
									Guarantee::create([
										"verbal_trial_id" => $verbalTrial->id,
										"type_of_guarantee_id" => $guarantee["type_of_guarantee_id"],
										"comment" => $guarantee["comment"]
									]);
								}
							}
							$link = env("APP_URL") . "/pv/notification/without-pv";
							SendEmail::dispatch(
								$verbalTrial->credit_analyst->email,
								"Notification de mise en place d'une notification " . $verbalTrial->committee_id,
								"
										<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher(e) Analyste,</U></h1>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge immédiatement la notification $verbalTrial->committee_id en attente de validation: <a href='$link'>Voir les notifications</a></p>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>

										<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>

										<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
									"
							);
						} catch (Exception $e) {
							DB::rollback();
							throw $e;
						}
						DB::commit(); // Valider les opérations

						$verbalTrial->load(["type_of_credit.type_of_applicant", "guarantees", "caf"]);
						return $this->responseOk([
							"verbalTrial" => $verbalTrial
						], status: 201);
					} else {
						return $this->responseError(["caf_id" => ["Le CAF n'existe pas"]], 404);
					}
				} else {
					return $this->responseError(["credit_admin_id" => ["L'admin crédit n'existe pas"]], 404);
				}
			}
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}

	/**
	 * Mettre à jour un procès verbal
	 *
	 * @urlParam 	id 									int 			L'ID du procès verbal. 													Example: 1
	 *
	 * @bodyParam   committee_id                        string          L'ID comitée venant de créditFlow                       				Example: CFNTG-044-13-12-23-01212
	 * @bodyParam   committee_date                      string          La date du comitée                                      				Example: 2024-02-09
	 * @bodyParam   civility                            string          La Civilité                                             				Example: Mr
	 * @bodyParam   applicant_first_name                string          Le prénom du demandeur                                  				Example: Cesar
	 * @bodyParam   applicant_last_name                 string          Le nom du demandeur                                     				Example: Endure
	 * @bodyParam   account_number                      string          Le numéro de compte                                     				Example: 012345678901
	 * @bodyParam   activity                            string          L'activé                                                				Example: Homme d'affaire
	 * @bodyParam   purpose_of_financing                string          L'objet du financement                                  				Example: Achat nouveau locaux
	 * @bodyParam   type_of_credit_id                   int             L'ID du type de credit                                  				Example: 1
	 * @bodyParam   amount                              float           Le montant                                              				Example: 10000000
	 * @bodyParam   duration                            int             La durée en mois                                        				Example: 12
	 * @bodyParam   periodicity                         string          La periodicité                                          				Example: mensual
	 * @bodyParam   taf                                 float           La TAF(%)                                               				Example: 10
	 * @bodyParam   administrative_fees_percentage      float           Les frais de dossier(%)                                 				Example: 2.5
	 * @bodyParam   tax_fee_interest_rate               float           Le taux d'intérêt hors taxe(%)                          				Example: 10
	 * @bodyParam   caf_id                              int             L'ID du CAF                                             				Example: 4
	 * @bodyParam   credit_admin_id                     int             L'ID de l'admin credit                                  				Example: 4
	 * @bodyParam   credit_analyst_id                   int             L'ID de l'analyste credit                               				Example: 4
	 * @bodyParam   reserve                             string          La reserve de l'analyste credit                         				Example: RAS
	 * @bodyParam   entity_name                         string          Le nom de l'entité                                      				Example: ETS Cling
	 * @bodyParam   release_type                        string          Le type de deblocage                                    				Example: progressive
	 * @bodyParam   risk_premium_percentage				int				La prime de risque (en pourcentage) du crédit du demandeur.				Example: 2
	 * @bodyParam   has_line_review_bonus				int				Présence de la ligne de revision de ligne.								Example: 0
	 * @bodyParam   has_insurance						int				Présence d'assurance.													Example: 1
	 *
	 * @response 200
	 *
	 */
	public function update(Request $request, int $id)
	{
		$connectedUser = $request->user();
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
					'administrative_fees_percentage' => 'required|numeric',
					'tax_fee_interest_rate' => 'required|numeric',
					'caf_id' => 'required|exists:users,id',
					'credit_admin_id' => 'required|exists:users,id',
					'credit_analyst_id' => 'required|exists:users,id',
					"guarantees" => "array",
					"guarantees.*.type_of_guarantee_id" => "required|exists:types_of_guarantee,id",
					"guarantees.*.comment" => "required|min:2",
					"release_type" => "required|in:non-progressive,progressive",
					'risk_premium_percentage' => 'required|numeric',
					'has_line_review_bonus' => 'required|boolean',
					'number_deferred' => 'required|numeric',
					'has_insurance' => 'required|boolean',
					'representative_phone_number' => 'required',
				]);
				if ($validator->fails()) {
					return $this->responseError($validator->errors(), 400);
				} else {
					if (User::where("profile", "credit_admin")->where('id', $requestData["credit_admin_id"])->exists()) {
						if (User::where("profile", "caf")->where('id', $requestData["caf_id"])->exists()) {
							DB::beginTransaction();
							try {
								$requestData["creator_id"] = $request->user()->id;
								$requestData["validation_level"] = $connectedUser->profile == 'caf' ? "credit_analyst" : "credit_admin";
								$verbalTrial->guarantees()->delete();
								if (!isset($requestData["entity_name"])) {
									$requestData["entity_name"] = $requestData["applicant_first_name"] . " " . $requestData["applicant_last_name"];
								}

								if (isset($requestData["guarantees"])) {
									$guaranteesCollection = new Collection($requestData["guarantees"]);
									$requestData["has_mortgage"] = $guaranteesCollection->contains(function ($objet) {
										return $objet["type_of_guarantee_id"] === 9;
									});
									foreach ($requestData["guarantees"] as $guarantee) {
										Guarantee::create([
											"verbal_trial_id" => $verbalTrial->id,
											"type_of_guarantee_id" => $guarantee["type_of_guarantee_id"],
											"comment" => $guarantee["comment"]
										]);
									}
								}
								$requestData["status"] = "waiting";
								$requestData["has_line_review_bonus"] = (bool) $requestData["has_line_review_bonus"];
								$verbalTrial->update($requestData);
								$link = env("APP_URL") . "/pv";
								if($connectedUser->profile == "caf"){
									SendEmail::dispatch(
										$verbalTrial->credit_analyst->email,
										"Notification de mise à jour de la notification " . $verbalTrial->committee_id,
										"
												<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher(e) Analyste,</U></h1>
	
												<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge immédiatement la notification $verbalTrial->committee_id en attente de vérification: <a href='" . env("APP_URL") . "/pv/notification/without-pv" . "'>Voir les notifications</a></p>
	
												<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>
	
												<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>
	
												<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
											"
									);
								}else if($connectedUser->profile == "credit_analyst"){
									SendEmail::dispatch(
										$verbalTrial->credit_admin->email,
										"Notification de mise à jour du PV " . $verbalTrial->committee_id,
										"
												<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher(e) Admin crédit,</U></h1>
	
												<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge immédiatement le PV $verbalTrial->committee_id en attente de validation: <a href='/pv'>Voir les pvs</a></p>
	
												<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>
	
												<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>
	
												<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
											"
									);
								}
							} catch (\Exception $e) {
								DB::rollback();
								throw $e;
							}
							DB::commit(); // Valider les opérations
							$verbalTrial->load(["type_of_credit.type_of_applicant", "guarantees", "contract", "caf"]);
							return $this->responseOk([
								"verbalTrial" => $verbalTrial
							]);
						} else {
							return $this->responseError(["caf_id" => ["Le CAF n'existe pas"]], 404);
						}
					} else {
						return $this->responseError(["credit_admin_id" => ["L'admin crédit n'existe pas"]], 404);
					}
				}
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "Le procès verbal n'existe pas"], 404);
		}
	}

	public function check(Request $request, int $id)
	{
		$verbalTrial = VerbalTrial::find($id);
		if ($verbalTrial) {
			if (($authorisation = Gate::inspect('check_notification', $verbalTrial))->allowed()) {
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
					'administrative_fees_percentage' => 'required|numeric',
					'tax_fee_interest_rate' => 'required|numeric',
					'caf_id' => 'required|exists:users,id',
					'credit_admin_id' => 'required|exists:users,id',
					'credit_analyst_id' => 'required|exists:users,id',
					"guarantees" => "array",
					"guarantees.*.type_of_guarantee_id" => "required|exists:types_of_guarantee,id",
					"guarantees.*.comment" => "required|min:2",
					"release_type" => "required|in:non-progressive,progressive",
					'risk_premium_percentage' => 'required|numeric',
					'has_line_review_bonus' => 'required|boolean',
					'number_deferred' => 'required|numeric',
					'has_insurance' => 'required|boolean',
					'action' => "required|in:validate,reject",
					'comment' => "nullable|min:1",
					'representative_phone_number' => 'required',
				]);
				if ($validator->fails()) {
					return $this->responseError($validator->errors(), 400);
				} else {
					if ($requestData["action"] == "reject") {
						$verbalTrial->update(["status" => "rejected", "comment" => $requestData["comment"]]);
						SendEmail::dispatch($verbalTrial->caf->email, "Rejet de la notification " . $verbalTrial->committee_id, "
							<h1 style='color: #333333; font-size: 24px; margin-bottom: 20px;'>Cher(e) CAF,</h1>

							<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
							Nous vous informons que la notification <strong>" . $verbalTrial->committee_id . "</strong> a été rejeté lors de sa validation. Nous vous invitons à vous connecter à l'application Cofina Crédit Digital pour consulter les motifs de rejet et effectuer les actions nécessaires.
							</p>

							<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
							Pour accéder directement aux notifications, cliquez sur le lien suivant : <a href='" . env("APP_URL") . "/pv/notification/without-pv" . "'>Voir les notifications</a>.
							</p>

							<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
							Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous restons à votre disposition pour toute assistance !
							</p>

							<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>

							<p style='color: #999999; font-size: 12px;'>
							Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.
							</p>
						");
						return $this->responseOk([
							"verbalTrial" => $verbalTrial
						]);
					} else {
						if (User::where("profile", "credit_admin")->where('id', $requestData["credit_admin_id"])->exists()) {
							if (User::where("profile", "caf")->where('id', $requestData["caf_id"])->exists()) {
								DB::beginTransaction();
								try {
									$requestData["creator_id"] = $request->user()->id;
									$requestData["validation_level"] = "credit_admin";
									$verbalTrial->guarantees()->delete();
									if (!isset($requestData["entity_name"])) {
										$requestData["entity_name"] = $requestData["applicant_first_name"] . " " . $requestData["applicant_last_name"];
									}

									if (isset($requestData["guarantees"])) {
										$guaranteesCollection = new Collection($requestData["guarantees"]);
										$requestData["has_mortgage"] = $guaranteesCollection->contains(function ($objet) {
											return $objet["type_of_guarantee_id"] === 9;
										});
										foreach ($requestData["guarantees"] as $guarantee) {
											Guarantee::create([
												"verbal_trial_id" => $verbalTrial->id,
												"type_of_guarantee_id" => $guarantee["type_of_guarantee_id"],
												"comment" => $guarantee["comment"]
											]);
										}
									}
									$requestData["status"] = "waiting";
									$requestData["has_line_review_bonus"] = (bool) $requestData["has_line_review_bonus"];
									$verbalTrial->update($requestData);
									SendEmail::dispatch(
										$verbalTrial->caf->email,
										"Notification de validation de notification " . $verbalTrial->committee_id,
										"
												<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher CAF,</U></h1>
	
												<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Votre Notification $verbalTrial->committee_id a été validé par l'analyste crédit</p>
	
												<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>
	
												<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>
	
												<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
											"
									);
									$link = env("APP_URL") . "/pv";

									SendEmail::dispatch(
										$verbalTrial->credit_admin->email,
										"Notification de création de PV " . $verbalTrial->committee_id,
										"
											<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher(e) Admin crédit,</U></h1>

											<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge immédiatement le PV $verbalTrial->committee_id en attente de validation: <a href='$link'>Voir les pvs</a></p>

											<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>

											<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>

											<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
										"
									);
								} catch (\Exception $e) {
									DB::rollback();
									throw $e;
								}
								DB::commit(); // Valider les opérations
								$verbalTrial->load(["type_of_credit.type_of_applicant", "guarantees", "contract", "caf"]);
								return $this->responseOk([
									"verbalTrial" => $verbalTrial
								]);
							} else {
								return $this->responseError(["caf_id" => ["Le CAF n'existe pas"]], 404);
							}
						} else {
							return $this->responseError(["credit_admin_id" => ["L'admin crédit n'existe pas"]], 404);
						}
					}
				}
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "Le procès verbal n'existe pas"], 404);
		}
	}

	/**
	 * Mettre à jour le statut d'un procès verbal
	 *
	 * @urlParam    id      required                    int             L'ID du procès verbal.                                  Example: 1
	 *
	 * @bodyParam   status                              string          Le nouveau statut                                       Example: rejected
	 * @bodyParam   comment                             string          Commentaire du changement                               Example: Trop bas
	 *
	 * @response 200
	 *
	 */
	public function change_status(Request $request, $id)
	{
		$verbalTrial = VerbalTrial::find($id);
		if ($verbalTrial) {
			if (($authorisation = Gate::inspect("change_status", $verbalTrial))->allowed()) {
				$requestData = $request->all();
				$validator = Validator::make($requestData, [
					'status' => 'required|in:rejected,validated',
					'comment' => "min:0",
				]);
				if ($validator->fails()) {
					return $this->responseError($validator->errors(), 400);
				} else {
					$requestData = $validator->validated();
					$connectedUser = User::find($request->user()->id);
					if ($requestData["status"] == "validated") {
						$requestData["validation_level"] = [
							"credit_admin" => "head_credit",
							"head_credit" => "head_credit",
							"md" => "md",
						][$connectedUser->profile];
						$requestData["status"] = ($connectedUser->profile == "head_credit") ? "validated" : "waiting";
					} else if ($requestData["status"] == "rejected") {
						$requestData["validation_level"] = $connectedUser->profile;
					}
					$verbalTrial->update($requestData);
					$receiverList = [
						"caf_list" => [User::find($verbalTrial->caf_id)],
						"credit_admin_list" => [User::find($verbalTrial->credit_admin_id)],
						"credit_analyst_list" => [User::find($verbalTrial->credit_analyst_id)],
						"head_credit_list" => User::where('profile', 'head_credit')->get(),
						"md_list" => User::where('profile', 'md')->get(),
					];
					$nextStep = $verbalTrial->has_mortgage ? "notification" : "contrat";
					$nextStepName = $verbalTrial->has_mortgage ? "la notification" : "le contrat";
					$nextStepLink = $verbalTrial->has_mortgage ? "notification" : "contract";
					$mailsDataList = [
						"validated" => [
							"head_credit" => [
								[
									"receiverList" => $receiverList["credit_admin_list"],
									"subject" => "Notification de validation du PV " . $verbalTrial->committee_id,
									"message" => "
										<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher(e) Admin crédit,</U></h1>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge le PV $verbalTrial->committee_id en attente de $nextStep: <a href='" . env("APP_URL") . "/$nextStepLink/add?id=" . $verbalTrial->id . "'>Créer $nextStepName</a></p>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>

										<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>

										<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
									",
								]
							]
						],
						"waiting" => [
							"md" => [
								[
									"receiverList" => $receiverList["md_list"],
									"subject" => "Notification de validation du PV " . $verbalTrial->committee_id,
									"message" => "
										<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher MD,</U></h1>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge le PV $verbalTrial->committee_id en attente de validation: <a href='" . env("APP_URL") . "/pv" . "'>Voir les pvs</a></p>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>

										<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>

										<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
									",
								]
							],
							"head_credit" => [
								[
									"receiverList" => $receiverList["head_credit_list"],
									"subject" => "Notification de validation du PV " . $verbalTrial->committee_id,
									"message" => "
										<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher Head Credit,</U></h1>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge le PV $verbalTrial->committee_id en attente de validation: <a href='" . env("APP_URL") . "/pv" . "'>Voir les pvs</a></p>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>

										<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>

										<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
									",
								]
							],
							"credit_admin" => [
								[
									"receiverList" => $receiverList["head_credit_list"],
									"subject" => "Notifcation de validation du PV " . $verbalTrial->committee_id,
									"message" => "
										<h1 style='color: #333333;font-size: 24px; margin-bottom: 20px;'>Cher(e) Admin crédit,</U></h1>
			
										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Nous vous prions de vous connecter à l'application cofina credit digital et de prendre en charge immédiatement le PV $verbalTrial->committee_id en attente de validation: <a href='" . env("APP_URL") . "/pv" . "'>Voir les pvs</a></p>
			
										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>
			
										<hr style='border: none; border-top: 1px solid #dddddd; margin: 20px 0;'>
			
										<p style='color: #999999; font-size: 12px;'>Cet e-mail est généré automatiquement. Veuillez ne pas y répondre.</p>
									",
								]
							],
						],
						"rejected" => [
							"md" => [
								[
									"receiverList" => $receiverList["credit_analyst_list"],
									"subject" => "Notifcation de rejet du PV " . $verbalTrial->committee_id,
									"message" => "
										<h1 style='color: #333333; font-size: 24px; margin-bottom: 20px;'>Cher(e) Analyste Crédit,</h1>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
										Nous vous informons que le PV <strong>" . $verbalTrial->committee_id . "</strong> a été rejeté. Nous vous invitons à vous connecter à l'application Cofina Crédit Digital pour consulter les motifs de rejet et effectuer les actions nécessaires.
										</p>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
										Pour accéder directement aux PVs, cliquez sur le lien suivant : <a href='" . env("APP_URL") . "/pv" . "'>Voir les PV</a>.
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
							"head_credit" => [
								[
									"receiverList" => $receiverList["credit_analyst_list"],
									"subject" => "Notifcation de rejet du PV " . $verbalTrial->committee_id,
									"message" => "
										<h1 style='color: #333333; font-size: 24px; margin-bottom: 20px;'>Cher(e) Analyste Crédit,</h1>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
										Nous vous informons que le PV <strong>" . $verbalTrial->committee_id . "</strong> a été rejeté lors de sa validation. Nous vous invitons à vous connecter à l'application Cofina Crédit Digital pour consulter les motifs de rejet et effectuer les actions nécessaires.
										</p>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
										Pour accéder directement aux PVs, cliquez sur le lien suivant : <a href='" . env("APP_URL") . "/pv" . "'>Voir les PV</a>.
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
							"credit_admin" => [
								[
									"receiverList" => $receiverList["credit_analyst_list"],
									"subject" => "Notifcation de rejet du PV " . $verbalTrial->committee_id,
									"message" => "
										<h1 style='color: #333333; font-size: 24px; margin-bottom: 20px;'>Cher(e) Analyste Crédit,</h1>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
										Nous vous informons que le PV <strong>" . $verbalTrial->committee_id . "</strong> a été rejeté lors de sa validation. Nous vous invitons à vous connecter à l'application Cofina Crédit Digital pour consulter les motifs de rejet et effectuer les actions nécessaires.
										</p>

										<p style='color: #666666; font-size: 16px; line-height: 1.5;'>
										Pour accéder directement aux PVs, cliquez sur le lien suivant : <a href='" . env("APP_URL") . "/pv" . "'>Voir les PV</a>.
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
						],
					];
					$mailsData = $mailsDataList[$requestData["status"]][$requestData["validation_level"]];
					foreach ($mailsData as $mailData) {
						foreach ($mailData["receiverList"] as $receiver) {
							SendEmail::dispatch($receiver->email, $mailData["subject"], $mailData["message"]);
						}
					}
					return $verbalTrial;
				}
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => ["Le CAT n'existe pas"]], 404);
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

	public function analyst_destroy(int $id)
	{
		$verbalTrial = VerbalTrial::find($id);
		if ($verbalTrial) {
			if (($authorisation = Gate::inspect('analyst_delete', $verbalTrial))->allowed()) {
				$verbalTrial->update(["status" => "rejected", "validation_level" => "credit_analyst"]);
				return $this->responseOk([
					"verbalTrial" => $verbalTrial
				]);
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => ["Le pv n'existe pas"]], 404);
		}
	}
}
