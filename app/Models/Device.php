<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use \Awobaz\Compoships\Compoships;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
   // protected $primaryKey = array('serial', 'model_number');

    protected $fillable = [
        'model_number',
        'name',
        'version',
        'image',
    ];

  public function registrations(){
        return $this->belongsToMany(Project::class, "registrations",'device_id',"project_id",'id', "id");
    }

    public function board(){
        return $this->hasOne(Board::class, "model_number","model_number");
    }
    public function registration(){
        return $this->hasOne(Registration::class, ["model_number_device", "serial_device"],["model_number", "serial"]);
         }
    public function otaInstallation(){
        return $this->hasMany(OtaInstallation::class, ["model_number_device", "serial_device"],["model_number", "serial"]);
    }
}
