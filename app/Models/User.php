<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'user_name',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get all of the sells for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sells(): HasMany
    {
        return $this->hasMany(Sell::class);
    }

    /**
     * Get all of the buys for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function buys(): HasMany
    {
        return $this->hasMany(Buy::class);
    }

    /**
     * Get all of the loan_payments for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function loan_payments(): HasMany
    {
        return $this->hasMany(LoanPayment::class);
    }
}
