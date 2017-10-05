<?php

namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Admin\Http\CoreController as Controller;
class SettingController extends Controller
{

    public function index(Request $request) {
        $this->page = 'Setting';
        foreach(\Setting::all() as $key=>$val) {
            $list[] = ['name' => $key , 'value' => $val];
        }
        return $this->render(['list'=>$list]);
    }

    public function getList() {
        $this->setData(\Setting::all());
    }
    
    public function save(Request $request){
        \Setting::set($request->get('name') , $request->get('value'));
        return $this->result;
    }
}
