<?php

/**
 * Created by Reliese Model.
 * Date: Fri, 25 Aug 2017 08:37:22 +0000.
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
