<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'img'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
