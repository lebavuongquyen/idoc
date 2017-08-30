/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Timeout, LockScreenIcon */
if(typeof SS === 'undefined') {
    var SS = {
        set: function($key, $data, $cache_expired) {
            var data = {data: $data};
            var expired = ($cache_expired || 3600) * 1000;
            data.expired = Date.now() + expired;
            try {
                sessionStorage.setItem($key, JSON.stringify(data));
            }
            catch(e) {
                return false;
            }

            return true;
        },
        get: function($key) {
            var temp = JSON.parse(sessionStorage.getItem($key));
            if(! temp) {
                return null;
            }
            if(temp.expired < Date.now()) {
                SS.del($key);
                return null;
            }
            return temp.data;
        },
        del: function($key) {
            try {
                sessionStorage.removeItem($key);
            }
            catch(e) {
                return false;
            }
            return true;
        },
        clear: function() {
            try {
                sessionStorage.clear();
            }
            catch(e) {
                return false;
            }
            return true;
        }
    };
}
if(typeof QLog === 'undefined') {
    var QLog = function($type) {
        var args = [];
        Array.prototype.push.apply(args, arguments);
        args.shift();
        switch(($type + '').toLowerCase()) {
            case 'log' :
                QLog.log.apply(null, args);
                break;
            case 'warn' :
                QLog.warn.apply(null, args);
                break;
            case 'info' :
                QLog.info.apply(null, args);
                break;
            case 'error' :
                QLog.error.apply(null, args);
                break;
        }
    };
    QLog.log = function() {
        console.log.apply(this, arguments);
        return;
    };
    QLog.warn = function() {
        console.warn.apply(this, arguments);
        return;
    };
    QLog.info = function() {
        console.info.apply(this, arguments);
        return;
    };
    QLog.error = function() {
        console.error.apply(this, arguments);
        return;
    };
}
if(typeof Timeout === 'undefined') {
    var Timeout = {
        set: function($key, $func, $time) {
            var _func = $func;
            var _keys = Object.keys(arguments);
            var _listArgs = arguments;
            _keys = _keys.slice(3, _keys.length);
            var _list = this.all();
            var _args = [];
            _keys.forEach(function(_k) {
                _args.push(_listArgs[parseInt(_k)]);
            });
            if(_list[$key]) {
                clearTimeout(_list[$key]);
            }
            if(typeof _func === 'function') {
                _list[$key] = setTimeout(function() {
                    QLog.log('Timeout[' + $key + ']:' + (new Date()));
                    _func.apply(null, _args);
                }, $time);
                SS.set('TIMEOUT', _list);
            }
            else {
                QLog.log('Param 2 must be a function.' + (typeof _func) + ' is sent', $key, _func);
            }
            return _list[$key];
        },
        get: function($key) {
            return this.all()[$key];
        },
        clear: function($key) {
            var _list = this.all();
            for(var _key in _list) {
                if($key instanceof RegExp) {
                    if($key.test(_key)) {
                        clearTimeout(_list[_key]);
                        delete _list[_key];
                    }
                }
                else {
                    if(_key === $key) {
                        clearTimeout(_list[_key]);
                        delete _list[_key];
                        SS.set('TIMEOUT', _list);
                        return true;
                    }
                }
            }
            SS.set('TIMEOUT', _list);
            return true;
        },
        clearList: function($keys) {
            var _list = Timeout.all();
            for(var _key in _list) {
                if($keys.indexOf(_key) > - 1) {
                    clearTimeout(_list[_key]);
                    delete _list[_key];
                    SS.set('TIMEOUT', _list);
                    return true;
                }
            }
            return false;
        },
        all: function() {
            return SS.get('TIMEOUT') || {};
        },
        clearAll: function() {
            var _list = Timeout.all();
            for(var _key in _list) {
                clearTimeout(_list[_key]);
            }
            return SS.set('TIMEOUT', null);
        }
    };
}
var LockScreen = function($opt) {
    this.options = {
        enable: true,
        timeout: 30000,
        icon: 'ball',
        message:''
    };
    this.locking = false;
    return this.init($opt);
};

