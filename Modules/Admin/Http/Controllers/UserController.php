<?php

namespace Admin\Http\Controllers;

use Admin\Http\CoreController as Controller;

class UserController extends Controller
{

    public function profile(\Request $request)
    {
        return view('admin::user.index');
    }

}
