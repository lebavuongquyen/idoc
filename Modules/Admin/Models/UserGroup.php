<?php

namespace Admin\Models;

class UserGroup extends \IDoc\Models\Base\UserGroup
{
	protected $fillable = [
		'name',
		'short_name'
	];
    
    public function roles(){
        return $this->hasMany(UserRole::class, 'group_id');
    }
    
    public function users(){
        return $this->hasManyThrough(User::class, UserRole::class,'group_id' , 'role_id' , 'id' );
    }
    
    public function pr() {
        return $this->belongsTo(self::class , 'parent_id');
    }
}
