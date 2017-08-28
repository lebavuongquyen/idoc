<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 28 Aug 2017 03:49:00 +0000.
 */

namespace IDoc\Models\Base;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class AdminPermission
 * 
 * @property int $id
 * @property string $name
 * @property string $group_ids
 * @property string $role_ids
 * @property string $user_ids
 *
 * @package IDoc\Models\Base
 */
class AdminPermission extends Eloquent
{
	public $timestamps = false;
}
