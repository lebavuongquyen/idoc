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
    
}
