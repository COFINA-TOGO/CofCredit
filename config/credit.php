<?php

return [

	/*
	|--------------------------------------------------------------------------
	| Paramètres métier des documents générés
	|--------------------------------------------------------------------------
	*/

	// Taux hors taxe affiché dans les documents
	'ht_rate' => env('CREDIT_HT_RATE', '17'),

	// Au-delà de ce montant, le contrat est signé par le head crédit plutôt que par le juridique
	'signatory_threshold' => env('CREDIT_SIGNATORY_THRESHOLD', 10000000),

	'signatories' => [
		'legal' => env('CREDIT_SIGNATORY_LEGAL', "Madame Ameh Délali MESSANGAN épouse AMEDEMEGNAH, Responsable juridique"),
		'head_credit' => env('CREDIT_SIGNATORY_HEAD_CREDIT', "Mr. Koffi Djramedo GAMADO, Head Crédit"),
	],

	// ID du type de garantie « hypothèque » (détermine le circuit notification au lieu de contrat)
	'mortgage_type_of_guarantee_id' => (int) env('CREDIT_MORTGAGE_TYPE_OF_GUARANTEE_ID', 9),
];
