<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PartyTray extends Model
{
    protected $fillable =[
       'tray',
       'veg',
       'non_veg',
       'seafood',
       'bread',
       'rice',
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
