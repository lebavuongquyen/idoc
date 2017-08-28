<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Debug
 *
 * @author Watson Le
 */

class QDebug {
    public static function dump($data = null , $toJSon = false) {
        if ($data === null) {
            echo 'null';
        }
        if ($toJSon) {
            echo json_encode($data);
        }
        else {
            echo  '<pre>';
            var_dump($data);
            echo '</pre>';
        }
    }
    
    public static function export($data = null , $toJSon = false) {
        if ($data === null) {
            echo 'null';
        }
        if ($toJSon) {
            echo json_encode($data);
        }
        else {
            echo  '<pre>';
            var_export($data);
            echo '</pre>';
        }
    }
    
    public static function out($data = null , $toJSon = false) {
        if ($data === null) {
            echo 'null';
        }
        if ($toJSon) {
            echo json_encode($data);
        }
        else {
            echo  '<pre>';
            print_r($data);
            echo '</pre>';
        }
    }
    
    public static function dumpEnd($data = null , $toJSon = false) {
        self::dump($data, $toJSon);
        die;
    }
    
    public static function exportEnd($data = null , $toJSon = false) {
        self::export($data, $toJSon);
        die;
    }
    
    public static function outEnd($data = null , $toJSon = false) {
        self::out($data, $toJSon);
        die;
    }
    
    public static function jsLog ($data = null) {
        if ($data === null) {
            echo 'null';
        }
        if (is_string($data)) {
            $content = '"'.$data.'"';
        }
        else {
            $content = json_encode($data);
        }
        echo '<script> console.log(' . $content .');</script>';
    }
    
    public static function jsAlert ($data = null) {
        if ($data === null) {
            echo 'null';
        }
        if (is_string($data)) {
            $content = '"'.$data.'"';
        }
        else {
            $content = json_encode($data);
        }
        echo "<script> alert('" . $content ."');</script>";
    }
}
