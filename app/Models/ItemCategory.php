<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ItemCategory extends Model
{
    use HasFactory;

    protected $with = ['item_properties'];

    public function items()
    {
        return $this->hasMany('App\Models\Item', 'category_id', 'id');
    }

    /**
     * The item_properties that belong to the ItemCategory
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function item_properties(): BelongsToMany
    {
        return $this->belongsToMany(ItemProperty::class, 'category_item_property', 'category_id', 'property_id');
    }
}
