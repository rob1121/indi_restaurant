<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PromoPackageItem extends Model
{
    protected $fillable = [
        'item'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
