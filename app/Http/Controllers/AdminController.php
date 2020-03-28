<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\UserContact;

class AdminController extends Controller
{
    public function edit($id) {
        return User::whereId($id)->with('contacts')->first();
    }

    public function update($id, Request $request) {
        $userContact = UserContact::whereUserId($id);
        $userContact->delete();

        foreach($request->contacts as $contact) {
            UserContact::create([
                'user_id' => $id,
                'type' => $contact['type'],
                'contact' => $contact['contact'],
            ]);
        }

        $admin = User::find($id);
        $admin->name = $request->name;
        $admin->address = $request->address;
        $admin->email = $request->email;
        $admin->longitude = $request->longitude;
        $admin->latitude = $request->latitude;
        $admin->save();

        return $admin;
    }
}
