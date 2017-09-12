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
        'status'  => 200,
        'data'    => [],
        'message' => 'Success',
        'errors'  => [],
        'total'   => 0
    ];
    public $controller;
    public $action;
    public $name;
    public $page;

    public function __construct()
    {
        $this->setController();
    }

    protected function setController()
    {
        list($this->controller, $this->action) = explode('@', \Route::current()->getActionName());
        $this->controller = preg_replace('/.*\\\/', '', $this->controller);
        $this->name       = strtolower(str_replace('Controller', '', $this->controller));
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('admin::dashboard.index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('admin::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('admin::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit()
    {
        return view('admin::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy()
    {
        
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
        $view = "admin::{$this->name}.{$this->action}";
        return view($view, $data, $mergeData)->with('page' , $this->page);
    }

}
