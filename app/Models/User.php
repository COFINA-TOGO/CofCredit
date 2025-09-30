<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\URL;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		"name",
		"email",
		"full_name",
		"profile",
		"email_verified_at",
		"password",
		"si_profile_id",
		"activated",
		"password_change_required",
		"signatory_path"
	];

	protected $appends = ['ability_rules', 'profile_fr'];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		'password',
		'remember_token',
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
	];

	public function toArray()
	{
		$data = parent::toArray();
		$data["created_at_fr"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
		$data["updated_at_fr"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
		$data["email_verified_at_fr"] = Carbon::parse($data["email_verified_at"])->format("d/m/Y H:i:s");
		$data["activated"] = (bool) $data["activated"];
		$data["password_change_required"] = (bool) $data["password_change_required"];
		$data["signatory_path"] = (isset($data["signatory_path"])) ? "/storage" . $data["signatory_path"] : null;
		return $data;
	}

	public function verbal_trial(): HasMany
	{
		return $this->hasMany(VerbalTrial::class, 'caf_id', "id");
	}

	public function verbals_trials(): HasMany
	{
		return $this->hasMany(VerbalTrial::class, "creator_id", "id");
	}
	public function contracts(): HasMany
	{
		return $this->hasMany(Contract::class, "creator_id", "id");
	}
	public function notifications(): HasMany
	{
		return $this->hasMany(Notification::class, "creator_id", "id");
	}

	public function deadline_postponeds(): HasMany
	{
		return $this->hasMany(DeadlinePostponed::class, "caf_id", "id");
	}

	public function getProfileFrAttribute()
	{
		return [
			"admin" => "Administrateur",
			"credit_analyst" => "Analyste Crédit",
			"credit_admin" => "Admin Crédit",
			"head_credit" => "Head Crédit",
			"operation" => "Opérations",
			"legal" => "Juridique",
			"dex" => "DEX",
			"caf" => "CAF",
			"ca" => "Chef d'agence",
			"md" => "MD",
		][$this->profile];
	}

	public function getAbilityRulesAttribute()
	{
		switch ($this->profile) {
			case ('admin'):
				return [
					[
						'action' => ['manage'],
						'subject' => ['all'],
					]
				];
			case ('caf'):
				return [
					[
						"action" => ["menu"],
						"subject" => ["pv", "pv-notification", "basic-contract", "contract", "notarized-contract"]
					],
					[
						"action" => ["read"],
						"subject" => ["non-mortgage-contract", "mortgage-contract", "pv", "user", "contract", "guarantor", "type-of-guarantee", "type-of-credit", "type-of-applicant", "deadline-postponed", "pv-notification", "basic-contract", "notarized-contract"]
					],
					[
						"action" => ["read-without-notarized-contract"],
						"subject" => ["notarized-contract"]
					],
					[
						"action" => ["read-historical"],
						"subject" => ["notarized-contract"]
					],
					[
						"action" => ["without-signed-contract"],
						"subject" => ["notification"]
					],
					[
						"action" => ["historical"],
						"subject" => ["pv", "deadline-postponed", "pv-notification"],
					],
					[
						"action" => ["read-without-pv"],
						"subject" => ["pv-notification"],
					],
					[
						"action" => ["read-historical"],
						"subject" => ["pv-notification", "basic-contract"],
					],
					[
						"action" => ["without-signed-contract"],
						"subject" => ["notification"],
					],
					[
						"action" => ["simple-notification"],
						"subject" => ["simple-notification"],
					],
					[
						"action" => ["without-signed-notification"],
						"subject" => ["simple-notification"],
					],
					[
						"action" => ["read-without-cat"],
						"subject" => ["basic-contract"],
					],
					[
						"action" => ['create'],
						"subject" => ["pv", "deadline-postponed", "pv-notification"]
					],
					[
						"action" => ["update"],
						"subject" => ["deadline-postponed", "pv-notification"]
					],
					[
						"action" => ["download"],
						"subject" => ["pv", "basic-contract", "contract", "guarantor", "notification", "simple-notification", "deadline-postponed", "pv-notification", "notarized-contract"],
					],
					[
						"action" => ["send"],
						"subject" => ["contract", "guarantor", "notification", "simple-notification"],
					],
					[
						"action" => ["delete"],
						"subject" => ["deadline-postponed", "pv-notification"]
					],
					[
						"action" => ["manage"],
						"subject" => ["settings-user"]
					],
				];
			case ('credit_analyst'):
				return [
					[
						"action" => ["menu"],
						"subject" => ["pv-notification", "pv"]
					],
					[
						"action" => ["read"],
						"subject" => ["type-of-guarantee", "type-of-credit", "type-of-applicant", "non-mortgage-contract", "mortgage-contract", "pv", "pv-notification"]
					],
					[
						"action" => ["historical"],
						"subject" => ["pv"],
					],
					[
						"action" => ["read-without-pv"],
						"subject" => ["pv-notification"],
					],
					[
						"action" => ["read-historical"],
						"subject" => ["pv-notification"],
					],
					[
						"action" => ["read_caf"],
						"subject" => ["user"]
					],
					[
						"action" => ["create"],
						"subject" => ["pv"]
					],
					[
						"action" => ["update"],
						"subject" => ["pv"]
					],
					[
						"action" => ["delete"],
						"subject" => ["pv"]
					],
					[
						"action" => ["download"],
						"subject" => ["pv", "pv-notification"]
					],
					[
						"action" => ["check"],
						"subject" => ["pv-notification"]
					],
					[
						"action" => ["analyst_delete"],
						"subject" => ["pv"]
					],
					[
						"action" => ["manage"],
						"subject" => ["settings-user"]
					],
				];
			case ('credit_admin'):
				return [
					[
						"action" => ["menu"],
						"subject" => ["pv", "contract", "basic-contract", "notarized-contract", "cat", "basic-cat", "pv-notification"]
					],
					[
						"action" => ["read"],
						"subject" => ["non-mortgage-contract", "mortgage-contract", "basic-contract", "contract", "notarized-contract", "basic-cat", "pv-notification", "cat", "type-of-guarantee", "type-of-credit", "type-of-applicant", "guarantor"]
					],
					[
						"action" => ["read-without-cat"],
						"subject" => ["basic-contract", "contract", "notarized-contract"]
					],
					[
						"action" => ["read-historical"],
						"subject" => ["basic-contract", "contract", "notarized-contract", "pv-notification"]
					],
					[
						"action" => ["read-without-notarized-contract"],
						"subject" => ["notarized-contract"]
					],
					[
						"action" => ["read-without-head-validation"],
						"subject" => ["notarized-contract"]
					],
					[
						"action" => ["historical"],
						"subject" => ["basic-contract", "contract", "notarized-contract"]
					],
					[
						"action" => ["change_status"],
						"subject" => ["basic-contract", "contract", "notarized-contract"]
					],
					[
						"action" => ["validate"],
						"subject" => ["basic-contract", "contract", "notarized-contract"]
					],
					[
						"action" => ["reject"],
						"subject" => ["basic-contract", "contract", "notarized-contract"]
					],
					[
						"action" => ["create"],
						"subject" => ["basic-contract", "contract", "notarized-contract", "cat", "basic-cat", "guarantor"]
					],
					[
						"action" => ["update"],
						"subject" => ["basic-contract", "contract", "notarized-contract", "cat", "basic-cat", "guarantor"]
					],
					[
						"action" => ["upload"],
						"subject" => ["basic-contract", "contract", "notarized-contract", "guarantor", "notification", "simple-notification"]
					],
					[
						"action" => ["download"],
						"subject" => ["pv-notification", "cat", "basic-cat", "guarantor", "pv-notification"]
					],
					[
						"action" => ["delete"],
						"subject" => ["basic-contract", "contract", "cat", "basic-cat", "guarantor"]
					],
					[
						"action" => ["read", "historical", "download", "change_status", "validate", "reject"],
						"subject" => ["pv"],
					],
					[
						"action" => ["create", "read", "historical", "update", "change_status", "reject", "validate", "delete", "download"],
						"subject" => ["basic-contract"],
					],
					[
						"action" => ["create", "read", "without-signed-contract", "historical", "update", "delete", "download", "change_status"],
						"subject" => ["notification"],
					],
					[
						"action" => ["create", "simple-notification", "read", "historical", "without-signed-notification", "update", "delete", "download"],
						"subject" => ["simple-notification"],
					],
					[
						"action" => ["create", "read", "historical", "delete", "download", "change_stsatus"],
						"subject" => ["cat-simple-notification"]
					],
					[
						"action" => ["manage"],
						"subject" => ["settings-user"]
					]
				];
			case ('head_credit'):
				return [
					[
						"action" => ["menu"],
						"subject" => ["pv", "contract", "basic-contract", "notarized-contract", "cat", "basic-cat"]
					],
					[
						"action" => ["read"],
						"subject" => ["non-mortgage-contract", "mortgage-contract", "contract", "basic-contract", "cat", "basic-cat", "notification", "simple-notification"]
					],
					[
						"action" => ["read-without-notarized-contract"],
						"subject" => ["notarized-contract"]
					],
					[
						"action" => ["read-without-head-validation"],
						"subject" => ["notarized-contract"]
					],
					[
						"action" => ["historical"],
						"subject" => ["pv", "contract", "notification", "simple-notification", "cat", "basic-cat"]
					],
					[
						"action" => ["read", "download", "reject", "validate", "change_status"],
						"subject" => ["pv"],
					],
					[
						"action" => ["read"],
						"subject" => ["contract"],
					],
					[
						"action" => ["download"],
						"subject" => ["pv-notification"],
					],
					[
						"action" => ["without-signed-contract", "download", "validate", "reject", "change_head_credit_status"],
						"subject" => ["notification"],
					],
					[
						"action" => ["simple-notification", "without-signed-notification", "download", "validate", "reject", "change_head_credit_status"],
						"subject" => ["simple-notification"],
					],
					[
						"action" => ["read", "download"],
						"subject" => ["guarantor"],
					],
					[
						"action" => ["read", "download", "validate", "reject_validation", "download"],
						"subject" => ["cat", "basic-cat"],
					],
					[
						"action" => ["read"],
						"subject" => ["type-of-guarantee", "type-of-credit", "type-of-applicant"]
					],
					[
						"action" => ["manage"],
						"subject" => ["settings-user"]
					]
				];
			case ('operation'):
				return [
					[
						"action" => ["menu"],
						"subject" => ["cat", "basic-cat"]
					],
					[
						"action" => ["read"],
						"subject" => ["type-of-guarantee", "type-of-credit", "type-of-applicant", "non-mortgage-contract", "mortgage-contract", "simple-notification", "cat", "basic-cat"]
					],
					[
						"action" => ["historical"],
						"subject" => []
					],
					[
						"action" => ["download"],
						"subject" => ["cat", "basic-cat"]
					],
					[
						"action" => ["unblock"],
						"subject" => ["cat", "basic-cat"]
					],
					[
						"action" => ["reject_unblock"],
						"subject" => ["cat", "basic-cat"]
					],
					[
						"action" => ["simple-notification"],
						"subject" => ["simple-notification"]
					],
					[
						"action" => ["manage"],
						"subject" => ["settings-user"]
					]
				];
			case ('legal'):
				return [
					[
						"action" => ["menu"],
						"subject" => ["contract", "notarized-contract"],
					],
					[
						"action" => ["read"],
						"subject" => ["notarized-contract", "guarantor", "notification"]
					],
					[
						"action" => ["historical"],
						"subject" => ["pv"]
					],
					[
						"action" => ["read-without-notarized-contract"],
						"subject" => ["notarized-contract"]
					],
					[
						"action" => ["read-historical"],
						"subject" => ["notarized-contract"]
					],
					[
						"action" => ["without-signed-contract"],
						"subject" => ["notification"]
					],
					[
						"action" => ["download"],
						"subject" => ["notarized-contract", "guarantor"]
					],
					[
						"action" => ["upload"],
						"subject" => ["notarized-contract", "guarantor"]
					],
					[
						"action" => ["send"],
						"subject" => ["contract", "guarantor", "notification", "simple-notification"],
					],
					[
						"action" => ["manage"],
						"subject" => ["settings-user"]
					]
				];
			case ('dex'):
				return [
					[
						"action" => ["simple-notification", "read", "historical", "download"],
						"subject" => ["contract", "cat", "guarantor", "non-mortgage-contract", "mortgage-contract", "notification", "simple-notification"]
					],
					[
						"action" => ["read", "historical", "download", "reject", "validate", "change_status"],
						"subject" => ["pv"],
					],
					[
						"action" => ["without-signed-contract"],
						"subject" => ["notification"]
					],
					[
						"action" => ["without-signed-notification"],
						"subject" => ["simple-notification"]
					],
					[
						"action" => ["read"],
						"subject" => ["type-of-guarantee", "type-of-credit", "type-of-applicant"]
					],
					[
						"action" => ["read", "historical", "change_status", "download"],
						"subject" => ["deadline-postponed"],
					],
					[
						"action" => ["manage"],
						"subject" => ["settings-user"]
					]
				];
			case ('ca'):
				return [
					[
						"action" => ["read", "historical", "change_status", "download"],
						"subject" => ["deadline-postponed"],
					],
					[
						"action" => ["manage"],
						"subject" => ["settings-user"]
					]
				];
			case ('md'):
				return [
					[
						"action" => ["read"],
						"subject" => ["non-mortgage-contract", "mortgage-contract"]
					],
					[
						"action" => ["read", "historical", "download", "reject", "validate", "change_status"],
						"subject" => ["pv"],
					],
					[
						"action" => ["read", "historical", "download"],
						"subject" => ["contract"],
					],
					[
						"action" => ["read", "without-signed-contract", "historical", "download", "validate", "reject", "change_head_credit_status"],
						"subject" => ["notification"],
					],
					[
						"action" => ["read", "simple-notification", "without-signed-notification", "historical", "download", "validate", "reject", "change_head_credit_status"],
						"subject" => ["simple-notification"],
					],
					[
						"action" => ["read", "download"],
						"subject" => ["guarantor"],
					],
					[
						"action" => ["read", "download", "validate", "reject_validation", "download"],
						"subject" => ["cat"],
					],
					[
						"action" => ["read"],
						"subject" => ["type-of-guarantee", "type-of-credit", "type-of-applicant"]
					],
					[
						"action" => ["read", "historical", "change_status", "download"],
						"subject" => ["deadline-postponed"],
					],
					[
						"action" => ["manage"],
						"subject" => ["settings-user"]
					]
				];
		}
	}
}
