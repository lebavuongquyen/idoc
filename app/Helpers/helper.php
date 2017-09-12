<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 * @param type $path
 * @param type $params
 * @return type
 */
function qurl($path = null, $params = null)
{
//    return secure_url($path , $params);
    return url($path, $params);
}

function qasset($path)
{
//    return secure_asset($path);
    return asset(ltrim($path, '/'));
}

function brace($str)
{
    return sprintf("[%s]", $str);
}

function qcss($path)
{
    return '<link href="' . qasset($path) . '" rel="stylesheet" />';
}

function qjs($path)
{
    return '<script src="' . qasset($path) . '"></script>';
}

if(!function_exists('valueOf')) {
    /**
     * Get value of key in object , array. Return $default if not found
     * @param mixed $haystack
     * @param mixed $needle
     * @param mixed $default
     * @return mixed
     */
    function valueOf($haystack , $needle  , $default = null) {
        if(empty($haystack)) {
            return $default;
        }
        if(is_object($haystack)) {
            return isset($haystack->$needle) ? $haystack->$needle : $default;
        }
        if(is_array($haystack)) {
            return isset($haystack[$needle]) ? $haystack[$needle] : $default;
        }
        return value($haystack);
    }
}