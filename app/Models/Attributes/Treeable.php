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
trait Treeable
{

    protected $_descendants;

    public function pr()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function descendants($relations = array())
    {
        if (isset($this->_descendants)) {
            return $this->_descendants;
        }
        if ($this->children->count()) {
            $this->_descendants = self::with($relations)->whereIn(
                    'id', self::descendantsIds($this->childrenIds(), $this->childrenIds())
                )->get();
        }
        else {
            $this->_descendants = [];
        }
        return $this->_descendants;
    }
    
    public function clearDescendants(){
        $this->_descendants = null;
    }

    public function childrenIds()
    {
        return $this->children->map(function($item) {
                return $item->id;
            })->toArray();
    }

    public static function descendantsIds($parent_ids, $final)
    {
        if (empty($parent_ids)) {
            return $final;
        }
        $childrens = self::whereIn('parent_id', $parent_ids)->get();
        if ($childrens->count()) {
            $parent_ids = $childrens->map(function($item) {
                return $item->id;
            });
            $final = array_merge($final, $parent_ids->toArray());
            $final = self::descendantsIds($parent_ids, $final);
        }
        return $final;
    }
    
    protected function changeParentToChildren($parent_id) {
        self::where('parent_id' , $this->id)->update(['parent_id' => null]);
        $this->parent_id = $parent_id;
        return $this->save();
    }
    
    public function changeParent($parent_id) {
        $descendantsIds = self::descendantsIds($this->childrenIds(), $this->childrenIds());
        if(in_array($parent_id, $descendantsIds)) {
            return $this->changeParentToChildren($parent_id);
        }
        $this->parent_id = $parent_id;
        return $this->save();
    }
}
