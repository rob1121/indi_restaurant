<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Gallery;
use Image;
use Storage;

class GalleryController extends Controller
{
    public function all() {
        return Gallery::all()->map(function($gallery) {
            return [
                'uid' => $gallery->id,
                'url' =>  Storage::url('menu/images/'.$gallery->img),
                'thumbUrl' =>  Storage::url('menu/thumbnail/'.$gallery->img),
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

        $gallery = Gallery::create([
            'img' => $imgName
        ]);

        return [
            'uid' => $gallery->id,
            'type' => $gallery->type,
            'url' =>  Storage::url('menu/images/'.$gallery->img),
            'thumbUrl' =>  Storage::url('menu/thumbnail/'.$gallery->img),
            'status' =>  "done"
        ];
    }

    public function destroy($id) {
        $gallery =  Gallery::find($id);
       Storage::delete('menu/images/'.$gallery->img);
       Storage::delete('menu/thumbnail/'.$gallery->img);
       $gallery->delete();
    }
}
