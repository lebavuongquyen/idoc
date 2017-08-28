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
function qurl($path = null , $params = null){
//    return secure_url($path , $params);
    return url($path , $params);
}

function qasset($path){
//    return secure_asset($path);
    return asset($path);
}

function brace($str) {
    return sprintf("[%s]", $str);
}