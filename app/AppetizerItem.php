<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppetizerItem extends Model
{
    protected $fillable = ['item', 'appetizer_id'];

    protected $hidden = ['created_at', 'updated_at'];
}
