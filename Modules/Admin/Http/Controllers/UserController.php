<?php
namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Admin\Http\CoreController as Controller;

class UserController extends Controller
{

    public $page = 'User';

    public function model()
    {
        return new \Admin\Models\User;
    }

    public function modelWith()
    {
        return ['role', 'group', 'currentAvatar'];
    }

    public function profile(Request $request)
    {
        $this->page = 'Profile';
        return $this->render();
    }

    public function message(Request $request)
    {
        $this->page = 'Message';
        return $this->render();
    }
}
