<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellTransaction extends Model
{
    use HasFactory;
    public function item()
    {
        return $this->belongsTo('App\Models\Item', 'item_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
