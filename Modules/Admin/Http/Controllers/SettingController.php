<?php

namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Admin\Http\CoreController as Controller;
class SettingController extends Controller
{

    public function index(Request $request) {
        $this->page = 'Setting';
        $list = [];
        foreach(\Setting::all() as $key=>$val) {
            $list[] = ['name' => $key , 'value' => $val];
        }
        return $this->render(['list'=>$list]);
    }

    public function getList() {
        $this->setData(\Setting::all());
    }
    
    public function store(Request $request){
        \Setting::set($request->get('name') , $request->get('value'));
        return $this->result;
    }
    
    public function delete(Request $request) {
        \Setting::forget($request->get('name'));
        return $this->result;
    }
}
