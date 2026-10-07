<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Alert;
use Illuminate\Http\Request;

class AlertController extends Controller
{
	/**
	 * Les dernières alertes de l'utilisateur connecté et le nombre de non lues
	 */
	public function index(Request $request)
	{
		$query = Alert::where("user_id", $request->user()->id);

		return $this->responseOk([
			"unread" => (clone $query)->whereNull("read_at")->count(),
			"alerts" => $query->orderByDesc("id")->limit(30)->get(),
		]);
	}

	/**
	 * Marque une alerte comme lue
	 */
	public function read(Request $request, int $id)
	{
		Alert::where("user_id", $request->user()->id)->where("id", $id)->whereNull("read_at")->update(["read_at" => now()]);

		return $this->responseOk();
	}

	/**
	 * Marque toutes les alertes comme lues
	 */
	public function read_all(Request $request)
	{
		Alert::where("user_id", $request->user()->id)->whereNull("read_at")->update(["read_at" => now()]);

		return $this->responseOk();
	}
}
