<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'name', 'message'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
