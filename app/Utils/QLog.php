<?php
/*
 * Auth : Watson Le
 * Logger
 */

class QLog {

    const DAILY = 'daily';
    const WEEKLY = 'weekly';
    const MONTHLY = 'monthly';
    const YEARLY = 'yearly';

    public $path = '';
    public $file = '';
    public $type = 'daily';

    public function __construct($config = array()) {
        foreach ($config as $key => $val) {
            if (!empty($val)) {
                $this->$key = $val;
            }
        }
    }

    public function config($config = array()) {
        foreach ($config as $key => $val) {
            if (!empty($val)) {
                $this->$key = $val;
            }
        }
        return $this;
    }

    public static function init($config = array()) {
        return new QLog($config);
    }

    public function path() {
        if (empty(rtrim($this->path, '/'))) {
            $this->path = dirname(__FILE__) . '/../../log/';
        }
        return $this->path;
    }

    public function file() {
        if (empty($this->file)) {
            $this->file = 'test.log';
        }
        return $this->file;
    }

    public function type() {
        if (empty($this->type)) {
            $this->type = QLog::DAILY;
        }
        return $this->type;
    }

    public function typeExt() {
        switch ($this->type()) {
            case QLog::DAILY:
                return date('Y-m-d');
            case QLog::WEEKLY :
                return date('Y') . 'W' . date('W');
            case QLog::MONTHLY :
                return date('Y-m');
            case QLog::YEARLY :
                return date('Y');
            default:
                return '';
        }
    }

    public function prepareFile() {
        $_file = rtrim($this->path(), '/') . '/' . $this->typeExt() . $this->file();
        if (!file_exists($_file)) {
            try {
                $temp = explode('/', $_file);
                unset($temp[count($temp) - 1]);
                $folder = '';
                foreach ($temp as $val) {
                    $folder .= $val . '/';
                    if (!is_dir($folder)) {
                        mkdir($folder);
                        chmod($folder, 0777);
                    }
                }
                fclose(fopen($_file, 'w'));
                chmod($_file, 0777);
            } catch (Exception $ex) {
                QLog::init()->export($ex->getMessage());
                return false;
            }
        }
        return true;
    }

    public static function export($data, $append = FILE_APPEND, $config = array()) {
        if (!empty($config['file'])) {
            $config['file'] = 'test_' . $config['file'];
        } 
        if (!(isset($this) && get_class($this) == __CLASS__)) {
            $obj = new QLog($config);
        } else {
            $obj = $this;
            $obj->config($config);
        }
        if (empty($obj->file)) {
            $obj->file = 'test.log';
        }
        if ($obj->prepareFile()) {
            $file = rtrim($obj->path(), '/') . '/' . $obj->typeExt() . $obj->file();
            file_put_contents($file, var_export($data, true) . PHP_EOL, $append);
            return true;
        }
        return false;
    }

    public static function error($data, $curFile = '', $config = array()) {
        if (!empty($config['file'])) {
            $config['file'] = 'error_' . $config['file'];
        } 
        if (!(isset($this) && get_class($this) == __CLASS__)) {
            $obj = new QLog($config);
        } else {
            $obj = $this;
            $obj->config($config);
        }
        if (empty($obj->file)) {
            $obj->file = 'error.log';
        }
        if ($obj->prepareFile()) {
            $content = '[' . date('Y-m-d H:i:s') . '] ' . $curFile . ' : ' . PHP_EOL;
            $content .= self::toString($data);
            $file = rtrim($obj->path(), '/') . '/' . $obj->typeExt() . $obj->file();
            file_put_contents($file, $content . PHP_EOL, FILE_APPEND);
            return true;
        }
        return false;
    }

    public static function log($data, $curFile = '', $config = array()) {
        if (!empty($config['file'])) {
            $config['file'] = 'log_' . $config['file'];
        }
        else {
            $config['file'] = 'log.log';
        }
        if (!(isset($this) && get_class($this) == __CLASS__)) {
            $obj = new QLog($config);
        } else {
            $obj = $this;
            $obj->config($config);
        }
        if (empty($obj->file)) {
            $obj->file = 'log.log';
        }
        if ($obj->prepareFile()) {
            $content = '[' . date('Y-m-d H:i:s') . '] ' . $curFile . ' : ';
            $content .= self::toString($data);
            $file = rtrim($obj->path(), '/') . '/' . $obj->typeExt() . $obj->file();
            file_put_contents($file, $content, FILE_APPEND);
            return true;
        }
        return false;
    }

    public static function toString($data) {
        $content = '';
        if (is_string($data) || is_numeric($data)) {
            $content .=  $data.PHP_EOL;
        }
        if (is_array($data)) {
            $content = '';
            foreach ($data as $key=>$val) {
                if (is_string($data) || is_numeric($data)) {
                    $content .= $data.PHP_EOL;
                } else {
                    $content .= $key . ":" .json_encode($val).PHP_EOL;
                }
            }
        }
        if (is_object($data)) {
            return var_export($data, true).PHP_EOL;
        }
        return $content;
    }

    public static function exception($ex , $config = array()) {
        if (empty($config['file'])) {
            $config['file'] = 'exception.log';
        }
        self::error($ex->getMessage(), $ex->getFile(), $config);
    }
}
