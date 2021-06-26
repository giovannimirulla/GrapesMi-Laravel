<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegisteredDevice extends Model
{
    use \Awobaz\Compoships\Compoships;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
   // protected $primaryKey = array('serial', 'model_number');

    protected $fillable = [
        'email',
        'nameDevice',
        'versionDevice',
        'imageDevice',
        'nameProject',
        'nameOS'
    ];


}
