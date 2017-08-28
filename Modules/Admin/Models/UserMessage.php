<?php

namespace Admin\Models;

class UserMessage extends \IDoc\Models\Base\UserMessage
{
	protected $fillable = [
		'user_id',
		'content',
		'from_user_id',
		'is_read'
	];
}
