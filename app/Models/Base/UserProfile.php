<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 31 Aug 2017 03:04:52 +0000.
 */

namespace IDoc\Models\Base;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserInfo
 * 
 * @property int $id
 * @property int $user_id
 * @property string $address
 * @property string $school
 * @property string $phone
 * @property string $hometown
 * @property string $about
 * @property string $religious
 * @property string $gender
 *
 * @package IDoc\Models\Base
 */
class UserProfile extends Eloquent
{
	protected $table = 'user_profiles';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int'
	];
}
