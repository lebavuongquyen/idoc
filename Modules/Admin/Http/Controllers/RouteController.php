<?php
namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Admin\Http\CoreController as Controller;

class RouteController extends Controller
{

    public function model()
    {
        return new \Admin\Models\AdminPermission();
    }

    public function index(Request $request)
    {
        $this->page = 'Routes';
        /**
         * @var \Illuminate\Routing\Route[] Description
         */
        $list = [];
        foreach (\Route::getRoutes() as $val) {
            $name = $val->getName();
            if ($name && str_is('admin*', $name) && in_array('access_admin', $val->gatherMiddleware())) {
                $list[] = [
                    'name' => $name,
                    'uri' => $val->uri(),
                ];
            }
        }
        return $this->render(array('list' => $list));
    }

    public function getList()
    {
        $this->setData(\Setting::all());
    }

    public function save(Request $request)
    {
        \Setting::set($request->get('name'), $request->get('value'));
        return $this->result;
    }

    public function delete(Request $request)
    {
        \Setting::forget($request->get('name'));
        return $this->result;
    }
}
