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
    
    public function groups(){
        
    }
    
    public function roles(){
        
    }
    
    public function users(){
        
    }
}
