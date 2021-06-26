<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OtaInstallation extends Model
{
    use \Awobaz\Compoships\Compoships;
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

  public function compiledOperatingSystem()
{
    return $this->hasOne(CompiledOperatingSystem::class, "compilated_so_id", "compilated_so_id");
}
}
