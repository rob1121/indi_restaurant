<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'cover', 'title', 'address', 'time', 'contact','visible', 'description'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
