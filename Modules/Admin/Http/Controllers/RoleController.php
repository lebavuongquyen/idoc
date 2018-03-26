<?php
namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Admin\Http\CoreController as Controller;

class RoleController extends Controller
{

    public $page = 'Roles';

    public function model()
    {
        return new \Admin\Models\UserRole();
    }

    public function modelWith()
    {
        return ['group' , 'pr'];
    }
    
    public function additionalData($id = null)
    {
        $data = [];
        if (\Setting::get('admin:role_parent_to_children')) {
            if ($id) {
                $descendantsIds = $this->model()->descendantsIds([$id], [$id]);
                $data['parents'] = $this->model()->whereNotIn('id', $descendantsIds)->get();
            }
        }
        else {
            $data['parents'] = $this->model()->where('id' , '<>' , $id)->get();
        }
        
        $data['groups'] = \Admin\Models\UserGroup::orderBy('name')->get();
        return $data;
    }
    
}
