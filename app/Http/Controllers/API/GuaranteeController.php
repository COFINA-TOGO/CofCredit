<?php

namespace App\Http\Controllers\API;

use App\Exports\QueryGuarantee;
use App\Http\Controllers\Controller;
use App\Models\Guarantee;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Maatwebsite\Excel\Facades\Excel;


/**
 * @group Garantie
 *
 * EndPoints pour gérer les garanties renseignées au niveau des procès verbaux
 */
class GuaranteeController extends Controller
{

	/**
	 * Affiche les garanties
	 *
	 * @queryParam  verbal_trial_id             int     Filtrer par ID du procès verbal.                No-example
	 * @queryParam  type_of_guarantee_id        int     Filtrer par ID du type de garantie.             No-example
	 * @queryParam  comment                     string  Filtrer par commentaire.                        No-example
	 *
	 * @queryParam  with_verbal_trial           int     Afficher le procès verbal.                      Example: 0
	 * @queryParam  with_type_of_guarantee      int     Afficher le type de garantie.                   Example: 0
	 * @queryParam  paginate                    int     Utiliser la pagination.                         Example: 0
	 *
	 * @response 200
	 */
	public function index(Request $request)
	{
		if (($authorisation = Gate::inspect('viewAny', Guarantee::class))->allowed()) {
			$guaranteeList = Guarantee::query();
			if ($search = $request->search) {
				$guaranteeList
					->where(function ($query) use ($search) {
						$query
							->where('comment', 'LIKE', "%$search%")
							->orWhereHas('type_of_guarantee', function ($subQuery) use ($search) {
								$subQuery->where('name', 'LIKE', "%$search%");
							})
							->orWhereHas('verbal_trial', function ($subQuery) use ($search) {
								$subQuery
									->where('committee_id', 'LIKE', "%$search%")
									->orWhere('applicant_first_name', 'LIKE', "%$search%")
									->orWhere('applicant_last_name', 'LIKE', "%$search%");
							});
					});
			}

			foreach (["verbal_trial_id", "type_of_guarantee_id", "comment"] as $filter) {
				if (isset($request[$filter]) && $request[$filter]) {
					$guaranteeList->where($filter, $request[$filter]);
				}
			}

			foreach (["with_verbal_trial" => "verbal_trial", "with_type_of_guarantee" => "type_of_guarantee"] as $key => $value) {
				if (isset($request[$key]) && $request[$key]) {
					$guaranteeList->with($value);
				}
			}

			if (isset($request["paginate"]) && ($request->paginate == false)) {
				$guaranteeList = $guaranteeList->orderByDesc('created_at')->get();
				$data = ["data" => $guaranteeList, "total" => count($guaranteeList)];
			} else {
				$data = $guaranteeList->orderByDesc('created_at')->paginate(8)->toArray();
			}

			return $this->responseOkPaginate($data);
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}

	/**
	 * Affiche une garantie
	 *
	 * @urlParam    id                          int required    L'ID de la garantie.            Example: 1
	 *
	 * @queryParam  with_verbal_trial           int             Afficher le procès verbal.      Example: 0
	 * @queryParam  with_type_of_guarantee      int             Afficher le type de garantie.   Example: 0
	 *
	 * @response 200
	 */
	public function show(Request $request, int $id)
	{
		$guarantee = Guarantee::find($id);
		if ($guarantee) {
			if (($authorisation = Gate::inspect('view', $guarantee))->allowed()) {
				$suplementList = [];
				foreach (["with_verbal_trial" => "verbal_trial", "with_type_of_guarantee" => "type_of_guarantee"] as $key => $value) {
					if (isset($request[$key]) && $request[$key]) {
						$suplementList[] = $value;
					}
				}
				$guarantee->load($suplementList);
				return $this->responseOk(["guarantee" => $guarantee]);
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => ["La garantie n'existe pas"]], 404);
		}
	}

	/**
	 * Exporter les garanties
	 *
	 * @response 200
	 */
	public function export(Request $request)
	{
		if (($authorisation = Gate::inspect('downloadAny', Guarantee::class))->allowed()) {
			$date = Carbon::now()->format('d-m-Y_H-i-s');
			return Excel::download(new QueryGuarantee(), "garanties-($date).xlsx");
		}

		return $this->responseError(["auth" => [$authorisation->message()]], 403);
	}
}
