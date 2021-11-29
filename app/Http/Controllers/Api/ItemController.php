<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BuySellTransaction;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\Transaction;
use App\Models\Sell;
use App\Models\SellTransaction;
use Carbon\Carbon;

Carbon::setWeekStartsAt(Carbon::SUNDAY);
Carbon::setWeekEndsAt(Carbon::SATURDAY);
class ItemController extends Controller
{
    public function categories()
    {
        return ItemCategory::all();
    }

    public function saveCategory(Request $request)
    {
        $item_category = ItemCategory::where('code', $request->code)->first();
        if ($item_category != null) {
            return -1;
        }
        $category = new ItemCategory;
        $category->name = $request->name;
        $category->code = $request->code;
        $category->save();
        $category->item_properties()->sync($request->properties);

        $category->save();
        return ItemCategory::find($category->id);
    }

    public function categoryDetail($id)
    {
        $itemCategory = ItemCategory::with('items')->where('id', $id)->first();
        return $itemCategory;
    }

    public function deleteCategory($id)
    {
        return ItemCategory::find($id)->delete();
    }

    public function save(Request $request)
    {
        $_item = Item::where('code', $request->code)->first();
        if ($_item != null) {
            return -1;
        }
        $item = new Item;
        $item->name = $request->name;
        $item->code = $request->code;

        $item->code = $request->code;
        $item->price = $request->price;
        $item->threshold = $request->threshold;
        $item->category_id = $request->category_id;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $file_name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $file->move(public_path('images/items'), $file_name);
            $item->logo_name = $file_name;
        }
        $item->save();

        $category = ItemCategory::find($request->category_id);
        $props = $category->item_properties;
        foreach ($props as $key => $pro) {
            if ($request->has($pro->id)) {
                $item->properties()->attach($pro->id, ['value' => $request->get($pro->id)]);
            }
        }
        return Item::find($item->id);
    }

    public function update(Request $request)
    {
        $_item = Item::where('code', $request->code)->where('id', '!=', $request->id)->first();
        if ($_item != null) {
            return -1;
        }
        $item = Item::find($request->id);
        $item->name = $request->name;
        $item->code = $request->code;

        $item->code = $request->code;
        $item->price = $request->price;
        $item->threshold = $request->threshold;
        $item->category_id = $request->category_id;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $file_name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $file->move(public_path('images/items'), $file_name);
            $item->logo_name = $file_name;
        }
        $item->save();

        $category = ItemCategory::find($request->category_id);
        $props = $category->item_properties;
        foreach ($props as $key => $pro) {
            if ($request->has($pro->id)) {
                $item->properties()
                    ->newPivotStatement()
                    ->where('item_id', '=', $item->id)
                    ->where('property_id', '=', $pro->id)
                    ->update(array('value' => $request->get($pro->id)));
                // $item->properties()->attach($pro->id, ['value' => $request->get($pro->id)]);
            }
        }
        return Item::find($item->id);
    }


    public function delete($id)
    {
        $item = Item::find($id);
        $item->status = 0;
        $item->save();
    }

    public function dailyTransactions($item_id, $date)
    {
        if ($date == 'today') {
            $date = date('Y-m-d');
        }
        $item = Item::where('id', $item_id)->with(['sell_transactions' => function ($query) use ($date) {
            $query->whereDate('created_at', $date)->orderBy('created_at', 'DESC');
        }])->with(['buy_transactions' => function ($query) use ($date) {
            $query->whereDate('created_at', $date)->orderBy('created_at', 'DESC');
        }])->first();

        foreach ($item->sell_transactions as $transaction) {
            $transaction->user = $transaction->user;
            $transaction->profit = $this->getTransactionProfit($transaction->id);
        }
        return $item;
    }

    public function weeklyTransactions($item_id, $start_date, $end_date)
    {
        $item = Item::where('id', $item_id)->with(['sell_transactions' => function ($query) use ($start_date, $end_date) {
            $query->whereBetween('created_at', [$start_date, $end_date])->orderBy('created_at', 'DESC');
        }])->with(['buy_transactions' => function ($query) use ($start_date, $end_date) {
            $query->whereBetween('created_at', [$start_date, $end_date])->orderBy('created_at', 'DESC');
        }])->first();
        foreach ($item->sell_transactions as $transaction) {
            $transaction->user = $transaction->user;
            $transaction->profit = $this->getTransactionProfit($transaction->id);
        }
        return $item;
    }

    public function monthlyTransactions($item_id, $month, $year)
    {
        // return SellTransaction::whereMonth('created_at', $month)->whereYear('created_at', $year)->get();
        $item = Item::where('id', $item_id)->with(['sell_transactions' => function ($query) use ($month, $year) {
            $query->whereMonth('created_at', $month)->whereYear('created_at', $year)->orderBy('created_at', 'DESC');
        }])->with(['buy_transactions' => function ($query) use ($month, $year) {
            $query->whereMonth('created_at', $month)->whereYear('created_at', $year)->orderBy('created_at', 'DESC');
        }])->first();
        foreach ($item->sell_transactions as $transaction) {
            $transaction->user = $transaction->user;
            $transaction->profit = $this->getTransactionProfit($transaction->id);
        }
        return $item;
    }

    public function getTransactionProfit($transaction_id)
    {
        $buy_sells = BuySellTransaction::where('sell_transaction_id', $transaction_id)->with(['sell_transaction', 'buy_transaction'])->get();
        $profit = 0;
        foreach ($buy_sells as $key => $buy_sell) {
            $single_profit = $buy_sell->sell_transaction->price - $buy_sell->buy_transaction->price;
            $current_profit = $buy_sell->quantity * $single_profit;
            $profit += $current_profit;
        }
        return $profit;
    }
}
