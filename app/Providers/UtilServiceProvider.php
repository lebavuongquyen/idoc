<?php

namespace IDoc\Providers;

use Illuminate\Support\ServiceProvider;

class UtilServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        foreach (glob(app_path() . '/Utils/*.php') as $filename) {
            require_once($filename);
        }
    }
}
