<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 28 Aug 2017 03:49:00 +0000.
 */

namespace IDoc\Models\Base;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserRole
 * 
 * @property int $id
 * @property string $name
 * @property string $short_name
 * @property string $group_id
 * @property string $deleted_at
 *
 * @package IDoc\Models\Base
 */
class UserRole extends Eloquent
{
	use \Illuminate\Database\Eloquent\SoftDeletes;
	public $timestamps = false;
}
