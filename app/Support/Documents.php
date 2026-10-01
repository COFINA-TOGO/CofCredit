<?php

namespace App\Support;

/**
 * Emplacement des documents privés (signés, pièces jointes)
 */
class Documents
{
	// Préfixe des URLs enregistrées en base, servies par la route authentifiée document.show
	public const URL_PREFIX = "/api/document/";

	// Les colonnes contenant un document privé, par table
	public const COLUMNS = [
		"contracts" => ["signed_contract_path", "signed_promissory_note_path"],
		"guarantors" => ["signed_contract_path", "signed_promissory_note_path"],
		"notifications" => ["signed_notification_path", "signed_contract_path", "signed_promissory_note_path"],
		"deadline_postponeds" => ["request_path", "memo_path"],
	];
}
