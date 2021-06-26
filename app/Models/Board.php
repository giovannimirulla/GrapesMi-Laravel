<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'model_number',
        'name',
        'version',
        'image',
    ];

    public function compatibilities(){                       
        return $this->belongsToMany(OperatingSystem::class, "compatibilities",'model_number_board','so_id','model_number','id');
    }

    public function data(){
        return $this->hasOne(DataBoard::class, "model_number","model_number");
    }
 public function devices(){
     return $this->hasMany(Device::class, "model_number", "model_number");
 }

}
