<?php

namespace IDoc\Models;

class AdminPermission extends \IDoc\Models\Base\AdminPermission
{
	protected $fillable = [
		'name',
		'group_ids',
		'role_ids',
		'user_ids'
	];
}
