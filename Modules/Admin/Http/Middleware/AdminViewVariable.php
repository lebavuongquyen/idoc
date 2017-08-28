<?php

namespace Admin\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminViewVariable
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        \View::composer('*', function($view) use ($request){
            $view->with('module' , \Module::find('admin'));
            $view->with('user' , \Auth::user());
        } );
        return $next($request);
    }
}
