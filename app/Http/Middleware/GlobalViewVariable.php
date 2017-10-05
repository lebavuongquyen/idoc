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
            if ($request->route() && $request->route()->getActionName() !== 'Closure') {
                list($controller, $action) = explode('@', $request->route()->getActionName());
            }
            else {
                $controller  = $action = null;
            }
            /* Remove name space from controller */
//            $controller = preg_replace('/.*\\\/', '', $controller);

            $view->with('controller', $controller);
            $view->with('action', $action);
        } );
        return $next($request);
    }

}
