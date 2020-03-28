<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\InquirySent;
use App\Mail\InquiryAutoReply;
use App\User;
use Mail;

class InquiryController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $admin = User::first();

        Mail::to($admin->email)->send(new InquirySent($request));
        Mail::to($request->email)->send(new InquiryAutoReply($request));
    }
}
