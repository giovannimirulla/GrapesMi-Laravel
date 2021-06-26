<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class CompiledOperatingSystem extends Model
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
 public function base()
{
    return $this->hasOne(OperatingSystem::class, "id", "so_id");
}
}
