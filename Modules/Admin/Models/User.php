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
    use \IDoc\Models\Attributes\User;
    use \IDoc\Models\Attributes\Treeable;
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
     * 
     * @param string $name
     * @return bool
     */
    public function isAllowed($name)
    {
        if ($this->role->group->id === 1) {
            return true;
        }
        return in_array($name, $this->permissions());
    }

    /**
     * 
     * @return \Illuminate\Support\Collection
     */
    public function permissions()
    {
        if (!isset($this->_permissions)) {
            $this->_permissions = AdminPermission::where(function($query) {
                        $query->whereNull('banned_user_ids')
                        ->orWhere('banned_user_ids', 'not like', "%" . brace($this->id) . "%");
                    })
                    ->where(function($query) {
                        $query->where('group_ids', 'like', "%" . brace($this->group->id) . "%")
                        ->orWhere('role_ids', 'like', "%" . brace($this->role->id) . "%")
                        ->orWhere('user_ids', 'like', "%" . brace($this->id) . "%");
                    })
                    ->select('name')
                    ->get()->transform(function($item, $key) {
                    return $item->name;
                })->toArray();
        }
        return $this->_permissions;
    }
}
