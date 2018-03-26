<?php

namespace Admin\Models;

class UserRole extends \IDoc\Models\Base\UserRole
{
    use \IDoc\Models\Attributes\Treeable;
	protected $fillable = [
		'name',
		'short_name',
		'group_id',
        'parent_id'
	];
    
    public function group(){
        return $this->belongsTo(UserGroup::class,'group_id');
    }
    
    public function users(){
        return $this->hasMany(User::class , 'role_id');
    }
}
