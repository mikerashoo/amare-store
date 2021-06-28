<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\Transaction;
use App\Models\Sell;
use Carbon\Carbon;

Carbon::setWeekStartsAt(Carbon::SUNDAY);
Carbon::setWeekEndsAt(Carbon::SATURDAY);
class ItemController extends Controller
{
    public function categories()
    {
        return ItemCategory::all();
    }  
    
    public function saveCategory(Request $request){  
        $category = new ItemCategory;
        $category->name = $request->name;
        $category->unit_id = $request->unit;
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
        $item = new Item;
        $item->name = $request->name;
        $item->price = $request->price;
        $item->category_id = $request->category_id;
        if($request->hasFile('image')){ 
            $file = $request->file('image');
            $file_name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $file->move(public_path('images/items'), $file_name); 
            $item->logo_name = $file_name;
        } 
        $item->save(); 
        return Item::find($item->id);
    }

    public function update(Request $request)
    {   
       
        $item = Item::find($request->item_id);
        $item->name = $request->name;
        $item->price = $request->price; 
        if($request->hasFile('image')){ 
            $file = $request->file('image');
            $file_name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $file->move(public_path('images/items'), $file_name); 
            $item->logo_name = $file_name;
        } 
        $item->save(); 
        return Item::find($request->item_id);
    }
    
    
    public function delete($id)
    {
        $item = Item::find($id);
        $item->status = 0;
        $item->save();
    }  

    public function dailyTransactions($item_id, $date){
        if($date == 'today'){
            $date = date('Y-m-d');
        }
        $item = Item::find($item_id);
        $item->transactions = $item->transactions()->whereDate('created_at', $date)->orderBy('created_at', 'DESC')->get();
        foreach($item->transactions as $transaction){
            $transaction->user = $transaction->user;
        }
        return $item;
    }

    public function weeklyTransactions($item_id, $start_date, $end_date){
        $item = Item::find($item_id);
 
            $item->transactions = $item->transactions()->whereBetween('created_at', [$start_date, $end_date])->orderBy('created_at', 'DESC')->get(); 
        foreach($item->transactions as $transaction){
            $transaction->user = $transaction->user;
        }
        return $item;
    }

}
