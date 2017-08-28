<?php

namespace IDoc\Models;
use IDoc\Models\Base\UserAvatar as Eloquent;

/**
 * Class UserAvatar
 *
 * @package IDoc\Models\Base
 */
class UserAvatar extends Eloquent
{
    
    use \Illuminate\Database\Eloquent\SoftDeletes;

	protected $casts = [
		'user_id' => 'int'
	];
    
	protected $fillable = [
		'link',
		'user_id'
	];
    
    protected $dates = [
        'created_at' , 'updated_at' , 'deleted_at'
    ];
    
    public function user(){
        return $this->belongsTo('IDoc\Models\User', 'user_id');
    }
}
