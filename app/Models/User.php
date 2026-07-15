<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\URL;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
			"courier" => "Courrier",
		][$this->profile];
	}

	public function getAbilityRulesAttribute()
	{
		return [
			'admin' => [
				[
					'subject' => ['all'],
					'action' => ['manage'],
				],
			],
			'caf' => [
				[
					'subject' => ['pv'],
					'action' => ['menu', 'read', 'historical', 'download'],
				],
				[
					'subject' => ['pv-notification'],
					'action' => ['menu', 'read', 'historical', 'read-without-pv', 'read-historical', 'create', 'update', 'download', 'delete'],
				],
				[
					'subject' => ['basic-contract'],
					'action' => ['menu', 'read', 'read-historical', 'read-without-cat', 'download'],
				],
				[
					'subject' => ['contract'],
					'action' => ['menu', 'read', 'download', 'send'],
				],
				[
					'subject' => ['notarized-contract'],
					'action' => ['menu', 'read', 'read-without-notarized-contract', 'read-historical', 'download'],
				],
				[
					'subject' => ['non-mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['user'],
					'action' => ['read'],
				],
				[
					'subject' => ['guarantor'],
					'action' => ['read', 'download', 'send'],
				],
				[
					'subject' => ['type-of-guarantee'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-credit'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-applicant'],
					'action' => ['read'],
				],
				[
					'subject' => ['deadline-postponed'],
					'action' => ['read', 'historical', 'create', 'update', 'download', 'delete'],
				],
				[
					'subject' => ['notification'],
					'action' => ['without-signed-contract', 'download', 'send'],
				],
				[
					'subject' => ['simple-notification'],
					'action' => ['simple-notification', 'without-signed-notification', 'download', 'send'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
			],
			'credit_analyst' => [
				[
					'subject' => ['pv-notification'],
					'action' => ['menu', 'read', 'read-without-pv', 'read-historical', 'download', 'check'],
				],
				[
					'subject' => ['pv'],
					'action' => ['menu', 'read', 'historical', 'download', 'analyst_delete'],
				],
				[
					'subject' => ['type-of-guarantee'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-credit'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-applicant'],
					'action' => ['read'],
				],
				[
					'subject' => ['non-mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['user'],
					'action' => ['read'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
			],
			'credit_admin' => [
				[
					'subject' => ['pv'],
					'action' => ['menu', 'read', 'create', 'update', 'historical', 'download', 'change_status', 'validate', 'reject'],
				],
				[
					'subject' => ['contract'],
					'action' => ['menu', 'read', 'read-without-cat', 'read-historical', 'historical', 'change_status', 'validate', 'reject', 'create', 'update', 'upload', 'delete'],
				],
				[
					'subject' => ['basic-contract'],
					'action' => ['menu', 'read', 'read-without-cat', 'read-historical', 'historical', 'create', 'update', 'upload', 'delete', 'download'],
				],
				[
					'subject' => ['notarized-contract'],
					'action' => ['menu', 'read', 'read-without-cat', 'read-historical', 'read-without-notarized-contract', 'read-without-head-validation', 'historical', 'change_status', 'validate', 'reject', 'create', 'update', 'upload'],
				],
				[
					'subject' => ['cat'],
					'action' => ['menu', 'read', 'create', 'update', 'download', 'delete'],
				],
				[
					'subject' => ['basic-cat'],
					'action' => ['menu', 'read', 'create', 'update', 'download', 'delete'],
				],
				[
					'subject' => ['pv-notification'],
					'action' => ['menu', 'read', 'read-historical', 'download'],
				],
				[
					'subject' => ['non-mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-guarantee'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-credit'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-applicant'],
					'action' => ['read'],
				],
				[
					'subject' => ['guarantor'],
					'action' => ['read', 'create', 'update', 'upload', 'download', 'delete'],
				],
				[
					'subject' => ['notification'],
					'action' => ['upload', 'create', 'read', 'without-signed-contract', 'historical', 'update', 'delete', 'download', 'change_status'],
				],
				[
					'subject' => ['simple-notification'],
					'action' => ['upload', 'create', 'simple-notification', 'read', 'historical', 'without-signed-notification', 'update', 'delete', 'download'],
				],
				[
					'subject' => ['cat-simple-notification'],
					'action' => ['create', 'read', 'historical', 'delete', 'download', 'change_stsatus'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
				[
					'subject' => ['user'],
					'action' => ['read'],
				],
			],
			'head_credit' => [
				[
					'subject' => ['pv'],
					'action' => ['menu', 'historical', 'read', 'download', 'reject', 'validate', 'change_status'],
				],
				[
					'subject' => ['contract'],
					'action' => ['menu', 'read', 'historical'],
				],
				[
					'subject' => ['basic-contract'],
					'action' => ['menu', 'read', 'read-without-cat', 'read-historical', 'historical', 'change_status', 'validate', 'reject', 'download'],
				],
				[
					'subject' => ['notarized-contract'],
					'action' => ['menu', 'read-without-notarized-contract', 'read-without-head-validation'],
				],
				[
					'subject' => ['cat'],
					'action' => ['menu', 'read', 'historical', 'download', 'validate', 'reject_validation'],
				],
				[
					'subject' => ['basic-cat'],
					'action' => ['menu', 'read', 'historical', 'download', 'validate', 'reject_validation'],
				],
				[
					'subject' => ['non-mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['notification'],
					'action' => ['read', 'historical', 'without-signed-contract', 'download', 'validate', 'reject', 'change_head_credit_status'],
				],
				[
					'subject' => ['simple-notification'],
					'action' => ['read', 'historical', 'simple-notification', 'without-signed-notification', 'download', 'validate', 'reject', 'change_head_credit_status'],
				],
				[
					'subject' => ['pv-notification'],
					'action' => ['download'],
				],
				[
					'subject' => ['guarantor'],
					'action' => ['read', 'download'],
				],
				[
					'subject' => ['type-of-guarantee'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-credit'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-applicant'],
					'action' => ['read'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
			],
			'operation' => [
				[
					'subject' => ['cat'],
					'action' => ['menu', 'read', 'download', 'unblock', 'reject_unblock'],
				],
				[
					'subject' => ['basic-cat'],
					'action' => ['menu', 'read', 'download', 'unblock', 'reject_unblock'],
				],
				[
					'subject' => ['type-of-guarantee'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-credit'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-applicant'],
					'action' => ['read'],
				],
				[
					'subject' => ['non-mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['simple-notification'],
					'action' => ['read', 'simple-notification'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
			],
			'legal' => [
				[
					'subject' => ['contract'],
					'action' => ['menu', 'send'],
				],
				[
					'subject' => ['notarized-contract'],
					'action' => ['menu', 'read', 'read-without-notarized-contract', 'read-historical', 'download', 'upload'],
				],
				[
					'subject' => ['guarantor-list'],
					'action' => ['read'],
				],
				[
					'subject' => ['guarantor'],
					'action' => ['read', 'download', 'upload', 'send'],
				],
				[
					'subject' => ['guarantee-list'],
					'action' => ['read'],
				],
				[
					'subject' => ['guarantee'],
					'action' => ['read', 'download'],
				],
				[
					'subject' => ['notification'],
					'action' => ['read', 'without-signed-contract', 'send'],
				],
				[
					'subject' => ['pv'],
					'action' => ['historical'],
				],
				[
					'subject' => ['simple-notification'],
					'action' => ['send'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
			],
			'dex' => [
				[
					'subject' => ['contract'],
					'action' => ['simple-notification', 'read', 'historical', 'download'],
				],
				[
					'subject' => ['cat'],
					'action' => ['simple-notification', 'read', 'historical', 'download'],
				],
				[
					'subject' => ['guarantor'],
					'action' => ['simple-notification', 'read', 'historical', 'download'],
				],
				[
					'subject' => ['non-mortgage-contract'],
					'action' => ['simple-notification', 'read', 'historical', 'download'],
				],
				[
					'subject' => ['mortgage-contract'],
					'action' => ['simple-notification', 'read', 'historical', 'download'],
				],
				[
					'subject' => ['notification'],
					'action' => ['simple-notification', 'read', 'historical', 'download', 'without-signed-contract'],
				],
				[
					'subject' => ['simple-notification'],
					'action' => ['simple-notification', 'read', 'historical', 'download', 'without-signed-notification'],
				],
				[
					'subject' => ['pv'],
					'action' => ['read', 'historical', 'download', 'reject', 'validate', 'change_status'],
				],
				[
					'subject' => ['type-of-guarantee'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-credit'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-applicant'],
					'action' => ['read'],
				],
				[
					'subject' => ['deadline-postponed'],
					'action' => ['read', 'historical', 'change_status', 'download'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
			],
			'ca' => [
				[
					'subject' => ['deadline-postponed'],
					'action' => ['read', 'historical', 'change_status', 'download'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
			],
			'md' => [
				[
					'subject' => ['non-mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['mortgage-contract'],
					'action' => ['read'],
				],
				[
					'subject' => ['pv'],
					'action' => ['read', 'historical', 'download', 'reject', 'validate', 'change_status'],
				],
				[
					'subject' => ['contract'],
					'action' => ['read', 'historical', 'download'],
				],
				[
					'subject' => ['notification'],
					'action' => ['read', 'without-signed-contract', 'historical', 'download', 'validate', 'reject', 'change_head_credit_status'],
				],
				[
					'subject' => ['simple-notification'],
					'action' => ['read', 'simple-notification', 'without-signed-notification', 'historical', 'download', 'validate', 'reject', 'change_head_credit_status'],
				],
				[
					'subject' => ['guarantor'],
					'action' => ['read', 'download'],
				],
				[
					'subject' => ['cat'],
					'action' => ['read', 'download', 'validate', 'reject_validation'],
				],
				[
					'subject' => ['type-of-guarantee'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-credit'],
					'action' => ['read'],
				],
				[
					'subject' => ['type-of-applicant'],
					'action' => ['read'],
				],
				[
					'subject' => ['deadline-postponed'],
					'action' => ['read', 'historical', 'change_status', 'download'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
			],
			'courier' => [
				[
					'subject' => ['guarantor-list'],
					'action' => ['read'],
				],
				[
					'subject' => ['guarantee-list'],
					'action' => ['read'],
				],
				[
					'subject' => ['guarantor'],
					'action' => ['read', 'download'],
				],
				[
					'subject' => ['settings-user'],
					'action' => ['manage'],
				],
			],
		][$this->profile];
	}
}