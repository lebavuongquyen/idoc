<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 28 Aug 2017 10:09:15 +0000.
 */

namespace IDoc\Models\Base;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserMessage
 * 
 * @property int $id
 * @property int $user_id
 * @property string $content
 * @property int $from_user_id
 * @property int $is_read
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package IDoc\Models\Base
 */
class UserMessage extends Eloquent
{
	protected $casts = [
		'user_id' => 'int',
		'from_user_id' => 'int',
		'is_read' => 'int'
	];
}
