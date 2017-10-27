<?php
namespace Admin\Http\Controllers;

use Admin\Http\CoreController as Controller;

class GroupController extends Controller
{

    public $page = 'Groups';

    public function model()
    {
        return new \Admin\Models\UserGroup();
    }

    public function modelWith()
    {
        return ['pr'];
    }

    public function additionalData($id = null)
    {
        $data = [];
        if (\Setting::get('admin:group_parent_to_children')) {
            if ($id) {
                $descendantsIds = $this->model()->descendantsIds([$id], [$id]);
                $data['parents'] = $this->model()->whereNotIn('id', $descendantsIds)->get();
            }
        }

        $data['parents'] = $this->model()->all();
        return $data;
    }
}
