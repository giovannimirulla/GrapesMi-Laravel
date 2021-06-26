<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use \Awobaz\Compoships\Compoships;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'seria.device',
        'numer_model_device',
        'project_id'
    ];

    public function device(){
        return $this->belongsTo(Device::class,["model_number_device", "serial_device"],["model_number", "serial"]);
    }
}
