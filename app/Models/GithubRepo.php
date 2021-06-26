<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class GithubRepo extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'user_id',
       'name',
       'description' ,
       'private',
       'url',
       'language'
    ];
}
