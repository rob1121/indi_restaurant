<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\WeddingPackage;
use App\WeddingPackageItem;

class WeddingPackageController extends Controller
{
    public function all() {
        $packages =  WeddingPackage::with('weddingPackageItems')->get();
        return $packages->map(function($package) {
            return [
                "package" => $package->package,
                "items" => $package->weddingPackageItems
            ];
        });
    }

    public function update(Request $request) {
        WeddingPackage::truncate();
        WeddingPackageItem::truncate();

        collect($request->packages)->map(function($newPackage) {
            $package = WeddingPackage::create([
                'package' => $newPackage['package']
            ]);

            $data = collect($newPackage['items'])->map(function($item) use($package) {
                return [
                    'wedding_package_id' => $package->id,
                    'item' => $item['item'],
                    'category' => $item['category'],
                ];
            });
            WeddingPackageItem::insert($data->toArray());
        });
    }
}
