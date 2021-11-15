<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [App\Http\Controllers\Api\UserController::class, 'index']);
Route::post('/new_user', [App\Http\Controllers\Api\UserController::class, 'create']);

Route::get('/item_categories', [App\Http\Controllers\Api\ItemController::class, 'categories']);

Route::group(['prefix' => 'categories'], function () {
    Route::get('all', [App\Http\Controllers\Api\ItemController::class, 'categories']);
    Route::get('detail/{id}', [App\Http\Controllers\Api\ItemController::class, 'categoryDetail']);
    Route::post('save', [App\Http\Controllers\Api\ItemController::class, 'saveCategory']);
    Route::delete('delete/{id}', [App\Http\Controllers\Api\ItemController::class, 'deleteCategory']);
});

Route::group(['prefix' => 'items'], function () {
    Route::get('all', [App\Http\Controllers\Api\ItemController::class, 'categories']);
    Route::get('detail/{id}', [App\Http\Controllers\Api\ItemController::class, 'categoryDetail']);
    Route::post('save', [App\Http\Controllers\Api\ItemController::class, 'save']);
    Route::post('update', [App\Http\Controllers\Api\ItemController::class, 'update']);
    Route::delete('delete/{id}', [App\Http\Controllers\Api\ItemController::class, 'delete']);
    Route::get('daily_transactions/{id}/{date}', [App\Http\Controllers\Api\ItemController::class, 'dailyTransactions']);
    Route::get('weekly_transactions/{id}/{start_date}/{end_date}', [App\Http\Controllers\Api\ItemController::class, 'weeklyTransactions']);
});
Route::group(['prefix' => 'units'], function () {
    Route::get('all', [App\Http\Controllers\Api\UnitController::class, 'index']);
    Route::post('save', [App\Http\Controllers\Api\UnitController::class, 'save']);
    Route::delete('delete/{id}', [App\Http\Controllers\Api\UnitController::class, 'delete']);
});


Route::group(['prefix' => 'stocks'], function () {
    Route::get('items', [App\Http\Controllers\Api\StockController::class, 'stockItems']);
    Route::post('newTransaction', [App\Http\Controllers\Api\StockController::class, 'newTransaction']);
    Route::post('new_sell', [App\Http\Controllers\Api\StockController::class, 'newSell']);
    Route::get('customers', [App\Http\Controllers\Api\StockController::class, 'getCustomers']);
    Route::delete('delete_sell/{id}', [App\Http\Controllers\Api\ReportController::class, 'deleteSell']);
    Route::get('weekly_transactions', [App\Http\Controllers\Api\ReportController::class, 'weeklyTransactions']);
});

Route::group(['prefix' => 'keeper_reports'], function () {
    Route::get('transactions', [App\Http\Controllers\Api\ReportController::class, 'transactions']);
    Route::get('sells_on_date/{date}', [App\Http\Controllers\Api\ReportController::class, 'SellsOnDate']);
    Route::get('sell_transactions_on_date/{date}', [App\Http\Controllers\Api\ReportController::class, 'SellTransactionsOnDate']);
});


Route::group(['prefix' => 'loans'], function () {
    Route::get('unpaid_loans', [App\Http\Controllers\Api\LoanController::class, 'getUnpaidLoans']);
    Route::post('save_loan_payment', [App\Http\Controllers\Api\LoanController::class, 'saveLoanPayment']);
    Route::get('todays_loan_payments/{user_id}', [App\Http\Controllers\Api\LoanController::class, 'todaysLoanPayments']);
    Route::get('loan_payments_on_date/{date}/{user_id}', [App\Http\Controllers\Api\LoanController::class, 'loanPaymentsOnDate']);
});
