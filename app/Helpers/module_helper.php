<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if (!function_exists('module_path')) {

    function module_path($module)
    {
        return realpath(base_path() . '/Modules/' . ucfirst($module));
    }

}

function module_asset_path($module)
{
    return realpath(module_path($module) . '/Assets');
}

function module_asset_url($module) {
    return qurl('/').'/'.strtolower(Module::get($module)).'/assets';
}


function module_asset($url) {
    list($module , $path) = explode(':', $url);
    return module_asset_url($module).'/' . ltrim($path , '/');
}
