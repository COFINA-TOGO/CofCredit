<?php

/*
 * Manuels d'utilisation, affichés par la page « Manuel d'utilisation ».
 *
 * Chaque manuel vit dans resources/manuels/<slug>/ : un manuel.html autonome
 * et ses captures dans img/, produits par tools/manuels/generer-manuels.mjs.
 * `profiles` désigne les profils auxquels il s'adresse. Un manuel dont le
 * fichier n'existe pas encore n'est pas proposé.
 *
 * L'administrateur voit tous les manuels, les autres comptes celui de leur profil.
 */
return [
	'administrateur' => [
		'titre' => 'Administrateur',
		'description' => 'Comptes utilisateurs et accès à tous les écrans : PV, contrats, notifications hypothécaires, CAT et reports d\'échéance.',
		'profiles' => ['admin'],
		'famille' => 'Administration',
	],
	'admin-credit' => [
		'titre' => 'Admin Crédit',
		'description' => 'PV de comité, contrats et cautions, notifications hypothécaires, chargement des documents signés et CAT.',
		'profiles' => ['credit_admin'],
		'famille' => 'Crédit',
	],
	'analyste-credit' => [
		'titre' => 'Analyste Crédit',
		'description' => 'Vérification des notifications de CAF et suivi des PV.',
		'profiles' => ['credit_analyst'],
		'famille' => 'Crédit',
	],
	'head-credit' => [
		'titre' => 'Head Crédit',
		'description' => 'Validation des PV, des contrats, des notifications hypothécaires et des CAT.',
		'profiles' => ['head_credit'],
		'famille' => 'Crédit',
	],
	'caf' => [
		'titre' => 'CAF',
		'description' => 'Notifications de CAF, suivi des contrats de ses clients et reports d\'échéance.',
		'profiles' => ['caf'],
		'famille' => 'Réseau d\'agences',
	],
	'chef-agence' => [
		'titre' => 'Chef d\'agence',
		'description' => 'Validation des reports d\'échéance de l\'agence.',
		'profiles' => ['ca'],
		'famille' => 'Réseau d\'agences',
	],
	'md' => [
		'titre' => 'MD',
		'description' => 'Validation des PV, des notifications, des CAT et des reports d\'échéance.',
		'profiles' => ['md'],
		'famille' => 'Direction',
	],
	'dex' => [
		'titre' => 'DEX',
		'description' => 'Validation des PV et des reports d\'échéance, consultation des contrats et des CAT.',
		'profiles' => ['dex'],
		'famille' => 'Direction',
	],
	'operations' => [
		'titre' => 'Opérations',
		'description' => 'Déblocage des CAT validés.',
		'profiles' => ['operation'],
		'famille' => 'Support',
	],
	'juridique' => [
		'titre' => 'Juridique',
		'description' => 'Contrats notariés des notifications hypothécaires, garants et garanties.',
		'profiles' => ['legal'],
		'famille' => 'Support',
	],
	'courrier' => [
		'titre' => 'Courrier',
		'description' => 'Consultation des garants et des garanties.',
		'profiles' => ['courier'],
		'famille' => 'Support',
	],
];
