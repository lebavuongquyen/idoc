<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 17 Aug 2017 09:06:18 +0000.
 */

namespace IDoc\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

/**
 * Class User
 * 
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property int $role_id
 * @property int $is_active
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 *
 * @package App\Models
 */
class User extends Eloquent implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{
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
    protected $dates = ['approval_date','created_at', 'updated_at', 'deleted_at' ];
    
    public function avatars(){
        return $this->hasMany('IDoc\Models\UserAvatar', 'user_id')->orderBy('id','desc');
    }

    public function currentAvatar(){
        return $this->hasOne('IDoc\Models\UserAvatar', 'user_id')->orderBy('id' , 'desc');
    }
}
