/* global baseUrl,stopReloader,$, jQuery, startReloader, moment, createUrl, ss, Notification */
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
var AjaxList = {};
var Util = {
    ajax: function($options) {
        var _hideLoading = $options.hideLoading;
        var _id = Util.guid();
        var _options = {
            method: $options.method || $options.type || "get",
            dataType: $options.dataType || "html",
            beforeSend: function(xhr) {
                if(! _hideLoading) {
                    $.fn.showLoading();
                }
                if(typeof $options.beforeSend === 'function') {
                    $options.beforeSend(xhr);
                }
            },
            complete: function(xhr, statusText) {
                if(! _hideLoading) {
                    $.fn.hideLoading();
                }
                delete(AjaxList[_id]);
                if(typeof $options.complete === 'function') {
                    $options.complete(xhr, statusText);
                }
            },
            success: function(result, statusText, xhr) {
                if(typeof $options.success === 'function') {
                    setTimeout($options.success, 20, result, statusText, xhr);
                    return;
                }
                if(typeof result === 'object' && $options.showMessage) {
                    $.fn.showNotification({
                        type: (result.status > 0 || result.susscess > 0) ? 'success' : 'error',
                        content: result.message || (result.notif ? result.notif.content : '')
                    });
                }
            },
            error: function(xhr) {
                if(xhr.status === 401 && !$('.show-login-error').length) {
                    Interval.clearAll();
                    Widget.alert({
                        title : 'Login session timeout',
                        type : 'error',
                        message:'You need to login to continue!',
                        callback: function($modal , $id){
                            $modal.addClass('show-login-error');
                            window.location.href = createUrl('user/login');
                        }
                    });
                    return ;
                }
                if(! _hideLoading) {
                    setTimeout($.fn.hideLoading, 10);
                }
                if(xhr.statusText !== 'abort') {
                    if(typeof $options.error === 'function') {
                        $options.error(xhr);
                        return;
                    }
                    $.fn.showNotification({
                        title: "Oops!",
                        type: "error",
                        content: xhr.responseText || xhr.statusText
                    });
                }
            }
        };
        Object.keys($options).forEach(function(x) {
            if(['success', 'error', 'beforeSend', 'complete'].indexOf(x) < 0) {
                _options[x] = $options[x];
            }
        });
        AjaxList[_id] = $.ajax(_options);
        return AjaxList[_id];
    },
    ajaxFormData: function($formData, $options) {
        if(! $formData || ! $options) {
            $.fn.showNotification({
                type: "error",
                title: "System error",
                content: "Parameter for Util.ajaxFormData invalid"
            });
            QLog.log("Parameter for Util.ajaxFormData invalid");
            return false;
        }
        $options.dataType = $options.dataType || "json";
        $options.method = $options.method || "POST";
        $options.data = $formData;
        $options.contentType = false;
        $options.processData = false;
        return Util.ajax($options);
    },
    ajaxForm: function($form, $validation, $options) {

        $options = $options || {};
        if(! $form || ! $form.length || $form.length === 0) {
            $.fn.showNotification({
                type: "error",
                title: "System error",
                content: "Object Form not found"
            });
            QLog.log("Object Form not found");
            return false;
        }
        if(typeof ($validation) === "function") {
            if(! $validation()) {
                return false;
            }
        }
        $options.dataType = $options.dataType || "json";
        $options.method = $options.method || "POST";
        $options.url = $options.url || $form.attr("action");
        $options.method = $options.method || $form.attr("method");
        $options.data = $form.serialize();
        return Util.ajax($options);
    },
    ajaxValidate: function($form, $rules, $opt) {
        var _opt = $rules || {};
        _opt.submitHandler = function(form, event) {
            event.stopPropagation();
            Util.ajaxForm($form, null, $opt);
        };
        return $form.validate($rules);
    },
    numpad: function($obj, $opener, $opt) {
        $opt = $opt || {};
        var options = {
            stayOpen: false,
            openOn: "focus",
            layout: "custom",
            reposition: true,
            display: {
                accept: "Ok:Set the Content"
            },
            customLayout: {
                "normal": [
                    "{left} {right}",
                    "7 8 9",
                    "4 5 6",
                    "1 2 3",
                    "0 . {clear}",
                    "{cancel} {bksp} {accept}"
                ]
            },
            visible: function(e, keyboard, el) {
                keyboard.$preview.css("text-align", $opt.align || "right");
            }
        };
        if($opener) {
            options.openOn = null;
        }
        if($opt.decimal || $opt.commas || $opt.change) {
            options.change = function(e, keyboard, element) {
                if($opt.commas) {
                    var diff;
                    var el = keyboard.$preview;
                    var caret = $.keyboard.caret(el);
                    var parts = el.val().toString().split(".");
                    var len = parts[0].length;
                    parts[0] = parts[0].replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    el.val(parts.join("."));
//                    el.css("text-align","right");
                    // re-align caret
                    diff = parts[0].length - len;
                    caret.start += diff;
                    caret.end += diff;
                    $.keyboard.caret(el, caret);
                }
                if($opt.decimal) {
                    var val = keyboard.$preview.val().match(/([\d|,]+)(\.\d{0,2})?/);
                    if(val) {
                        keyboard.$preview.val(val.slice(1).join(""));
                        $.keyboard.caret(keyboard.$preview, keyboard.last.start, keyboard.last.end);
                    }
                }
                if(typeof $opt.change === "function") {
                    $opt.change(e, keyboard, element);
                }
            };
        }
        options.lockInput = $opt.lockInput || false;
        options.maxInsert = $opt.maxInsert || true;
        options.maxLength = $opt.maxLength || false;
        options.noFocus = $opt.noFocus || false;
        options.openOn = $opt.openOn || options.openOn;
        $obj.keyboard(options);
        $obj.css("text-align", $opt.align || "right");
        if($opener) {
            $opener.on("click", function() {
                var value = $obj.val() || "";
                $obj.val(value.replace(",", ""));
                var kb = $obj.getkeyboard();
                if(kb.isOpen) {
                    kb.close();
                }
                else {
                    kb.reveal();
                }
            });
        }
    },
    keypad: function($obj, $opener, $opt) {
        $opt = $opt || {};
        var options = {
            stayOpen: true,
            openOn: "focus",
            reposition: true,
            lockInput: false, // prevent manual keyboard entry
            layout: "custom",
            customLayout: {
                normal: [
                    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                    "{tab} q w e r t y u i o p [ ] \\",
                    "a s d f g h j k l ; \" {enter}",
                    "{shift} z x c v b n m , . / {shift}",
                    "{cancel} {space} {accept}"
                ],
                shift: [
                    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                    "{tab} Q W E R T Y U I O P { } |",
                    "A S D F G H J K L : \" {enter}",
                    "{shift} Z X C V B N M < > ? {shift}",
                    "{cancel} {space} {accept}"
                ]
            },
            display: {
                accept: ($opt.okText || "Ok") + ":Set the Content"
            },
            visible: function(e, keyboard, el) {
                keyboard.$preview[0].select();
            },
            beforeVisible: function(e, keyboard, el) {
                if(typeof stopReloader === "function") {
                    stopReloader();
                }
                $("body").append("<div class=\"modal keypad-backdrop\" style=\"display:block;\"></div>");
            },
            hidden: function(e, keyboard, el) {
                if(typeof startReloader === "function") {
                    startReloader();
                }
                $(".keypad-backdrop").remove();
            }
        };
        if($opener) {
            options.openOn = null;
        }
        options.lockInput = $opt.lockInput || false;
        options.maxInsert = $opt.maxInsert || true;
        options.maxLength = $opt.maxLength || false;
        options.noFocus = $opt.noFocus || false;
        options.openOn = $opt.openOn || options.openOn;
        $obj.keyboard(options);
        if($opener) {
            $opener.on("click", function() {
                var kb = $obj.getkeyboard();
                if(kb.isOpen) {
                    kb.close();
                }
                else {
                    kb.reveal();
                }
            });
        }
    },
    guid: function() {
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        uuid = uuid.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    reloadPage: function() {
        setTimeout(function() {
            $.fn.showLoading();
            setTimeout(window.location.reload, 100);
        }, 100);
    },
    number2str: function($number, $decimal) {
        var _number = parseFloat($number) || 0;
        var _decimal = $decimal || 2;
        return _number.toLocaleString("en-US", {minimumFractionDigits: _decimal});
    },
    str2number: function($number) {
        var _number = $number || "";
        return parseFloat(_number.replace(/,/, "")) || 0;
    },
    serverTime: function() {
        var _time = moment().tz(CONFIG.SERVER_TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
        return moment(_time);
    },
    client2serverTime: function() {
        return moment().tz(CONFIG.SERVER_TIMEZONE);
    },
    compareStr: function($a, $b) {
        var _a = typeof $a === "undefined" || $a === null ? "" : $a + "";
        var _b = typeof $b === "undefined" || $b === null ? "" : $b + "";
        if(jQuery.isNumeric(_a) && jQuery.isNumeric(_b)) {
            _a = parseFloat(_a);
            _b = parseFloat(_b);
            if(_a > _b) {
                return 1;
            }
            if(_a < _b) {
                return - 1;
            }
            return 0;
        }
        return _a.localeCompare(_b);
    },
    eq: function($a, $b) {
        return Util.compareStr($a, $b) === 0;
    },
    gt: function($a, $b) {
        return Util.compareStr($a, $b) === 1;
    },
    lt: function($a, $b) {
        return Util.compareStr($a, $b) === - 1;
    },
    serializeObject: function(form) {
        if(! (form instanceof jQuery)) {
            form = $(form);
        }
        return form.serializeObject();
    },
    zeroLead: function(num, size) {
        size = size || 4;
        var s = num + "";
        while(s.length < size)
            s = "0" + s;
        return s;
    },
    rtrim: function($str, $reg) {
        var _reg = new RegExp(($reg || " ") + "+$", "i");
        if($str) {
            return ($str + "").replace(_reg, "");
        }
        return '';
    },
    ltrim: function($str, $reg) {
        var _reg = new RegExp("^" + ($reg || " ") + "+", "i");
        if($str) {
            return ($str + "").replace(_reg, "");
        }
        return '';
    },
    trim: function($str, $reg) {
        var _trim = Util.rtrim($str, $reg);
        return Util.ltrim(_trim, $reg);
    },
    dateDiff: function($start, $end) {
        return moment($end).diff($start);
    },
    dateDiffHumanize: function($start, $end, $refix) {
        return moment.duration(Util.dateDiff($start, $end)).humanize($refix);
    },
    dateDiffConvert: function($start, $end, $type) {
        var _duration = Util.dateDiff($start, $end);
        var _type = $type || 'hours';
        var _func = new Function('return moment.duration(' + _duration + ').as' + _type.capitalize() + '();');
        return _func();
    },
    redirect: function($url) {
        window.location.href = $url;
    },
    download: function($href) {
//        var _link = document.createElement('a');
//        _link.href = $href;
//        _link.click();
//        delete(_link);
        $('body').append('<a id="download_link" style="display:none;" href="' + $href + '" target="_blank"></a>');
        $('#download_link')[0].click();
        $('#download_link').remove();
    },
    load: function($opt) {
        if(! $opt.url) {
            console.error('Source is undefined');
            return;
        }
        setTimeout(function($opt) {
            if($opt.documentReady) {
                jQuery(document).ready(function() {
                    jQuery.ajax({
                        url: $opt.url,
                        dataType: $opt.dataType,
                        success: $opt.onload,
                        async: true
                    });
                });
            }
            else {
                jQuery.ajax({
                    url: $opt.url,
                    dataType: $opt.dataType,
                    success: $opt.onload,
                    async: true
                });
            }
        }, $opt.delay || 0, $opt);
    },
    loadJS: function($opt) {
        if($opt.item && ! $opt.refresh) {
            console.warn('Script had been loaded. Do onload');
            if(typeof $opt.onload === 'function') {
                $opt.onload();
            }
            return;
        }
        $opt.dataType = 'script';
        Util.load($opt);
    },
    lazyLoadJS: function($opt) {
        $opt.delay = typeof ($opt.delay) === 'undefined' ? 1000 : $opt.delay;
        $opt.documentReady = typeof ($opt.documentReady) === 'undefined' ? true : $opt.documentReady;
        $opt.refresh = typeof ($opt.refresh) === 'undefined' ? false : $opt.refresh;
        Util.loadJS($opt);
    },
    assetJS: function($opt) {
        if(! $opt.url) {
            console.error('Source is undefined');
            return;
        }
        $opt.url = createUrl().replace(/\/?index.php\/?/, '') + '/themes/core/' + Util.ltrim($opt.url, '/');
        if($opt.lazy) {
            Util.lazyLoadJS($opt);
        }
        else {
            Util.loadJS($opt);
        }
    },
    isPortrait: function() {
        return screen.width < screen.height;
    },
    isLandscap: function() {
        return screen.width > screen.height;
    },
    isWideScreen: function() {
        return screen.width / screen.height > 1.45 || screen.height / screen.width > 1.45;
    },
    isResponsive: function() {
        return document.getElementById('viewport') ? true : false;
    },
    isEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    notice: function($opt, $reask) {
        // Let's check if the browser supports notifications
        var notification;
        $opt = $opt || {};
        $opt.icon = createHref('/favicon.ico');
        if(! ("Notification" in window)) {
            console.log("This browser does not support desktop notification");
            return notification;
        }
        if(! navigator.serviceWorker) {
            console.log("This browser does not support desktop notification");
            return notification;
        }
        // Let's check whether notification permissions have already been granted
        if(Notification.permission === "granted") {
            //If it's okay let's create a notification
            try {
                notification = new Notification($opt.title || '', $opt);
                return notification;
            }
            catch(err) {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification($opt.title, $opt);
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }

        // Otherwise, we need to ask the user for permission
        if(Notification.permission !== "denied" || $reask) {
            Notification.requestPermission(function(permission) {
                // If the user accepts, let's create a notification
                if(permission === "granted") {
                    try {
                        notification = new Notification($opt.title || '', $opt);
                        return notification;
                    }
                    catch(err) {
                        navigator.serviceWorker.ready.then(function(registration) {
                            console.log(registration);
                            registration.showNotification($opt.title, $opt);
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }s
                }
            });
        }

        // At last, if the user has denied notifications, and you 
        // want to be respectful there is no need to bother them any more.
        return notification;
    }
};
var Widget = {
    numpad: function($data, $opener) {
        var _data = $data || {};
        var _base = baseUrl || "";
        var _url = _base + "/widget/numpad";
        var _opener = $opener || $("#" + _data.element_id);
        _opener.on("click", function() {
//            if (typeof _data.handleOpen === "function") {
//                if (!_data.handleOpen($("#" + _data.element_id) , $opener)) return;
//            }
            if($("#" + _data.element_id).is(":disabled")) {
                return;
            }
            Util.ajax({
                url: _url,
                data: _data,
                success: function(result) {
                    $.fn.showMorePopup({
                        content: result,
                        width: "185px",
                        buttons: {
                            c: {text: _data.cancel_text || "Cancel", class: "left", dismiss: true},
                            s: {
                                text: _data.ok_text || "Submit",
                                class: "right",
                                dismiss: true,
                                func: "setValueNumpad();"
                            }
                        },
                        close: function() {
                            if($(".modal[id!=siteModal]").length > 1) {
                                setTimeout(function() {
                                    $("<div class=\"modal-backdrop fade in\"></div>").appendTo("body");
                                }, 30);
                            }
                        }
                    });
                }
            });
        });
    },
    message: function($opt) {
        var _opt = $opt || {};
        var _base = baseUrl || "";
        var _url = _base + "/widget/message";
        var _data = _opt.data || {};
        if(_opt.buttons.Callback) {
            _opt.buttons.Callback = _opt.buttons.Callback + '();';
        }
        else {
            _opt.buttons.Callback = '$.fn.dismissModal($(this))';
        }
        var _formData = {
            template: _opt.template || "default",
            data: _data,
            title: _opt.title || "Manager Authorization",
            buttons: _opt.buttons || {Text: 'Close', Callback: ''}
        };
        Util.ajax({
            url: _url,
            data: _formData,
            success: function(result) {
                $('#widget_message').trigger('click');
                $('body').append(result);
                $('body').find('#widget_message').modal();
                $('#widget_message').on('shown.bs.modal', function(e) {
                    $('button#btnclose').focus();
                    $('#widget_message').on('keydown', function(e) {
                        if(e.keyCode === 27) {
                            $('a.btnClose').trigger('click');
                        }
                        if(e.keyCode === 13 || e.keyCode === 9) {
                            $('button#btnclose').trigger('click');
                        }
                    });


                });
            }
        });
    },
    confirm: function($data) {
        var _id = Util.guid();
        var _data = $data || {};
        _data.id = _id;
        Util.ajax({
            url: createUrl('widget/confirm'),
            showMessage: true,
            data: {
                title: _data.title || 'Confirm',
                message: _data.message,
                template: _data.template,
                template_data: _data.template_data,
                translate: _data.translate,
                translate_section: _data.translate_section,
                id: _id
            },
            success: function(result) {
                $('body').append(result);
                var _modal = $('#' + _id);
                var _btnYes = _modal.find('.widget-confirm-yes');
                var _btnNo = _modal.find('.widget-confirm-no');
                if(typeof _data.yes === 'string') {
                    _btnYes.attr('onclick', _data.yes);
                }
                if(typeof _data.no === 'string') {
                    _btnNo.attr('onclick', _data.no);
                }
                _btnYes.bind('click', function() {
                    if(typeof _data.yes === 'function') {
                        _data.yes(_modal, _data);
                        return;
                    }
                    if(typeof _data.callback === 'function') {
                        _data.callback(true, _modal, _data);
                    }
                });
                _btnNo.bind('click', function() {
                    if(typeof _data.no === 'function') {
                        _data.no(_modal, _data);
                        return;
                    }
                    if(typeof _data.callback === 'function') {
                        _data.callback(false, _modal, _data);
                    }
                });
                _modal.find('.modal-dialog').width(_data.width || null);
                _modal.on('hidden.bs.modal', function() {
                    $(this).remove();
                });
                _modal.modal();
            }
        });
    },
    alert: function($data) {
        var _id = Util.guid();
        var _data = $data || {};
        _data.id = _id;
        Util.ajax({
            url: createUrl('widget/alert'),
            showMessage: true,
            data: {
                title: _data.title || 'Notification',
                type: _data.type || 'notification',
                message: _data.message,
                template: _data.template,
                template_data: _data.template_data,
                translate: _data.translate,
                translate_section: _data.translate_section,
                id: _id
            },
            success: function(result) {
                $('body').append(result);
                var _modal = $('#' + _id);
                _modal.find('.modal-dialog').width(_data.width || null);
                _modal.on('hidden.bs.modal', function() {
                    $(this).remove();
                    if(typeof _data.callback === 'function'){
                        _data.callback(_modal , _id);
                    }
                });
                _modal.modal();
            }
        });
    },
    dialog: function($data) {
        var _id = Util.guid();
        var _data = $data || {};
        var _str = '<div id="' + _id + '" class="modal fade '
            + (_data.class || '') + '" role="dialog" aria-labelledby="modal_label_'
            + _id + '" data-keyboard="' + (_data.keyboard ? 'true' : 'false') + '" data-backdrop="'
            + (_data.backdrop || 'static') + '">'
            + '    <div class="modal-dialog">'
            + '        <div class="modal-content">'
            + '            <div class="modal-header">'
            + '                <h5 class="modal-title" id="model_label_'
            + _id + '">' + (_data.title || '') + '</h5>'
            + '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
            + '                    <span aria-hidden="true">×</span>'
            + '                </button>'
            + '            </div>'
            + '            <div class="modal-body">' + (_data.content || '') + '</div>'
            + '            <div class="modal-footer">'
            + '                <div class="pull-left">'
            + '                </div>'
            + '                <div class="pull-right">'
            + '                </div>'
            + '                <div class="clearfix"></div>'
            + '            </div>'
            + '        </div>'
            + '    </div>'
            + '</div>';
        $('body').append(_str);
        var _con = $('#' + _id);
        if(typeof _data.buttons === 'object') {
            for(var i in _data.buttons) {
                var _btn = _data.buttons[i];
                var _strBtn = '<button type="button" ' + (_btn.dismiss ? 'data-dismiss="modal"' : '')
                    + ' class="btn btn_' + i + ' ' + (_btn.class || '') + '">'
                    + (_btn.icon ? '    <i class="fa fa-' + _btn.icon + '"></i> ' : '')
                    + '    <span class="button-text">' + (_btn.text || ('Button ' + i)) + '</span>'
                    + '</button>';
                _con.find('.modal-footer .pull-' + (_btn.float || 'right')).append(_strBtn);
                var _btnObj = _con.find('.modal-footer .btn_' + i);
                if(typeof _btn.click === 'string') {
                    _btn.click = new Function(_btn.click);
                }
                if(typeof _btn.click === 'function') {
                    _btnObj.on('click', {modal: _con, id: _id}, _btn.click);
                }
                if(typeof _btn.properties === 'object') {
                    for(var j in _btn.properties) {
                        _btnObj.attr(j, _btn.properties[j]);
                    }
                }
            }
        }
        if(typeof _data.buttons === 'string') {
            _con.find('.modal-footer').html(_data.buttons);
        }
        if(! _data.buttons) {
            _con.find('.modal-footer').hide();
        }
        if(_data.width) {
            _con.find('.modal-dialog').width(_data.width);
        }
        if(typeof _data.show === 'function') {
            _con.on('show.bs.modal', _data.show);
        }
        if(typeof _data.shown === 'function') {
            _con.on('shown.bs.modal', _data.shown);
        }
        if(typeof _data.hide === 'function') {
            _con.on('hide.bs.modal', _data.hide);
        }
        _con.on('hidden.bs.modal', function(e) {
            if(typeof _data.hidden === 'function') {
                _data.hidden(e);
            }
            setTimeout(function() {
                _con.remove();
            }, 100);
        });
        if(_data.url) {
            Util.ajax({
                url: _data.url,
                data: _data.data,
                success: function(result) {
                    _con.find('.modal-body').html(result);
                    _con.modal();
                }
            });
        }
        else {
            _con.modal();
        }
    }
};
var LSKEY = {
    LIST_JOB: "LIST_JOB",
    CURRENT_JOB: "CURRENT_JOB",
    CURRENT_USER: "CURRENT_USER",
    CURRENT_MACHINE: "CURRENT_MACHINE",
    CURRENT_TAB: "CURRENT_TAB",
    CURRENT_ROW: "CURRENT_ROW",
    CURRENT_ROW_INFO: "CURRENT_ROW_INFO",
    LAST_NUMBER: "LAST_NUMBER",
    BASE_URL: "BASE_URL",
    HAS_RUNNING_JOB: "HAS_RUNNING_JOB",
    CURRENT_RUNNING: 'CURRENT_RUNNING',
    GRID_INFO: 'GRID_INFO'
};
if(typeof CONFIG === 'undefined') {
    CONFIG = {};
}
CONFIG = $.extend({}, {
    CACHE_EXPIRED: 3600, //second
    LIST_RUNNING_STATUS: ['Run', 'Job Start', 'Setup'],
    LIST_NOT_RUNNING_STATUS: ['Next', 'Ready'],
    LIST_STARTED_STATUS: ['Job Start'],
    SERVER_TIMEZONE: 'America/Mexico_City',
    TIME_BEFORE_END_SHIFT: 300, //second
    DELAY_WARNING_END_SHIFT: 300, //second
}, CONFIG);
var LS = {
    set: function($key, $data, $cache_expired) {
        var data = {data: $data};
        var expired = ($cache_expired || CONFIG.CACHE_EXPIRED) * 1000000;
        data.expired = Date.now() + expired;
        try {
            localStorage.setItem($key, JSON.stringify(data));
        }
        catch(e) {
            return false;
        }

        return true;
    },
    get: function($key) {
        var temp = JSON.parse(localStorage.getItem($key));
        if(! temp) {
            return null;
        }
        if(temp.expired < Date.now()) {
            LS.del($key);
            return null;
        }
        return temp.data;
    },
    del: function($key) {
        try {
            localStorage.removeItem($key);
        }
        catch(e) {
            return false;
        }
        return true;
    },
    clear: function() {
        try {
            localStorage.clear();
        }
        catch(e) {
            return false;
        }
        return true;
    }
};
var SS = {
    set: function($key, $data, $cache_expired) {
        var data = {data: $data};
        var expired = ($cache_expired || CONFIG.CACHE_EXPIRED) * 1000;
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
var App = {
    baseUrl: function($url) {
        if($url) {
            LS.set(LSKEY.BASE_URL, $url, 3600 * 24);
        }
        return LS.get(LSKEY.BASE_URL);
    }
};
var GridMaker = function($opt) {
    /*
     * Functions
     */
    var createItem = function($id, $class) {
        return "<div class=\"gridTable " + $class + "\" id=\"" + $id + "\"></div>";
    };
    var obj = {
        reloader: $opt.reloader || null,
        delay: 300000,
        tooltip: $opt.tooltip || false,
        headerTitle: $opt.headerTitle || false,
        autoRefresh: $opt.autoRefresh || false,
        gridID: Util.guid(),
        container: null,
        containerID: null,
        grid: null,
        class: "",
        url: "Job/List",
        query: {queue: ""},
        column: [],
        option: {},
        reorder: false,
        noRecord: $opt.noRecord,
        bound: function(kendoGrid, info, maker) {
            return kendoGrid;
        },
        bind: function(source, maker) {
            return source;
        },
        navigate: function(event, kendoGrid, maker) {
            return event;
        },
        change: function(event, kendoGrid, maker) {
            return event;
        },
        log: function($msg, $data) {
            var _content = "[GridMaker] " + this.containerID + " | " + this.gridID + " | " + $msg;
            if($data) {
                _content += " | " + JSON.stringify($data);
            }
        },
        startReloader: function() {
            this.log("startReloader");
            this.stopReloader();
            if(! this.grid) {
                this.item = $("#" + this.gridID);
                this.grid = this.item.data("kendoGrid");
            }
            var item = this.item;
            var source = this.grid.dataSource;
            var stop = this.stopReloader;
            this.reloader = setInterval(function() {
                if(item && item.closest("body").length > 0) {
                    source.read();
                }
                else {
                    stop();
                }
            }, this.delay);
        },
        stopReloader: function() {
            if(this.reloader) {
                this.log("stopReloader");
                clearInterval(this.reloader);
            }
            this.reloader = null;
        },
        reload: function() {
            this.log("reload");
            this.stopReloader();
            if(! this.grid) {
                this.item = $("#" + this.gridID);
                this.grid = this.item.data("kendoGrid");
            }
            if(this.grid.dataSource) {
                this.grid.dataSource.read();
            }
            this.startReloader();
        },
        reset: function() {
            this.log("reset");
            this.stopReloader();
            var _reorder = typeof this.reorder === 'object' ? $.extend({}, this.reorder) : this.reorder;
            this.setReorder(false);
            $('#' + this.gridID).remove();
            this.reorder = _reorder;
            this.item = null;
            this.grid = null;
            this.init();
        },
        config: function($opt) {
            if(typeof $opt === "object") {
                this.containerID = $opt.containerID;
                this.container = $opt.container;
                this.url = $opt.url || this.url;
                this.query = $opt.query || this.query;
                this.delay = $opt.delay || this.delay;
                this.column = $opt.column || this.column;
                this.autoRefresh = $opt.autoRefresh || this.autoRefresh;
                this.class = $opt.class || this.class;
                this.tooltip = $opt.tooltip || this.tooltip;
                this.headerTitle = $opt.headerTitle || this.headerTitle;
                this.showPager = typeof $opt.showPager !== "undefined" ? $opt.showPager : true;
                this.dataSource = $opt.dataSource ? $opt.dataSource : null;
                this.reorder = $opt.reorder;
                this.noRecord = $opt.noRecord;
                this.option = $opt.option || {};
                if(typeof $opt.bind === "function") {
                    this.bind = $opt.bind;
                }
                if(typeof $opt.bound === "function") {
                    this.bound = $opt.bound;
                }
                if(typeof $opt.navigate === "function") {
                    this.navigate = $opt.navigate;
                }
                if(typeof $opt.change === "function") {
                    this.change = $opt.change;
                }
            }
        },
        setElement: function() {
            if(! this.container && ! this.containerID) {
                QLog.log("init", "container is empty");
                return false;
            }
            if(this.container && this.container.length > 0) {
                this.containerID = this.container[0].id;
                return true;
            }
            if(this.containerID) {
                var container = $("#" + this.containerID);
                if(container.length > 0) {
                    this.container = container;
                    return true;
                }
                this.container = false;
                QLog.log("init", "container is not found");
                return false;
            }
            if(this.container && this.container.length === 0) {
                Qlog.log("init", "container is not found");
                this.container = null;
                return false;
            }
            return false;
        },
        init: function($opt) {
            this.config($opt);
            if(! this.setElement()) {
                return;
            }
            this.log("init");
            var self = this;
            if(! this.item) {
                this.container.append(createItem(this.gridID, this.class));
            }
            this.item = $("#" + this.gridID);
            var option = {
                hideLoading: false,
                selectable: "single",
                sortable: false,
                autoBind: true,
                resizable: false,
                navigatable: true,
                serverPaging: false,
                scrollable: true
            };
            if(typeof self.option === "object") {
                Object.keys(self.option).forEach(function(x) {
                    option[x] = self.option[x];
                });
            }
            self.option = {};
            Object.keys(option).forEach(function(x) {
                self.option[x] = option[x];
            });
            option.requestData = {
                readData: this.query
            };
            option.dataSource = this.dataSource ? this.dataSource : null;
            /*
             * Event
             */
            option.onDataBound = function($source, $info, $event) {
                self.grid = self.item.data("kendoGrid");
                self.log("onDataBound");
                self.setNoRecord();
                setTimeout(function() {
                    if(! option.serverPaging && ! self.showPager) {
                        $info.pagerInfo.parent().addClass("hide");
                    }
                    else {
                        $info.pagerInfo.parent().removeClass("hide");
                    }
                    if(self.headerTitle) {
                        self.grid.thead.find("th").each(function(index, item) {
                            $(item).attr("title", $(item).data("title"));
                        });
                    }
                    if(self.tooltip) {
                        self.grid.thead.kendoTooltip({
                            filter: "th",
                            position: "top",
                            content: function(e) {
                                var target = e.target; // element for which the tooltip is shown
                                return $(target).text();
                            }
                        });
                    }
                    if(typeof self.bound === "function") {
                        self.bound($source, $info, self, $event);
                    }
                }, 50);
            };
            option.onDataBinding = function($resource) {
                self.log("onDataBinding");
                self.grid = self.grid || $("#" + self.gridID).data("kendoGrid");
                if(typeof self.bind === "function") {
                    self.bind($resource, self);
                }
            };
            option.onNavigate = function($event, $gridKendo) {
                self.log("onNavigate");
                if(typeof self.navigate === "function") {
                    self.navigate($event, $gridKendo, self);
                }
            };
            option.onChange = function($event, $gridKendo) {
                self.log("onChange");
                if(typeof self.change === "function") {
                    self.change($event, $gridKendo, self);
                }
            };
            $.fn.setKendoGrid(self.item, self.column, self.url, option);
            if(! self.grid) {
                self.grid = $('#' + self.gridID).data('kendoGrid');
            }
            self.setReorder();
            if(self.autoRefresh) {
                self.startReloader();
            }
        },
        destroy: function() {
            this.log("destroy");
            this.stopReloader();
            if(this.grid) {
                this.setReorder(false);
                this.grid.destroy();
                if(this.grid.wrapper) {
                    this.grid.wrapper.empty();
                }
                this.grid = null;
            }
            if(this.item) {
                this.item.remove();
                this.item = null;
            }
        },
        setPagerVisible: function($shown, $callback) {
            this.showPager = ! $shown ? false : true;
            if(this.item) {
                this.item.find(".k-grid-pager").removeClass("hide").addClass(! $shown ? "hide" : "");
                if(typeof $callback === "function") {
                    $callback(this.item.find(".k-grid-pager"));
                }
            }
        },
        hideColumn: function($column) {
            this.grid.hideColumn($column);
            this.grid.table.next().width(this.grid.table.width());
            this.column = this.grid.columns;
            this.setNoRecord();
        },
        showColumn: function($column) {
            this.grid.showColumn($column);
            this.grid.table.next().width(this.grid.table.width());
            this.column = this.grid.columns;
            this.setNoRecord();
        },
        toggleColumn: function($column, $show) {
            if($show) {
                this.showColumn($column);
            }
            else {
                this.hideColumn($column);
            }
        },
        toggleColumnByTitle: function($title, $show) {
            if(! this.grid) {
                this.grid = $("#" + this.gridID).data("kendoGrid");
            }
            for(var i = 0; i < this.grid.columns.length; i ++) {
                if(this.grid.columns[i].title === $title) {
                    this.toggleColumn(this.grid.columns[i], $show);
                    return;
                }
            }
        },
        toggleMultiColumnByTitle: function($list) {
            if(! this.grid) {
                this.grid = $("#" + this.gridID).data("kendoGrid");
            }
            for(var i = 0; i < this.grid.columns.length; i ++) {
                if(typeof ($list[this.grid.columns[i].title]) !== 'undefined') {
                    this.toggleColumn(this.grid.columns[i], $list[this.grid.columns[i].title]);
                }
            }
        },
        setReorder: function(reorder) {
            var self = this;
            if(typeof reorder !== 'undefined') {
                self.reorder = reorder;
            }
            self.grid.table.find('tbody').removeClass('disabled-drag');
            if(! self.reorder) {
                if(self.grid.table.data('kendoSortable')) {
                    self.grid.table.data('kendoSortable').destroy();
                    self.grid.table.find('tbody').addClass('disabled-drag');
                }
                return;
            }
            if(typeof self.reorder !== 'object') {
                self.reorder = {};
            }
            var _opt = {
                filter: ">tbody >tr",
                disabled: ".disabled-drag", //do not allow transferring the no records row
                hint: typeof self.reorder.hint === 'function' ? self.reorder.hint : function(e) {
                    return '<div class="k-widget k-grid"><table><tbody><tr>' + e.clone().
                        html() + '</tr></tbody></table></div>';
                },
                cursor: "move",
                cursorOffset: {top: 10, left: 10},
                placeholder: function(ele) {
                    return ele.clone().html('<td class="placeholder-sort" colspan="' + ele.children(
                        'td').length + '"></td>');
                },
                holdToDrag: typeof (self.reorder) === 'object' ? self.reorder.holdToDrag : false,
                ignore: typeof (self.reorder) === 'object' ? self.reorder.ignore : false,
                handler: typeof (self.reorder) === 'object' ? self.reorder.handler : false,
                connectWith: self.reorder.connectWith || false,
                end: function(e) {
                    var check = true;
                    if(e.action === 'sort' && e.oldIndex === e.newIndex) {
                        check = false;
                    }
                    if(e.action === 'remove' && self.reorder.correct) {
                        var place = $(e.sender.options.connectWith);
                        var drag = e.draggableEvent;
                        check = false;
                        var out = 5;
//                        $('body').append('<div class="area-dot" style="top:'+drag.clientY+'px ; left:'+drag.clientX+'px;"></div>');
                        place.each(function() {
                            if(! check) {
                                var rect = this.getBoundingClientRect();
                                if(rect.left - out < drag.clientX && drag.clientX < rect.right + out
                                    && rect.top - out < drag.clientY && drag.clientY < rect.bottom + out) {
                                    check = true;
                                }
                            }
                        });
                    }
                    if(check) {
                        if(typeof (self.reorder.end) === 'function') {
                            self.reorder.end(e);
                        }
                    }
                    else {
                        e.preventDefault();
                    }
                },
                change: function(e) { //change event handler implementation may differ according to the scenario
                    var grid = self.grid;
                    var skip = grid.dataSource.skip();
                    var length = grid.dataSource.data().length;
                    var total = grid.dataSource.total();
                    var oldIndex = e.oldIndex + (length === total ? skip : 0);
                    var newIndex = e.newIndex + (length === total ? skip : 0);
                    if(e.action === "remove") {
                        window.itemMoved = grid.dataSource.getByUid(e.item.data("uid"));
                        grid.dataSource.remove(window.itemMoved);
                    }
                    else if(e.action === "receive" && window.itemMoved !== null) {
                        grid.dataSource.insert(newIndex, window.itemMoved);
                    }
                    else if(e.action === "sort") {
                        window.itemMoved = grid.dataSource.getByUid(e.item.data("uid"));
                        grid.dataSource.remove(window.itemMoved);
                        grid.dataSource.insert(newIndex, window.itemMoved);
                    }
                    grid.saveChanges();
                    if(typeof (self.reorder.change) === 'function') {
                        self.reorder.change(e, grid, window.itemMoved, oldIndex, newIndex);
                    }
                }
            };
            if(typeof self.reorder === 'object') {
                var _event = ['start', 'move', 'cancel'];
                _event.forEach(function(item) {
                    if(self.reorder[item]) {
                        _opt[item] = self.reorder[item];
                    }
                });
            }
            self.grid.table.kendoSortable(_opt);
        },
        setNoRecord: function() {
            var self = this;
            if(self.grid.dataSource.total()) {
                return;
            }
            if(self.reorder && $.isEmptyObject(self.reorder)) {
                self.reorder = {};
            }
            if(! self.noRecord && ! self.reorder) {
                return;
            }
            if(! self.noRecord && (self.reorder && ! self.reorder.connectWith)) {
                return;
            }

            var colspan = 0;
            self.column.forEach(function(item) {
                if(! item.hidden) {
                    colspan ++;
                }
            });
            var check = self.grid.table.find('tbody tr.no-record td');
            if(check.length) {
                check.attr('colspan', colspan).show();
                return;
            }
            var str = "<tr class='no-record disabled-drag'><td colspan='" + colspan + "'>No records</td></tr>";
            if(! parseInt(self.noRecord) && typeof self.noRecord === 'string') {
                str = self.noRecord;
            }
            if(typeof self.noRecord === 'function') {
                str = self.noRecord();
            }
            self.grid.table.find('tbody').append(str);

        }
    };
    if(typeof $opt === "object") {
        obj.init($opt);
    }
    return obj;
};

if(jQuery.validator) {
    jQuery.validator.addMethod('12h', function(val, ele, params) {
        return /^(0[0-9]|1[01]):[0-5][0-9] (A|P)M$/i.test(val.toUpperCase());
    }, jQuery.validator.format('{0} is not match with 12h format 00:00 - 11:59 (am|pm)'));
    jQuery.validator.setDefaults({
        debug: true,
        errorPlacement: function(error, element) {
            return true;
        },
        invalidHandler: function(event, validator) {
            validator.messageList = [];
            Object.keys(validator.invalid).forEach(function(x) {
                var _msg = validator.submitted[x] || validator.settings.messages[x] || $(event.target).find(
                    '[name="' + x + '"]').data('msg-remote') || 'Please fix this field';
                validator.messageList.push(_msg);
            });
            setTimeout(function() {
                $.fn.showNotification({
                    type: "error",
                    title: "",
                    content: validator.messageList.join('<br>')
                });
            }, 100);

        },
        highlight: function($item, $error, $valid, $origin) {
            $($item).addClass($error).removeClass($valid);
            if($item.tagName === 'SELECT' && $($item).next().hasClass('bootstrap-select')) {
                $($item).next().find('button.selectpicker').addClass($error).removeClass($valid);
            }
        },
        unhighlight: function($item, $error, $valid, $origin) {
            $($item).addClass($valid).removeClass($error);
            if($item.tagName === 'SELECT' && $($item).next().hasClass('bootstrap-select')) {
                $($item).next().find('button.selectpicker').addClass($valid).removeClass($error);
            }
        },
        submitHandler: function($form, $event) {
            $event.preventDefault();
            Util.ajax({
                url: $($form).attr('action'),
                data: $($form).serializeObject(),
                method: 'post',
                dataType: 'json',
                showMessage: true
            });
        }
    });
}

var Reg = {
    HHmm: /([0-1][0-9]|2[0-3]):[0-5][0-9]/,
    HHmmss: /([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/,
};
var SSKEY = {
    INTERVAL: 'INTERVAL'
};

var Interval = {
    set: function($key, $func, $time) {
        var _func = $func;
        var _keys = Object.keys(arguments);
        var _listArgs = arguments;
        _keys = _keys.slice(3, _keys.length);
        var _list = Interval.all();
        var _args = [];
        _keys.forEach(function(_k) {
            _args.push(_listArgs[parseInt(_k)]);
        });
        if(_list[$key]) {
            clearInterval(_list[$key]);
        }
        if(typeof _func === 'function') {
            _list[$key] = setInterval(function() {
                QLog.log('Interval[' + $key + ']:' + (new Date()));
                _func.apply(null, _args);
            }, $time);
            SS.set(SSKEY.INTERVAL, _list);
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
        var _list = Interval.all();
        for(var _key in _list) {
            if($key instanceof RegExp) {
                if($key.test(_key)) {
                    clearInterval(_list[_key]);
                    delete _list[_key];
                }
            }
            else {
                if(_key === $key) {
                    clearInterval(_list[_key]);
                    delete _list[_key];
                    SS.set(SSKEY.INTERVAL, _list);
                    return true;
                }
            }
        }
        SS.set(SSKEY.INTERVAL, _list);
        return true;
    },
    clearList: function($keys) {
        var _list = Interval.all();
        for(var _key in _list) {
            if($keys.indexOf(_key) > - 1) {
                clearInterval(_list[_key]);
                delete _list[_key];
                SS.set(SSKEY.INTERVAL, _list);
                return true;
            }
        }
        return false;
    },
    all: function() {
        return SS.get(SSKEY.INTERVAL) || {};
    },
    clearAll: function() {
        var _list = Interval.all();
        for(var _key in _list) {
            clearInterval(_list[_key]);
        }
        return SS.set(SSKEY.INTERVAL, null);
    }
};

jQuery.fn.qCheckbox = function() {
    this.hide();
    var _checked = 'fa-check-square-o';
    var _unchecked = 'fa-square-o';
    if(this.length === 0) {
        return;
    }
    for(var i = 0; i < this.length; i ++) {
        $('<i class="qCheckbox fa ' + (this[i].checked ? _checked : _unchecked) + '"></i>').insertAfter(this[i]);
    }
    this.on('change', function() {
        $(this).next('i')
            .removeClass(this.checked ? _unchecked : _checked)
            .addClass(this.checked ? _checked : _unchecked);
    });
    this.next('i').on('click', function(event) {
        var _input = $(this).prev('input');
        if(_input.parents('label').length > 0) {
            event.preventDefault();
            _input.parents('label').trigger('click');
        }
        else {
            _input.trigger('click');
        }
    });
};
jQuery.fn.clock = function(opt) {
    if(this.length === 0) {
        return;
    }
    if(typeof opt === 'string') {
        if(opt === 'start') {
            this.removeClass('stop');
        }
        if(opt === 'stop') {
            this.addClass('stop');
        }
        return;
    }
    var _opt = opt || {};
    _opt.format = _opt.format || 'D. MMMM YYYY H:mm:ss';
    _opt.timezone = _opt.timezone || CONFIG.SERVER_TIMEZONE;
    var _id = Util.guid();
    this.addClass('clock').attr('data-uid', _id);
    for(var i = 0; i < this.length; i ++) {
        var _ele = $(this[i]);
        var _timezone = _ele.data('timezone') || _opt.timezone;
        var _format = _ele.data('format') || _opt.format;
        _ele.attr('data-timezone', _timezone).attr('data-format', _format);
        _ele.html(moment().tz(_timezone).format(_format));
    }
    jQuery.fn.createClock(_id);
    jQuery(document).unbind('CLOCK').bind('CLOCK', function() {
        Qlog.log('CLOCK EVENT');
    });
    return this;
};

jQuery.fn.createClock = function($id) {
    Interval.set('CLOCK_' + $id, function($id) {
        var _elementList = $('.clock[data-uid=' + $id + ']');
        var _listId = SS.get('CLOCK') || [];
        var _index = _listId.indexOf($id);
        if(_elementList.length === 0) {
            Interval.clear('CLOCK_' + $id);
            if(_index >= 0) {
                delete(_listId[_index]);
            }
            SS.set('CLOCK', _listId.length > 0 ? _listId : null);
            return;
        }
        if(_index < 0) {
            _listId.push($id);
        }
        SS.set('CLOCK', _listId);
        for(var i = 0; i < _elementList.length; i ++) {
            var _ele = $(_elementList[i]);
            var _timezone = _ele.data('timezone') || 'D. MMMM YYYY H:mm:ss';
            var _format = _ele.data('format') || CONFIG.SERVER_TIMEZONE;
            if(_ele.hasClass('stop')) {
                continue;
            }
            if(['INPUT', 'SELECT', 'TEXTAREA'].indexOf('tagName') > 0) {
                _ele.val(moment().tz(_timezone).format(_format));
            }
            else {
                _ele.html(moment().tz(_timezone).format(_format));
            }
        }
    }, 1000, $id);
//    jQuery(document).bind('DOMSubtreeModified', function() {
//
//    });
};

jQuery.fn.loadContent = function(opt) {
    if(this.length === 0) {
        return;
    }
    for(var i = 0; i < this.length; i ++) {
        var _ele = $(this[i]);
        var _url = _ele.data('url');
        if(! _url) {
            QLog('error', this[i], 'This node doesn\'t have attr data-url.');
            return;
        }
        jQuery.ajax({
            url: _url,
            beforeSend: function() {
                _ele.html('Loading content ...');
            },
            success: function(result) {
                _ele.html(result);
            },
            error: function(error) {
                _ele.html('Can not load content.');
                QLog.log(error);
            }
        });
    }
    return this;
};

jQuery.validator.addMethod("gte",
    function(value, element, param) {
        var $otherElement = $(param.object);
        if(! param.emptyAsZero && ! $otherElement.val()) {
            return true;
        }
        var compare = $otherElement.val() ? parseFloat($otherElement.val()) : 0;
        return parseFloat(value) >= compare;
    },
    function() {
        var $otherElement = $(arguments[0].object);
        var compare = $otherElement.val() ? parseFloat($otherElement.val()) : 0;
        return 'This field must greater than or equal + ' + compare;
    }
);
jQuery.validator.addMethod(
    "lte",
    function(value, element, param) {
        var $otherElement = $(param.object);
        if(! param.emptyAsZero && ! $otherElement.val()) {
            return true;
        }
        var compare = $otherElement.val() ? parseFloat($otherElement.val()) : 0;
        return parseFloat(value) <= compare;
    },
    function() {
        var $otherElement = $(arguments[0].object);
        var compare = $otherElement.val() ? parseFloat($otherElement.val()) : 0;
        return 'This field must less than or equal + ' + compare;
    }
);
jQuery.validator.addMethod(
    "multiemail",
    function(value, element) {
        if(this.optional(element)) // return true on optional element 
            return true;
        var emails = value.split(/[;,]+/); // split element by , and ;
        var valid = true;
        var invalid = [];
        for(var i in emails) {
            value = $.trim(emails[i]);
            if(! Util.isEmail(value)) {
                valid = false;
                invalid.push(value);
            }
        }
        $(element).data('errors', invalid);
        return valid;
    },
    function(param, element) {
        return $(element).data('errors').join(', ') + ' is not valid email.';
    }
);
var QValidator = function($form, $opt, $callback) {
    var _frm = $form;
    if(typeof $form === 'string' || ! ($form instanceof jQuery)) {
        _frm = $($form);
    }
    var _opt = $opt || {};
    _opt.submitHandler = function($form, $event) {
        $event.preventDefault();
        var _ajaxOption = {
            url: $($form).attr('action'),
            data: $($form).serializeObject(),
            method: 'post',
            dataType: 'json',
            showMessage: true,
        };
        if(typeof $callback === 'function') {
            _ajaxOption.success = $callback;
        }

        Util.ajax(_ajaxOption);
    };
    _frm.validate(_opt);
};
$.fn.qvalidate = function($opt, $callback) {
    QValidator(this, $opt, $callback);
};
var dataFilterUniqueDefault = function($result) {
    return $result.status < 1;
};
function validateRemote($ele, $url, $dataFilter) {
    var _url = $url || $ele.data('remote-url');
    if(! _url) {
        console.log('Remote url is not found!');
        return false;
    }
    return {
        url: _url,
        dataType: 'json',
        data: {
            data: function() {
                return $ele.val();
            }
        },
        dataFilter: function(result) {
            if(typeof result === 'string') {
                result = JSON.parse(result);
            }
            if(typeof $dataFilter === 'function') {
                return $dataFilter(result);
            }
            return dataFilterUniqueDefault(result);
        }
    };
}


function isUploadSupported() {
    if(navigator.userAgent.match(
        /(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
        return false;
    }
    return true;
}
;
if(window.ss) {
    jQuery.fn.uploader = function($opt) {
        if(! isUploadSupported()) {
            $.fn.showNotification({
                type: 'error',
                content: 'Your browser is not support upload file.'
            });
            return false;
        }
        var _opt = $opt || {};
//        _opt.cors = true;
        _opt.url = _opt.url || createUrl('file/upload');
        _opt.responseType = 'json';
        _opt.customHeaders = $.extend({}, _opt.customHeaders);
        _opt.isAjax = true;
        _opt.allowedExtensions = _opt.allowedExtensions || ['jpg', 'jpeg', 'png', 'gif', 'xlsx', 'pdf', 'docx', 'pptx'
        ];
        _opt.maxSize = 10485760;
        _opt.onExtError = function(file_name, extension) {
            $.fn.showNotification({
                type: 'error',
                content: 'File ' + file_name + ' type .' + extension
                    + ' is not allowed to upload.File types supported : '
                    + this._opts.allowedExtensions.join(', ') + '.'
            });
        };
        _opt.onSizeError = function(file_name, size) {
            $.fn.showNotification({
                type: 'error',
                content: 'File ' + file_name + ' size ' + size
                    + '(kb) is exceed the maximum file size allowed. Maximum file size allowed : '
                    + this._opts.maxSize + '(kb).'
            });
        };
        _opt.startXHR = function() {
            $.fn.showLoading();
        };
        _opt.endXHR = function() {
            $.fn.hideLoading();
        };
        if(! this.length) {
            console.log('no element to generate uploader');
        }
        for(var i = 0; i < this.length; i ++) {
            var _ele = jQuery(this[i]);
            if(_opt.isDrop) {
                _opt.dropZone = _ele;
            }
            else {
                _opt.button = _ele;
            }
            _opt.name = _ele.attr('name') || _ele.data('name') || 'file-upload';
            _opt.name = 'hello';
            var uploader = new ss.SimpleUpload(_opt);
            _ele.data('Uploader', uploader);
        }
    };
}