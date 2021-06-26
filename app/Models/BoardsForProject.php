<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class BoardsForProject extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'version',
        'image',
        'nameSO'
    ];
    public function user()
    {
        return $this->hasOne(User::class, "id", "user_id");
    }
}
