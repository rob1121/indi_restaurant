<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PromoPackage extends Model
{
    protected $fillable = [
        'title', 'price'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function items() {
    return $this->hasMany(PromoPackageItem::class);
    }
}
