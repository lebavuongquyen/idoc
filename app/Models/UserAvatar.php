<?php

namespace IDoc\Models;
use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserAvatar
 * 
 * @property int $id
 * @property string $link
 * @property int $user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
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
