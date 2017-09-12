<?php

namespace IDoc\Models;

class UserProfile extends \IDoc\Models\Base\UserProfile
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
