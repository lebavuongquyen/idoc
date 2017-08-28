<?php

namespace Admin\Models;

class UserRole extends \IDoc\Models\Base\UserRole
{
	protected $fillable = [
		'name',
		'short_name',
		'group_id'
	];
    
    public function group(){
        return $this->belongsTo(UserGroup::class,'group_id');
    }
    
    public function pr() {
        return $this->belongsTo(self::class , 'parent_id');
    }
}
