<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WeddingPackage extends Model
{
    protected $fillable = [
        'package'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function weddingPackageItems() {
        return $this->hasMany(WeddingPackageItem::class);
    }
}
