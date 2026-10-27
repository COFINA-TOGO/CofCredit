<?php

namespace Tests\Feature\Circuit;

use Laravel\Sanctum\Sanctum;
use ZipArchive;

class ContractDocumentTest extends CircuitTestCase
{
	/**
	 * Texte brut du contrat Word téléchargé
	 */
	private function downloadContractText(int $contractId): string
	{
		$response = $this->get("/api/contract/download/{$contractId}")->assertOk();

		$zip = new ZipArchive();
		$zip->open($response->baseResponse->getFile()->getPathname());
		$text = strip_tags($zip->getFromName("word/document.xml"));
		$zip->close();

		// Le modèle met des espaces insécables avant « % »
		return str_replace("\u{00A0}", " ", $text);
	}

	public function test_contract_shows_the_rate_validated_on_the_pv(): void
	{
		$pv = $this->verbalTrial(["status" => "validated", "tax_fee_interest_rate" => 14, "number_deferred" => 0]);
		$contract = $this->contract($pv, ["type" => "particular"]);
		Sanctum::actingAs($this->user("admin"));

		$text = $this->downloadContractText($contract->id);

		$this->assertStringContainsString("Taux: 14 %", $text);
		$this->assertStringContainsString("taux fixé à 14 % hors taxes", $text);
	}

	public function test_decimal_rate_is_written_the_french_way(): void
	{
		$pv = $this->verbalTrial(["status" => "validated", "tax_fee_interest_rate" => 15.5, "number_deferred" => 0]);
		$contract = $this->contract($pv, ["type" => "particular"]);
		Sanctum::actingAs($this->user("admin"));

		$this->assertStringContainsString("Taux: 15,50 %", $this->downloadContractText($contract->id));
	}
}
