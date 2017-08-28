<?php

namespace IDoc\Models;

class User extends \IDoc\Models\Base\User
{
	protected $hidden = [
		'password',
		'remember_token'
	];

	protected $fillable = [
		'name',
		'email',
		'password',
		'remember_token',
		'role_id',
		'is_active'
	];
}
