<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BanquetFacility extends Model
{

    protected $fillable = [
        'type', 'img'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
