<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Customer extends Model
{
    use HasFactory;
    /**
     * Get all of the loans for the Customer
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class, 'customer_id', 'id');
    }

    /**
     * Get all of the loan_payments for the Customer
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function loan_payments(): HasManyThrough
    {
        return $this->hasManyThrough(LoanPayment::class, Loan::class);
    }
}
