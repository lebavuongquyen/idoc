<?php

/**
 * Created by Reliese Model.
 * Date: Fri, 25 Aug 2017 08:37:22 +0000.
 */

namespace IDoc\Models\Base;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class User
 * 
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 *
 * @package IDoc\Models\Base
 */
class User extends Eloquent
{
	use \Illuminate\Database\Eloquent\SoftDeletes;
}
