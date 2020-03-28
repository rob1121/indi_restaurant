<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appetizer extends Model
{
    protected $fillable = ['title'];

    protected $hidden = ['created_at', 'updated_at'];

    public function items() {
        return $this->hasMany(AppetizerItem::class);
    }
}
