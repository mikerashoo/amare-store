<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ItemProperty;
use App\Models\Unit;

class ItemPropertyController extends Controller
{
    public function index()
    {
        $item_properties = ItemProperty::all();
        foreach ($item_properties as $key => $property) {
            if ($property->unit_id) {
                $property->unit = Unit::find($property->unit_id)->name;
            }
        }
        return $item_properties;
    }

    public function save(Request $request)
    {
        $item_property = new ItemProperty;
        $item_property->name = $request->name;
        $item_property->unit_id = $request->unit_id;
        $item_property->save();

        return ItemProperty::find($item_property->id);
    }

    public function delete($id)
    {
        return ItemProperty::find($id)->delete();
    }
}
