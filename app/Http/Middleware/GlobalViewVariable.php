<?php

namespace IDoc\Http\Middleware;

use Closure;

class GlobalViewVariable
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        \View::composer('*', function($view) use ($request){
            list($controller, $action) = explode('@', $request->route()->getActionName());
            /* Remove name space from controller */
//            $controller = preg_replace('/.*\\\/', '', $controller);

            $view->with('controller', $controller);
            $view->with('action', $action);
        } );
        return $next($request);
    }

}
