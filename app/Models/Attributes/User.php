<?php

namespace IDoc\Models\Attributes;

//
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of User
 *
 * @author TDM01
 */
trait User
{

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

    //put your code here
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
        return $this->belongsTo(\IDoc\Models\UserRole::class, 'role_id');
    }

    public function group()
    {
        return $this->belongsToThrough(\IDoc\Models\UserGroup::class, \IDoc\Models\UserRole::class, 'id', null,
                                       [
                \IDoc\Models\UserGroup::class => 'group_id',
                \IDoc\Models\UserRole::class  => 'role_id'
        ]);
    }

    public function pr()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function messages()
    {
        return $this->hasMany(\IDoc\Models\UserMessage::class, 'user_id')->orderBy('id', 'desc');
    }

    public function lastestMessages()
    {
        return $this->hasMany(\IDoc\Models\UserMessage::class, 'user_id')->limit(6)->orderBy('id', 'desc');
    }

    public function getAvatarLinkAttribute()
    {
        return valueOf($this->currentAvatar, 'link', qasset('public/image/no-avatar.png'));
    }

    public function info()
    {
        return $this->hasOne(\IDoc\Models\Base\UserInfo::class, 'user_id');
    }

    public function getAddressAttribute()
    {
        return valueOf($this->info, 'address');
    }

    public function getBirthdayAttribute()
    {
        return valueOf($this->info, 'birthday');
    }

    public function getSchoolAttribute()
    {
        return valueOf($this->info, 'school');
    }

    public function getPhoneAttribute()
    {
        return valueOf($this->info, 'phone');
    }

    public function getHometownAttribute()
    {
        return valueOf($this->info, 'hometown');
    }

    public function getAboutAttribute()
    {
        return valueOf($this->info, 'about');
    }

    public function getReligiousAttribute()
    {
        return valueOf($this->info, 'religious');
    }

    public function getGenderAttribute()
    {
        return valueOf($this->info, 'gender');
    }

}