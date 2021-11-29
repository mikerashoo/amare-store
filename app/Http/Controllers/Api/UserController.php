<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Buy;
use App\Models\LoanPayment;
use App\Models\Sell;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        foreach ($users as $key => $user) {
            $user->has_data = $this->checkIfUserHasData($user->id);
        }
        return $users;
    }

    public function create(Request $request)
    {
        $user = new User;
        $user->name = $request->name;
        $user->user_name = $request->user_name;
        $user->role = $request->role;
        $user->password = Hash::make('werkama123');
        $id = $user->save();
        return User::find($id);
    }

    public function update(Request $request)
    {
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->user_name = $request->user_name;
        $user->role = $request->role;
        $id = $user->save();
        return User::find($request->id);
    }

    public function delete($id)
    {
        $user = User::find($id);
        $has_data = $this->checkIfUserHasData($id);
        if ($has_data) {
            $user->is_active = $user->is_active == 0 ? 1 : 0;
            $user->save();
            return $user->is_active == 0 ? "deactivated " : "activated";
        } else {
            $user->delete();
            return "deleted";
        }
    }

    public function checkIfUserHasData($id)
    {
        $sell_count = count(Sell::where('user_id', $id)->get());
        $buy_count = count(Buy::where('user_id', $id)->get());
        $loan_payment_count = count(LoanPayment::where('user_id', $id)->get());
        if ($sell_count != 0 || $buy_count != 0 || $loan_payment_count) {
            return true;
        }
        return false;
    }
}
