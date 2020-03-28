<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WeddingPackageItem extends Model
{
    protected $fillable = [
        'wedding_package_id',
        'category',
        'item',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
