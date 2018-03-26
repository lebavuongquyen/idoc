<?php
namespace Admin\Models;

class UserGroup extends \IDoc\Models\Base\UserGroup
{

    use \IDoc\Models\Attributes\Treeable;

    protected $fillable = [
        'name',
        'short_name',
        'parent_id'
    ];

    public function roles()
    {
        return $this->hasMany(UserRole::class, 'group_id');
    }

    public function users()
    {
        return $this->hasManyThrough(User::class, UserRole::class, 'group_id', 'role_id', 'id');
    }

}
