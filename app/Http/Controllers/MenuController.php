<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menu;
use Image;
use Storage;

class MenuController extends Controller
{
    public function all() {
        return Menu::all()->map(function($menu) {
            return [
                'uid' => $menu->id,
                'url' =>  Storage::url('menu/images/'.$menu->img),
                'thumbUrl' =>  Storage::url('menu/thumbnail/'.$menu->img),
                'status' =>  "done"
            ];
        });
    }

    public function store(Request $request) {
        $originalImage= $request->file('file');
        $thumbnailImage = Image::make($originalImage);
        $thumbnailPath = public_path('menu/thumbnail/');
        $originalPath = public_path('menu/images/');

        if (!file_exists($thumbnailPath)) {
            mkdir($thumbnailPath);
        }

        if (!file_exists($originalPath)) {
            mkdir($originalPath);
        }
        $imgName = time().$originalImage->getClientOriginalName();
        $thumbnailImage->save($originalPath.$imgName);
        $thumbnailImage->resize(150,150);
        $thumbnailImage->save($thumbnailPath.$imgName);

        $menu = Menu::create([
            'img' => $imgName
        ]);

        return [
            'uid' => $menu->id,
            'type' => $menu->type,
            'url' =>  Storage::url('menu/images/'.$menu->img),
            'thumbUrl' =>  Storage::url('menu/thumbnail/'.$menu->img),
            'status' =>  "done"
        ];
    }

    public function destroy($id) {
        $menu =  Menu::find($id);
       Storage::delete('menu/images/'.$menu->img);
       Storage::delete('menu/thumbnail/'.$menu->img);
       $menu->delete();
    }
}
