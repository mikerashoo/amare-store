<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasFactory;

    protected $with = ['properties', 'property_values'];

    public function sell_transactions()
    {
        return $this->hasMany('App\Models\SellTransaction');
    }

    /**
     * The properties that belong to the Item
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function properties(): BelongsToMany
    {
        return $this->belongsToMany(ItemProperty::class, 'item_property_value', 'item_id', 'property_id')->withPivot('value');
    }

    /**
     * Get all of the property_values for the Item
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function property_values(): HasMany
    {
        return $this->hasMany(ItemPropertyValue::class);
    }

    /**
     * Get all of the property_values for the Item
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function buy_transactions(): HasMany
    {
        return $this->hasMany(BuyTransaction::class);
    }
}
