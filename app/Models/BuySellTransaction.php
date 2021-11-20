<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BuySellTransaction extends Model
{
    use HasFactory;

    /**
     * Get the sell_transaction that owns the BuySellTransaction
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sell_transaction(): BelongsTo
    {
        return $this->belongsTo(SellTransaction::class);
    }

    /**
     * Get the buy_transaction that owns the BuySellTransaction
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function buy_transaction(): BelongsTo
    {
        return $this->belongsTo(BuyTransaction::class);
    }
}
