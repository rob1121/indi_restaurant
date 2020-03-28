<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Reserve;

class ReserveController extends Controller
{
    public function index() {
        return Reserve::all();
    }

    public function store(Request $request) {
        $reserve = new Reserve();
        $reserve->name = $request->name;
        $reserve->number = $request->number;
        $reserve->email = $request->email;
        $reserve->reserve_date = $request->reserve_date;
        $reserve->count = $request->count;
        $reserve->save();
        return $reserve;
    }

    public function update($id, Request $request) {
        $reserve = Reserve::find($id);
        $reserve->name = $request->name;
        $reserve->number = $request->number;
        $reserve->email = $request->email;
        $reserve->reserve_date = $request->reserve_date;
        $reserve->count = $request->count;
        $reserve->status = $request->status;
        $reserve->save();

        return $reserve;
    }

    public function destroy($id) {
        $reserve = Reserve::find($id);
        $reserve->delete();
    }
}
