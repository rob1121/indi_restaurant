<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BanquetFacility;
use Image;
use Storage;

class BanquetFacilityController extends Controller
{
    public function all() {
        return BanquetFacility::all()->map(function($banquetFacility) {
            return [
                'uid' => $banquetFacility->id,
                'type' => $banquetFacility->type,
                'url' =>  Storage::url('images/'.$banquetFacility->img),
                'thumbUrl' =>  Storage::url('thumbnail/'.$banquetFacility->img),
                'status' =>  "done"
            ];
        });
    }

    public function store(Request $request) {
        $originalImage= $request->file('file');
        $thumbnailImage = Image::make($originalImage);
        $thumbnailPath = public_path('thumbnail/');
        $originalPath = public_path('images/');

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

        $banquetFacility = BanquetFacility::create([
            'type' => $request->type,
            'img' => $imgName
        ]);

        return [
            'uid' => $banquetFacility->id,
            'type' => $banquetFacility->type,
            'url' =>  Storage::url('images/'.$banquetFacility->img),
            'thumbUrl' =>  Storage::url('thumbnail/'.$banquetFacility->img),
            'status' =>  "done"
        ];
    }

    public function destroy($id) {
        $banquetFacility =  BanquetFacility::find($id);
       Storage::delete('images/'.$banquetFacility->img);
       Storage::delete('thumbnail/'.$banquetFacility->img);
       $banquetFacility->delete();
    }
}
