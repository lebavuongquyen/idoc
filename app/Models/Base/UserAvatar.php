<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 28 Aug 2017 03:49:00 +0000.
 */

namespace IDoc\Models\Base;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserAvatar
 * 
 * @property int $id
 * @property string $link
 * @property int $user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 *
 * @package IDoc\Models\Base
 */
class UserAvatar extends Eloquent
{
	use \Illuminate\Database\Eloquent\SoftDeletes;

	protected $casts = [
		'user_id' => 'int'
	];
}
