<?php

namespace IDoc\Models;

class UserProfiles extends \IDoc\Models\Base\UserInfo
{
	protected $fillable = [
		'user_id',
		'address',
		'school',
		'phone',
		'hometown',
		'about',
		'religious',
		'gender'
	];
    
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
