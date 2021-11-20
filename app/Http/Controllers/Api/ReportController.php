<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BuySellTransaction;
use App\Models\BuyTransaction;
use App\Models\Customer;
use App\Models\Item;
use App\Models\Sell;
use App\Models\Loan;
use App\Models\SellTransaction;
use Carbon\Carbon;

class ReportController extends Controller
{

    public function todaysSell()
    {
        $items = Item::whereHas('sell_transactions', function ($query) {
            $query->whereDate('created_at', Carbon::today());
        })->with(['sell_transactions' => function ($query) {
            $query->whereDate('created_at', Carbon::today());
        }])->without(['properties', 'property_values'])->get();

        foreach ($items as $key => $item) {
            $sell_buy_transaction = BuySellTransaction::where('item_id', $item->id)->whereDate('created_at', Carbon::today())->get();
            $profit = $this->getProfitOfBuySell($sell_buy_transaction);
            $item->profit = $profit;
        }

        return $items;
    }

    public function todaysLoanGiven()
    {
        $customers = Customer::whereHas('loans', function ($query) {
            $query->where('status', 'unpaid')->whereDate('created_at', Carbon::today());
        })->with(['loans' => function ($query) {
            $query->where('status', 'unpaid')->whereDate('created_at', Carbon::today());
        }])->get();
        return $customers;
    }

    public function todaysLoanPayments()
    {
        $customers = Customer::whereHas('loan_payments', function ($query) {
            $query->whereDate('loan_payments.created_at', Carbon::today());
        })->with(['loan_payments' => function ($query) {
            $query->whereDate('loan_payments.created_at', Carbon::today());
        }])->get();
        foreach ($customers as $key => $customer) {
            $customer->remaining = $this->getCustomerTotalRemaining($customer);
            # code...
        }
        return $customers;
    }

    public function getCustomerTotalRemaining($customer)
    {
        $loans = Loan::where('customer_id', $customer->id)->where('remaining', '>', 0)->get();
        $total_remaining = 0;
        foreach ($loans as $key => $loan) {
            $total_remaining += $loan->remaining;
        }
        return $total_remaining;
    }

    public function getTodaysProfit()
    {
        $buy_sell_transactions = BuySellTransaction::with(['sell_transaction', 'buy_transaction'])->whereDate('created_at', Carbon::today())->get();

        $profit = 0;
        foreach ($buy_sell_transactions as $key => $buy_sell) {
            // $single_profit = $buy_sell->sell_transaction->price - $buy_sell->buy_transaction->price;
            // $current_profit = $buy_sell->quantity * $single_profit;
            // $profit += $current_profit;
            $buy_sell->item_name = Item::find($buy_sell->item_id)->name;
        }
        return $buy_sell_transactions;
    }

    public function getProfitOfBuySell($buy_sell_transactions)
    {
        $total = 0;
        foreach ($buy_sell_transactions as $key => $buy_sell_transaction) {
            $single_profit = $buy_sell_transaction->sell_transaction->price - $buy_sell_transaction->buy_transaction->price;
            $current_profit = $buy_sell_transaction->quantity * $single_profit;
            $total += $current_profit;
        }
        return $total;
    }

    public function mostSelledItem()
    {
        $items = Item::all();
        return $items;
    }

    public function transactions()
    {
        $transactions = SellTransaction::orderBy('created_at', 'desc')->whereDate('created_at', Carbon::today())->get();
        foreach ($transactions as $transaction) {
            $transaction->item;
        }
        return $transactions;
    }

    public function recentTransactions()
    {
        $recent_transactions = BuyTransaction::orderBy('created_at', 'desc')->limit(20)->get();
        foreach ($recent_transactions as $transaction) {
            $item_name = Item::find($transaction->item_id)->name;
            $transaction->item_name = $item_name;
        }
        return $recent_transactions;
    }

    public function SellTransactionsOnDate($date)
    {
        $items = Item::all();
        foreach ($items as $item) {
            $transactions = SellTransaction::where('item_id', '=', $item->id)->where('price', '>', '0')->whereDate('created_at', $date)->get();
            $sell_quantity = 0;
            $sell_price = 0;

            foreach ($transactions as $transaction) {
                $sell_quantity += $transaction->quantity;
                $sell_price += ($transaction->quantity * $transaction->price);
            }

            $item->transactions = $transactions;
            $item->sell_quantity = $sell_quantity;
            $item->sell_price = $sell_price;
        }
        return $items;
    }


    public function SellsOnDate($date)
    {
        $sells = Sell::with('transactions', 'customer', 'loan', 'user')->orderBy('created_at', 'DESC')->whereDate('created_at', $date)->get();
        foreach ($sells as $sell) {
            foreach ($sell->transactions as $transact) {
                $transact->item;
            }
        }
        return $sells;
    }

    public function deleteSell($id)
    {
        $sell = Sell::find($id);
        foreach ($sell->transactions as $trans) {
            $transaction = SellTransaction::find($trans->id);
            $item_id = $transaction->item_id;
            $quantity = $transaction->quantity;
            $item = Item::find($item_id);
            $item->remaining = $item->remaining += $quantity;
            $item->save();
            $transaction->delete();
        }
        $loan = $sell->loan;
        if ($loan && $loan->id) {
            $_loan = Loan::find($loan->id);
            $_loan->delete();
        }
        return $sell->delete();
    }
}