LockScreen.prototype.setEvent = function() {
    var self = this;
    $('body')
        .unbind('click')
        .unbind('keypress')
        .bind({
            click: function(e) {
                self.setWatcher();
            },
            keypress: function(e) {
                if ($('.lock-screen-wrapper').length) {
                    self.unlock();
                }
                else {
                    self.setWatcher();
                }
            }
        });
    $('body').on('click', '.lock-screen-wrapper', function(event) {
        self.unlock();
    });
};

LockScreen.prototype.init = function($opt) {
    var _opt = {};
    if(typeof $opt === 'function') {
        _opt = $opt();
    }
    else if(typeof $opt === 'object') {
        _opt = $opt;
    }
    this.options = $.extend(this.options, _opt);
    this.setEvent();
    this.setWatcher();
    return this;
};

LockScreen.prototype.setWatcher = function() {
    if(this.options.enable) {
        Timeout.set('LOCKSCREEN', function(locker) {
            locker.lock();
        }, this.options.timeout, this);
    }
    else {
        Timeout.clear('LOCKSCREEN');
    }
};

LockScreen.prototype.setClassBody = function() {
    if(this.locking) {
        $('body').addClass('lock');
    }
    else {
        $('body').removeClass('lock');
    }
};

LockScreen.prototype.lock = function() {
    if (this.locking) {
        return;
    }
    if(typeof this.options.beforeLock === 'function') {
        this.options.beforeLock();
    }
    $('body').append(this.screen());
    this.locking = true;
    this.setIcon();
    this.setMessage();
    this.setClassBody();
    Timeout.clear('LOCKSCREEN');
    if(typeof this.options.afterLock === 'function') {
        this.options.afterLock();
    }
};

LockScreen.prototype.unlock = function() {
    if(typeof this.options.beforeUnlock === 'function') {
        this.options.beforeUnlock();
    }
    $('.lock-screen-wrapper').remove();
    this.locking = false;
    this.setClassBody();
    if(typeof this.options.afterUnlock === 'function') {
        this.options.afterUnlock();
    }
};

LockScreen.prototype.enable = function() {
    this.options.enable = true;
    this.setWatcher();
};
LockScreen.prototype.disable = function() {
    this.options.enable = false;
    this.setWatcher();
};

LockScreen.prototype.timeout = function($timeout) {
    this.options.timeout = isNaN(parseFloat($timeout)) ? 30000 : parseFloat($timeout);
    this.setWatcher();
};

LockScreen.prototype.screen = function() {
    return '    <div class="lock-screen-wrapper">'
        + '         <div class="lock-screen-overlay"></div>'
        + '         <div class="lock-screen-icon"></div>'
        + '         <div class="lock-screen-form"></div>'
        + '         <div class="lock-screen-message"></div>'
        + '      </div>';
};

LockScreen.prototype.icon = function($icon) {
    if($icon) {
        this.options.icon = $icon;
    }
    if(typeof LockScreenIcon === 'undefined') {
        return null;
    }
    if(LockScreenIcon[this.options.icon]) {
        return LockScreenIcon[this.options.icon];
    }
    return null;
};

LockScreen.prototype.setIcon = function($icon) {
    var icon = this.icon($icon);
    if(icon) {
        $('.lock-screen-icon').html(icon.html());
        icon.init();
    }
};

LockScreen.prototype.message = function($msg){
    this.options.message = $msg;
    this.setMessage();
};

LockScreen.prototype.setMessage = function(){
    var _ele = $('.lock-screen-message');
    var _msg = typeof this.options.message === 'function' ? this.options.message() : this.options.message;
    switch(typeof _msg) {
        case 'string':
            _ele.html(_msg);
            break;
        case 'object':
            _ele.html(_msg.content);
            if(_msg.class) {
                _ele.addClass(_msg.class);
            }
            if(_msg.style) {
                _ele.attr('style' , _msg.style);
            }
            break;    
        default:
            _ele.html('');
            break;
    }
};
