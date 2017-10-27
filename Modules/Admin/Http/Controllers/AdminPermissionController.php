<?php
namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Admin\Http\CoreController as Controller;

class AdminPermissionController extends Controller
{

    public $page = 'Admin Permission';
    public function model()
    {
        return new \Admin\Models\AdminPermission();
    }

    public function index(Request $request)
    {

        return $this->render(array('list' => $this->model()->getAll()));
    }
    
    public function grant(Request $request) {
        $this->render();
    }

    public function getList()
    {
        $this->setData(\Setting::all());
    }
//
//    public function saveSetting(Request $request)
//    {
//        \Setting::set($request->get('name'), $request->get('value'));
//        return $this->result;
//    }
//
//    public function delete(Request $request)
//    {
//        \Setting::forget($request->get('name'));
//        return $this->result;
//    }
}
