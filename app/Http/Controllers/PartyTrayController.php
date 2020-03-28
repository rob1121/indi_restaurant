<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PartyTray;

class PartyTrayController extends Controller
{
    public function all() {
        return  PartyTray::all();
    }

    public function update(Request $request) {
        PartyTray::truncate();
        PartyTray::insert(
            collect($request->trays)->toArray()
        );
    }
}
