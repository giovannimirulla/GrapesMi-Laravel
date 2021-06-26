<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class DataUser extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "user_id"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
