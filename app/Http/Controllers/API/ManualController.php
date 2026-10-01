<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * @group Manuels d'utilisation
 *
 * Les manuels sont déclarés dans config/manuels.php. Leurs captures sont
 * intégrées au HTML renvoyé (data URI) : elles ne sont jamais servies en
 * dehors de ce contrôle de droits.
 */
class ManualController extends Controller
{
	/**
	 * Les manuels consultables par l'utilisateur connecté
	 *
	 * @response 200
	 */
	public function index(Request $request)
	{
		$user = $request->user();
		$manuels = collect($this->visibles($user))
			->map(fn(array $manuel, string $slug) => [
				"slug" => $slug,
				"titre" => $manuel["titre"],
				"description" => $manuel["description"] ?? "",
				"famille" => $manuel["famille"] ?? "Autres",
				"mis_a_jour" => date("Y-m-d", filemtime($this->fichier($slug))),
				// Le manuel du profil du compte, mis en tête de liste par la page
				"mien" => in_array($user->profile, $manuel["profiles"]),
			])
			->values();

		return $this->responseOk(["manuels" => $manuels]);
	}

	/**
	 * Le contenu d'un manuel, captures intégrées
	 *
	 * @urlParam slug string required Le manuel. Example: admin-credit
	 *
	 * @response 200
	 */
	public function show(Request $request, string $slug)
	{
		$manuel = $this->visibles($request->user())[$slug] ?? null;
		if ($manuel === null) {
			return $this->responseError(["manuel" => ["Ce manuel n'existe pas ou ne vous est pas destiné."]], 404);
		}

		$dossier = dirname($this->fichier($slug));
		$html = preg_replace_callback(
			'#(src=")img/([A-Za-z0-9._-]+\.(webp|png|jpe?g))(")#',
			function (array $m) use ($dossier) {
				$image = "{$dossier}/img/{$m[2]}";
				if (!is_file($image)) {
					return $m[0];
				}
				$type = ["webp" => "image/webp", "png" => "image/png", "jpg" => "image/jpeg", "jpeg" => "image/jpeg"][strtolower($m[3])];

				return $m[1] . "data:{$type};base64," . base64_encode(file_get_contents($image)) . $m[4];
			},
			file_get_contents($this->fichier($slug))
		);

		return $this->responseOk(["slug" => $slug, "titre" => $manuel["titre"], "html" => $this->avecImpression($html, $manuel["titre"])]);
	}

	/**
	 * Ajoute au manuel la mise en page d'impression commune (export PDF) :
	 * couverture, sommaire, en-têtes et pieds de page, figures numérotées
	 */
	private function avecImpression(string $html, string $titre): string
	{
		$dossier = resource_path("manuels/_impression");
		if (!is_file("{$dossier}/impression.css")) {
			return $html;
		}

		$css = str_replace("{{TITRE}}", addcslashes("Manuel d'utilisation · {$titre}", '"\\'), file_get_contents("{$dossier}/impression.css"));
		$logo = "data:image/png;base64," . base64_encode(file_get_contents("{$dossier}/logo-cofina-blanc.png"));
		$js = str_replace("{{LOGO}}", $logo, file_get_contents("{$dossier}/impression.js"));

		return $html . "\n<style>\n{$css}\n</style>\n<script>\n{$js}\n</script>\n";
	}

	private function fichier(string $slug): string
	{
		return resource_path("manuels/" . basename($slug) . "/manuel.html");
	}

	/**
	 * @return array<string, array> Les manuels rédigés que ce compte peut ouvrir, par slug
	 */
	private function visibles(User $user): array
	{
		return array_filter(
			config("manuels", []),
			fn(array $manuel, string $slug) => is_file($this->fichier($slug))
				&& ($user->profile == "admin" || in_array($user->profile, $manuel["profiles"])),
			ARRAY_FILTER_USE_BOTH
		);
	}
}
