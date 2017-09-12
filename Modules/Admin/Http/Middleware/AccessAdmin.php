<?php

namespace Admin\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AccessAdmin
{
    protected $main = 'admin/dashboard';


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
            if($this->main === $this->getRouteName()) {
                \Auth::logout();
                return redirect('login')->withErrors(['email' => 'You are not allowed to access this section.']);
            }
            else {
                abort(403, 'Use are not allowed to access this page.');
            }
        }
        return $next($request);
    }

    protected function getRouteName()
    {
        return \Route::current()->getName();
    }

    protected function isAllowed()
    {
        if ($this->getRouteName() === 'Closure') {
            return true;
        }
        $user = \Auth::user();
        return $user && $user->isAllowed($this->getRouteName());
    }

}
