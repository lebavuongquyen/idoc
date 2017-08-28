<?php

namespace Admin\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AccessAdmin
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function __construct()
    {
        
    }

    public function handle(Request $request, Closure $next)
    {
        if (!$this->isAllowed()) {
            \Auth::logout();
            return redirect('login')->withErrors(['email' => 'You are not allowed to access this section.']);
        }
        return $next($request);
    }

    protected function getRouteName()
    {
        return \Route::current()->getName();
    }

    protected function isAllowed()
    {
        $user = \Auth::user();
        return $user && $user->isAllowed($this->getRouteName());
    }

}
