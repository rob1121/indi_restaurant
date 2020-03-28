<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'img'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
