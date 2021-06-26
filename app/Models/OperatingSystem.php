<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class OperatingSystem extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'icon',
    ];

    public function compatibilities(){
        return $this->belongsToMany(Board::class, "compatibilities",'so_id','model_number_board','model_number','id');
    }
}
