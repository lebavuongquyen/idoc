<?php

namespace IDoc\Models;
use Reliese\Database\Eloquent\Model as Eloquent;
/**
 * Class Setting
 * 
 * @property int $id
 * @property string $key
 * @property string $value
 *
 * @package IDoc\Models\Base
 */
class Setting extends Eloquent
{
    public $timestamps = false;
    
	protected $fillable = [
		'key',
		'value'
	];
}
