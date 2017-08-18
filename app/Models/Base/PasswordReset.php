<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 17 Aug 2017 09:52:56 +0000.
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
