<?php

namespace IDoc\Models;

class UserMessage extends \IDoc\Models\Base\UserMessage
{
	protected $fillable = [
		'user_id',
		'content',
		'from_user_id',
		'is_read'
	];
    
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function from(){
        return $this->hasOne(User::class , 'id' , 'from_user_id');
    }
}
