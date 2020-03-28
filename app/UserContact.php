<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserContact extends Model
{

  protected $fillable = [
    'type', 'contact', 'user_id'
  ];
}