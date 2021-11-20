<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Buy;
use App\Models\BuyTransaction;
use App\Models\Item;
use Illuminate\Http\Request;

class BuyController extends Controller
{
    public function save(Request $request)
    {
        // return $request;
        $item_sells = $request->item_sells;
        $total = 0;

        foreach ($item_sells as $key => $item_sell) {
            if ($key == 'date') {
                continue;
            }
            $_total = $item_sell["quantity"] * $item_sell["price"];
            $total += $_total;
        }

        $buy = new Buy();
        $buy->user_id = $request->user_id;
        $buy->total = $total;
        $buy->created_at = $request->date;
        $buy->save();

        foreach ($item_sells as $key => $item_sell) {
            if ($key == 'date') {
                continue;
            }

            $quantity = $item_sell["quantity"];
            $price = $item_sell["price"];
            $min_sell_price = $item_sell["min_sell_price"];
            $buy_transaction = new BuyTransaction();
            $buy_transaction->buy_id = $buy->id;
            $buy_transaction->item_id = $key;
            $buy_transaction->price = $price;
            $buy_transaction->min_sell_price = $min_sell_price;
            $buy_transaction->quantity = $quantity;
            $buy_transaction->remaining = $quantity;
            $buy_transaction->created_at = $request->date;
            $buy_transaction->save();

            $item = Item::find($key);
            $item->remaining += $quantity;
            $item->save();
        }

        return $buy->id;
    }
}
