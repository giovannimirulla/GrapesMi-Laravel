<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'logo',
    ];

    public function collaborations(){
        return $this->belongsToMany(User::class, "collaborations",'project_id','user_id','id','id');
    }

}
