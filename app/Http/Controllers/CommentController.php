<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function all()
    {
        return Comment::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request) {
        Comment::create($request->all());
    }

    public function update($id, Request $request) {
        $comment = Comment::find($id);
        $comment->name = $request->name;
        $comment->message = $request->message;
        $comment->visible = $request->visible;
        $comment->save();
    }

    public function destroy($id) {
        $comment = Comment::find($id);
        $comment->delete();
    }
}
