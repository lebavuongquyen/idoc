<?php
/**
 * Created by Reliese Model.
 * Date: Mon, 28 Aug 2017 03:49:00 +0000.
 */
namespace Admin\Models;

use IDoc\Models\Base\AdminPermission as Eloquent;

/**
 * Class AdminPermission
 * 
 * @package IDoc\Models\Base
 */
class AdminPermission extends Eloquent
{

    protected $fillable = [
        'name',
        'group_ids',
        'role_ids',
        'user_ids'
    ];

    public function getGroupsAttribute()
    {
        if (!isset($this->attributes['groups'])) {
            $list = explode(',', $this->group_ids);
            array_walk($list, function(&$item) {
                $item = intval(preg_replace("/\[|\]/", '', $item));
            });
            $names = \IDoc\Models\UserGroup::whereIn('id', $list)->select('name')->get()->toArray();
            $this->attributes['groups'] = array_column($names, 'name');
        }
        return $this->attributes['groups'];
    }

    public function getRolesAttribute()
    {
        if (!isset($this->attributes['roles'])) {
            $list = explode(',', $this->role_ids);
            array_walk($list, function(&$item) {
                $item = intval(preg_replace("/\[|\]/", '', $item));
            });
            $names = \IDoc\Models\UserRole::whereIn('id', $list)->select('name')->get()->toArray();
            $this->attributes['roles'] = array_column($names, 'name');
        }
        return $this->attributes['roles'];
    }

    public function getUsersAttribute()
    {
        if (!isset($this->attributes['users'])) {
            $list = explode(',', $this->role_ids);
            array_walk($list, function(&$item) {
                $item = intval(preg_replace("/\[|\]/", '', $item));
            });
            $names = \IDoc\Models\User::whereIn('id', $list)->select('name')->get()->toArray();
            $this->attributes['users'] = array_column($names, 'name');
        }
        return $this->attributes['users'];
    }

    public function getBannedUsersAttribute()
    {
        if (!isset($this->attributes['banned_users'])) {
            $list = explode(',', $this->banned_user_ids);
            array_walk($list, function(&$item) {
                $item = intval(preg_replace("/\[|\]/", '', $item));
            });
            $names = \IDoc\Models\User::whereIn('id', $list)->select('name')->get()->toArray();
            $this->attributes['banned_users'] = array_column($names, 'name');
        }
        return $this->attributes['banned_users'];
    }

    public static function getAll()
    {
        $list = [];
        foreach (\Route::getRoutes() as $val) {
            $name = $val->getName();
            if ($name && str_is('admin*', $name) && in_array('access_admin', $val->gatherMiddleware())) {
                /**
                 * @var \Admin\Models\AdminPermission
                 */
                $model = self::firstOrCreate(['name' => $name]);
                $model->uri = $val->uri();
                $list[] = $model->allAttributes();
            }
        }
        return $list;
    }

    public function setUriAttribute($value)
    {
        $this->attributes['uri'] = $value;
    }

    public function getUriAttribute()
    {
        return $this->attributes['uri'];
    }

    public function allAttributes()
    {
        return array_merge($this->attributes, [
            'uri' => $this->uri,
            'groups' => $this->groups,
            'roles' => $this->roles,
            'users' => $this->users,
            'banned_users' => $this->banned_users
        ]);
    }
    
    public static function getByName($name) {
        $route = \Route::getRoutes()->getByName($name);
        if (!$route) {
            return null;
        }
        $model = self::firstOrCreate(['name' => $name]);
        $model->uri = $route->uri();
        return $model->allAttributes();
    }
}
