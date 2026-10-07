<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\CAT;
use App\Models\Contract;
use App\Models\Notification;
use App\Models\VerbalTrial;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ActivityController extends Controller
{
	/**
	 * Historique d'un dossier : le PV, et le contrat, la notification et le CAT qui en découlent
	 *
	 * @queryParam  subject  string  required  verbal-trial, contract, notification ou cat  Example: verbal-trial
	 * @queryParam  id       int     required  L'ID du dossier                              Example: 1
	 */
	public function index(Request $request)
	{
		$class = Relation::getMorphedModel((string) $request->subject);
		$model = $class ? $class::find($request->id) : null;
		if (!$model) {
			return $this->responseError(["id" => ["Le dossier n'existe pas"]], 404);
		}
		if (!($authorisation = Gate::inspect("view", $model))->allowed()) {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}

		$subjects = $this->dossier($model);
		$activities = Activity::with(["user", "on_behalf_of"])
			->where(function ($query) use ($subjects) {
				foreach ($subjects as $subject) {
					$query->orWhere(fn($query) => $query->where("subject_type", $subject->getMorphClass())->where("subject_id", $subject->getKey()));
				}
			})
			->orderByDesc("id")
			->get();

		return $this->responseOk(["activities" => $activities]);
	}

	/**
	 * Les pièces d'un même dossier, à partir de n'importe laquelle
	 * @return	\Illuminate\Database\Eloquent\Model[]
	 */
	private function dossier($model): array
	{
		$verbalTrial = match (true) {
			$model instanceof VerbalTrial => $model,
			$model instanceof Contract, $model instanceof Notification => $model->verbal_trial,
			$model instanceof CAT => $model->contract?->verbal_trial ?? $model->notification?->verbal_trial,
			default => null,
		};
		if (!$verbalTrial) {
			return [$model];
		}

		return collect([$verbalTrial, $verbalTrial->contract, $verbalTrial->notification, $verbalTrial->contract?->c_a_t, $verbalTrial->notification?->c_a_t, $model])
			->filter()
			->unique(fn($subject) => $subject->getMorphClass() . $subject->getKey())
			->values()
			->all();
	}
}
