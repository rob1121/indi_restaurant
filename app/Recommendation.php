<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recommendation extends Model
{
    public function contacts() {
        return $this->hasMany(Contact::class);
    }
}
