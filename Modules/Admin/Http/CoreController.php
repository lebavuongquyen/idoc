<?php
namespace Admin\Http;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use IDoc\Http\Controllers\Controller;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CoreController
 *
 * @author TDM01
 */
class CoreController extends Controller
{

    protected $result = [
        'status' => 200,
        'data' => [],
        'message' => 'Success',
        'errors' => [],
        'total' => 0
    ];
    protected $item;
    public $controller;
    public $action;
    public $name;
    public $page;
    public $viewPath;

    public function __construct()
    {
        $this->setController();
    }

    protected function setController()
    {
        $routeName = \Route::current()->getActionName();
        if ($routeName !== 'Closure') {
            list($this->controller, $this->action) = explode('@', $routeName);
            $this->controller = preg_replace('/.*\\\/', '', $this->controller);
            $this->name = strtolower(str_replace('Controller', '', $this->controller));
            $this->viewPath = kebab_case(str_replace('Controller', '', $this->controller));
        }
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
        return $this->render();
    }

    /**
     * Get the evaluated view contents for current route.
     * 
     * @param array $data
     * @param array $mergeData
     * @return \Illuminate\View\View | \Illuminate\Contracts\View\Factory
     */
    public function render($data = [], $mergeData = [])
    {
        $view = "admin::{$this->viewPath}.{$this->action}";
        return view($view, $data, $mergeData)->with('page', $this->page);
    }

    /**
     * 
     * @return \Eloquent
     */
    public function model()
    {
        return new \Eloquent;
    }

    /**
     * 
     * @return []
     */
    public function modelWith()
    {
        return [];
    }

    /**
     * 
     * @return \Illuminate\Database\Query\Builder
     */
    public function modelQuery()
    {
        return $this->model()->with($this->modelWith());
    }

    public function modelDefaultScope($query)
    {
        return $query;
    }
    /*
     * @param mixed $data
     */

    public function setData($data)
    {
        $this->result['data'] = $data;
        if (
            empty($this->result['total']) && (
            is_array($data) || is_a($data, 'Illuminate\Database\Eloquent\Collection')
            )
        ) {
            $this->setTotal(count($data));
        }
    }
    /*
     * @param integer $total
     */

    public function setTotal(int $total)
    {
        $this->result['total'] = $total;
    }

    public function get($id = null, Request $request)
    {
        $query = $this->modelDefaultScope($this->modelQuery());
        if ($id) {
            $item = $query->find($id);
            if (!$item) {
                abort(404, 'Item not found!');
            }
            $this->setData($item);
        } else {
            if (!empty($request->get('length'))) {
                $query->limit($request->get('length'));
            }
            if (!empty($request->get('start'))) {
                $query->offset($request->get('start'));
            }

            $list = $query->get();
            $this->setData($list);
            $this->setTotal($this->model()->count());
            $this->dataTable($request);
        }
        return $this->result;
    }

    public function dataTable(Request $request)
    {
        $this->result['draw'] = $request->get('draw');
        $this->result['recordsTotal'] = $this->result['total'];
        $this->result['recordsFiltered'] = $this->result['total'];
        foreach ($this->result['data'] as &$val) {
            $val['row_id'] = 'row_' . $val['id'];
        }
        return $this->result;
    }

    public function getItem($id)
    {
        if (empty($this->item) || $this->item->id != $id) {
            $this->item = $this->modelDefaultScope($this->modelQuery())->find($id);
            if (!$this->item) {
                abort(404, 'Item not found.');
            }
        }

        return $this->item;
    }

    public function prepareNew($model)
    {
        return $model;
    }

    public function additionalData($id = null)
    {
        return [];
    }

    public function create(Request $request)
    {
        return $this->render(['model' => $this->prepareNew($this->model())], $this->additionalData());
    }

    public function update($id, Request $request)
    {
        return $this->render(['model' => $this->getItem($id)], $this->additionalData($id));
    }

    public function view($id, Request $request)
    {
        return $this->render(['model' => $this->getItem($id)], $this->additionalData($id));
    }

    public function save($id = null, Request $request)
    {
        $this->item = $this->model()->updateOrCreate(['id' => $id] , $request->get('model'));
        $this->result['data'] = $this->item->toArray();
        return $this->result;
    }

    public function destroy(Request $request)
    {
        $this->getItem($request->get('id'))->delete();
        return $this->result;
    }

    public function validateUnique(Request $request)
    {

        $query = $this->model()->where($request->get('key'), $request->get('value'));
        if ($request->get('id')) {
            $query->where('id', '<>', $request->get('id'));
        }
        if ($query->count()) {
            $this->result['status'] = 1100;
            $this->result['message'] = 'Has been used.';
        }
        return $this->result;
    }
}
