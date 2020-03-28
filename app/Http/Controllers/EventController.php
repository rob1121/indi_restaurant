<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use Image;
use Storage;
use Validator;

class EventController extends Controller
{
    public function index() {
        return Event::orderBy('created_at', 'desc')->get()->map(function($event) {
            return [
                'cover' => '/event/images/'.$event->cover,
                'cover_thumbnail' => '/event/thumbnail/'.$event->cover,
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'address' => $event->address,
                'time' => $event->time,
                'contact' => $event->contact,
                'visible' => $event->visible,
            ];
        });
    }

    public function update($id, Request $request) {
        $event = Event::find($id);
        if($request->hasFile('cover')) {
            $validator = Validator::make($request->all(), [
                'cover' => 'image',
            ]);

            if ($validator->fails()) {
                return response([
                    'errors' => $validator->errors(),
                ], 400);
            }

            $originalImage= $request->file('cover');
            $thumbnailImage = Image::make($originalImage);
            $thumbnailPath = public_path('event/thumbnail/');
            $originalPath = public_path('event/images/');

            if (!file_exists($thumbnailPath)) {
                mkdir($thumbnailPath);
            }

            if (!file_exists($originalPath)) {
                mkdir($originalPath);
            }

            Storage::delete('event/images/'.$event->cover);
            Storage::delete('event/thumbnail/'.$event->cover);
            $imgName = time().$originalImage->getClientOriginalName();

            $thumbnailImage->save($originalPath.$imgName);
            $thumbnailImage->resize(150,150);
            $thumbnailImage->save($thumbnailPath.$imgName);

            $event->cover = $imgName;
        }

        $event->title = $request->title;
        $event->description = $request->description;
        $event->address = $request->address;
        $event->time = $request->time;
        $event->contact = $request->contact;
        $event->visible = $request->visible;
        $event->save();
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'cover' => 'required|image',
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors(),
            ], 400);
        }

        $originalImage= $request->file('cover');
        $thumbnailImage = Image::make($originalImage);
        $thumbnailPath = public_path('event/thumbnail/');
        $originalPath = public_path('event/images/');

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

        $event = new Event($request->all());
        $event->cover = $imgName;
        $event->save();
    }

    public function destroy($id) {
        $event = Event::find($id);
        Storage::delete('event/images/'.$event->cover);
        Storage::delete('event/thumbnail/'.$event->cover);
        $event->delete();
    }
 }
