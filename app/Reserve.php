<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reserve extends Model
{
    protected $fillable = [
        'name',
        'number',
        'email',
        'reserve_date',
        'count',
        'status',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

}
