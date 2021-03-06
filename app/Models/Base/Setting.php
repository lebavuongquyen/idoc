<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 28 Aug 2017 03:49:00 +0000.
 */

namespace IDoc\Models\Base;

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
}
