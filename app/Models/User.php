<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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
    ];

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
        $data["created_at"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
        $data["updated_at"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
        $data["email_verified_at"] = Carbon::parse($data["email_verified_at"])->format("d/m/Y H:i:s");
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
}
