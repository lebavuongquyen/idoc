<?php

/**
 * Created by Reliese Model.
 * Date: Fri, 25 Aug 2017 08:37:22 +0000.
 */

namespace IDoc\Models\Base;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class PasswordReset
 * 
 * @property string $email
 * @property string $token
 * @property \Carbon\Carbon $created_at
 *
 * @package IDoc\Models\Base
 */
class PasswordReset extends Eloquent
{
	public $incrementing = false;
	public $timestamps = false;
}
