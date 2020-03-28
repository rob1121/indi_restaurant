<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PromoPackage;
use App\PromoPackageItem;

class PromoPackageController extends Controller
{
    public function all() {
        $packages =  PromoPackage::with('items')->get();
        return $packages->map(function($package) {
            return [
                "title" => $package->title,
                "price" => $package->price,
                "items" => $package->items->map(function($item) {
                    return $item->item;
                })
            ];
        });
    }

    public function update(Request $request) {
        PromoPackage::truncate();
        PromoPackageItem::truncate();

        collect($request->packages)->map(function($newPackage) {
            $package = PromoPackage::create([
                'title' => $newPackage['title'],
                'price' => $newPackage['price']
            ]);
            $data = collect($newPackage['items'])->map(function($item) use($package) {
                return [
                    'promo_package_id' => $package->id,
                    'item' => $item
                ];
            });

            PromoPackageItem::insert($data->toArray());
        });
    }
}
