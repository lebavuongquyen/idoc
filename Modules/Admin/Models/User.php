<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 17 Aug 2017 09:06:18 +0000.
 */

namespace Admin\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

/**
 * @package App\Models
 */
class User extends \IDoc\Models\Base\User implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{

    use \Znck\Eloquent\Traits\BelongsToThrough;
    use \Illuminate\Database\Eloquent\SoftDeletes;
    use Authenticatable,
        Authorizable,
        CanResetPassword,
        Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be convert as datetime object.
     *
     * @var array
     */
    protected $dates = ['approval_date', 'created_at', 'updated_at', 'deleted_at'];

    /**
     * List route user can access
     * @return string[]
     */
    private $_permissions;

    /**
     * List messages of user
     * @return string[]
     */
    private $_messages;

    public function avatars()
    {
        return $this->hasMany(\IDoc\Models\UserAvatar::class, 'user_id')->orderBy('id', 'desc');
    }

    public function currentAvatar()
    {
        return $this->hasOne(\IDoc\Models\UserAvatar::class, 'user_id')->orderBy('id', 'desc');
    }

    public function role()
    {
        return $this->belongsTo(UserRole::class, 'role_id');
    }

    public function group()
    {
        return $this->belongsToThrough(UserGroup::class, UserRole::class, 'id', null,
                                       [
                UserGroup::class => 'group_id',
                UserRole::class  => 'role_id'
        ]);
    }

    public function pr()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * 
     * @param string $name
     * @return bool
     */
    public function isAllowed($name)
    {
        return in_array($name, $this->permissions());
    }

    /**
     * 
     * @return \Illuminate\Support\Collection
     */
    public function permissions()
    {
        if (!isset($this->_permissions)) {
            $this->_permissions = AdminPermission::where('group_ids', 'like', "%" . brace($this->group->id) . "%")
                    ->orWhere('role_ids', 'like', "%" . brace($this->role->id) . "%")
                    ->orWhere('user_ids', 'like', "%" . brace($this->id) . "%")
                    ->select('name')
                    ->get()->transform(function($item, $key) {
                    return $item->name;
                })->toArray();
        }
        return $this->_permissions;
    }
    
}
