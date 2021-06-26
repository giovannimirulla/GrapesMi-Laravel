<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class DataBoard extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'CPU',
        'GPU',
        'RAM',
        'Storage',
        'WiFi',
        'Bluetooth',
    ];

     /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'model_number',
    ];
    public function baord(){
        return $this->belongsTo(Board::class, "model_number","model_number");
    }
}
