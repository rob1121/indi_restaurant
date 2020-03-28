<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Appetizer;
use App\AppetizerItem;

class AppetizerController extends Controller
{
    public function all(Request $request) {
        $appetizers =  Appetizer::with('items')->get();
        return $appetizers->map(function($appetizer) {
            return [
                "title" => $appetizer->title,
                "items" => $appetizer->items->map(function($item) {
                    return $item->item;
                })
            ];
        });
    }

    public function update(Request $request) {

        Appetizer::truncate();
        AppetizerItem::truncate();

        collect($request->appetizers)->map(function($newAppetizers) {
            $appetizer = Appetizer::create([
                'title' => $newAppetizers['title']
            ]);

            collect($newAppetizers['items'])->map(function($item) use($appetizer) {
                AppetizerItem::create([
                    'appetizer_id' => $appetizer->id,
                    'item' => $item
                ]);
            });
        });
    }
}
