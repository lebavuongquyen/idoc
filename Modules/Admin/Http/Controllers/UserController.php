<?php

namespace Admin\Http\Controllers;

use Admin\Http\CoreController as Controller;

class UserController extends Controller
{

    public function profile(\Request $request)
    {
        $this->page = 'Profile';
        return $this->render();
    }

    public function message(\Request $request)
    {
        $this->page = 'Message';
        return $this->render();
    }

}
