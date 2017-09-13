<?php

namespace Admin\Http\Controllers;

use Admin\Http\CoreController as Controller;

class SettingController extends Controller
{

    public function index(\Request $request) {
        $this->page = 'Setting';
        foreach(\Setting::all() as $key=>$val) {
            $list[] = ['name' => $key , 'value' => $val];
        }
        return $this->render(['list'=>$list]);
    }

    public function getList() {
        $this->setData(\Setting::all());
    }
}
