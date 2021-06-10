<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sell extends Model
{
    use HasFactory;
    public function transactions()
    {
        return $this->hasMany('App\Models\Transaction', 'sell_id');
    }

    public function loan()
    {
        return $this->hasOne('App\Models\Loan');
    }

    public function customer()
    {
        return $this->belongsTo('App\Models\Customer', 'customer_id');
    }
<<<<<<< HEAD
=======
    
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
>>>>>>> f943059fc8ecfca792a2f2e6aeaade24466c40c5
}
