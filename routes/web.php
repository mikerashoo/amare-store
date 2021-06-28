<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
    

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/admin', [App\Http\Controllers\AdminController::class, 'index'])->name('admin_home');
Route::get('/superadmin', [App\Http\Controllers\SuperAdminController::class, 'index'])->name('superadmin_home');
Route::get('/superadmin/{any}', [App\Http\Controllers\SuperAdminController::class, 'index']);
Route::get('/keeper', [App\Http\Controllers\HomeController::class, 'keeper'])->name('keeper_home');
Route::get('/keeper/{any}', [App\Http\Controllers\HomeController::class, 'keeper']);
Route::get('/{any}', [App\Http\Controllers\HomeController::class, 'index']);
