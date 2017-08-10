/* global Lang, baseUrl, AjaxList */

jQuery.fn.extend({
    showErrorMsgFromModel: function (errorsObj) {
        var _errorsMsg = "";
        if (typeof errorsObj == 'string') {
            _errorsMsg = errorsObj;
        } else {
            $.each(errorsObj, function (i, val) {
                _errorsMsg += '<span>' + val + '</span>' + '</br>';
            });
        }
        // if (_errorsMsg != '')
        //     _errorsMsg = '<ul>' + _errorsMsg + '</ul>';
        var obj = {title: "", content: _errorsMsg};
        $.fn.notifError(obj);
    },
    updateContentEditor: function (from, to) {
        to.val(from.html());
    },
    hidePopupOf: function (elementIDorClass) {
        var modalID = $('body').find(elementIDorClass).parents('div.modal').attr('id');
        if ('' != $.trim(modalID)) {
            $('body').find('#' + modalID).nextAll('div.modal-backdrop').css('display', 'none');
            $('body').find('#' + modalID).nextAll('div.modal-backdrop').empty();
            $('body').find('#' + modalID).nextAll('div.modal-backdrop').remove();
            $('body').find('#' + modalID).modal('hide');
            $('body').find('#' + modalID).empty();
            $('body').find('#' + modalID).remove();
        }
    },
    showAlert: function (obj, applyTo) {
        var modalID = 'alert' + $.fn.randomNum();
        var strBtn = '';
        var modalTitle = '', modalContent = '';
        if (!applyTo || applyTo == '') {
            applyTo = 'siteModalBody'
        }
        if (typeof (obj) === 'object') {
            if (obj.buttons) {
                var buttonObj = obj.buttons;
                for (var key in buttonObj) {
                    if (buttonObj[key].text) {
                        strBtn += '<button class="btn';
                        strBtn += (buttonObj[key].isPrimary) ? ' btn-primary' : ' btn-default';
                        strBtn += (buttonObj[key].class) ? ' ' + buttonObj[key].class : '';
                        strBtn += '"';
                        strBtn += (buttonObj[key].isSubmit) ? ' type="Submit"' : ' type="button"';
                        strBtn += (buttonObj[key].dismiss) ? ' data-dismiss="alert"' : '';
                        strBtn += (buttonObj[key].func) ? ' onclick="$.fn.hideAlert(\'#' + modalID + '\');' + buttonObj[key].func + '"' : ' onclick="$.fn.hideAlert($(\'#' + modalID + '\'));"';
                        strBtn += '>' + buttonObj[key].text + '</button>';
                    }
                }
            }
            if (obj.title) {
                modalTitle = obj.title;
            }
            if (obj.content) {
                modalContent = obj.content;
            }
        }
        if (strBtn == '') {
            strBtn = '<button type="button" class="btn btn-primary close" data-dismiss="alert" aria-hidden="true" onclick="$.fn.hideAlert($(\'#' + modalID + '\'));">OK</button>';
        }
        var html = '<div class="alert alert-danger fade in" role="alert" id="' + modalID + '">' +
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                '<h4>' + modalTitle + '</h4>' +
                '<div class="alertBody">' + modalContent + '</div>' +
                '<p>' +
                strBtn +
                '</p>' +
                '</div>';
        $('#' + applyTo).find('.alert.alert-danger').alert('close');
        $('#' + applyTo).append(html);
    },
    hideAlert: function (e) {
        e.alert('close');
        e.empty();
        e.remove();
    },
    isValidEmail: function (email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },
    isNumber: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isInteger: function (number) {
        var er = /^-?[0-9]+$/;
        return er.test(number);
    },
    isDecimal: function () {
        if (this.length > 0) {
            var _this = $(this);
            return /^\d+(\.\d{1,2})?$/.test(_this.val());
        } else
            return false;
    },
    isDate: function (txtDate) {
        var currVal = txtDate;
        if (currVal == '')
            return false;

        //Declare Regex
        var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{2,4})$/;
        var dtArray = currVal.match(rxDatePattern); // is format OK?

        if (dtArray == null)
            return false;

        //Checks for mm/dd/yyyy format.
        var dtMonth = dtArray[1];
        var dtDay = dtArray[3];
        var dtYear = dtArray[5];

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }
        return true;
    },
    isTime: function (strTime) {
        var regex = /^([0-1]\d):([0-5]\d)\s?(?:AM|PM)?$/i;
        return regex.test(strTime);
    },
    isMaxLength: function () {

    },
    dismissModal: function (e) {
        /**
         * This is for call this function direction from external
         * $.fn.dismissModal('#someID');
         */
        if (typeof (e) === 'string') {
            //if(typeof global != "undefined") global.setRefresh();
            $('body').find(e).nextAll('div.modal-backdrop').css('display', 'none');
            $('body').find(e).nextAll('div.modal-backdrop').remove();
            $('body').find(e).modal('hide');
            $('body').find(e).remove();
        }
        /**
         * this for call this function in the element of the modal
         * <button data-dismiss="modal" value="Some value">
         */
        else {
            var modalID = e.parents('div.modal').attr('id');
            if ('' != $.trim(modalID)) {
                //if(typeof global != "undefined") global.setRefresh();
                $('body').find('#' + modalID).nextAll('div.modal-backdrop').css('display', 'none');
                $('body').find('#' + modalID).nextAll('div.modal-backdrop').empty();
                $('body').find('#' + modalID).nextAll('div.modal-backdrop').remove();
                $('body').find('#' + modalID).modal('hide');
                $('body').find('#' + modalID).empty();
                $('body').find('#' + modalID).remove();
                $('body').find('div.modal-backdrop').remove();
            }
        }
    },
    activeTabByHash: function (_hash) {
        if ($.trim(_hash) != '') {
            $('body').find('a[href="' + _hash + '"]').parents('ul').find('>li').each(function () {
                $(this).removeClass('active');
            });
            $('body').find('a[href="' + _hash + '"]').parent('li').addClass('active');
            $(_hash).parent('div').find('>div').each(function () {
                $(this).removeClass('active');
            });
            $(_hash).addClass('active');
        }
    },
    tabInit: function (tabClass, allowHash) {
        $('ul.' + tabClass + '>li').each(function () {
            $('>a', this).click(function () {
                var nextTab = $(this).attr('href');
                $(this).parents('ul').find('>li').each(function () {
                    $(this).removeClass('active');
                });
                $(this).parent('li').addClass('active');
                $(nextTab).parent('div').find('>div').each(function () {
                    $(this).removeClass('active');
                });
                $(nextTab).addClass('active');
                if (allowHash == true) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    },
    /**
     * init jquery ajax function
     * @param obj obj.url, obj.type, obj.success ....
     */
    /**
     * Apply kendo grid to element
     * @param applyTo object: $('#exsample')
     * @param columns
     * @param url
     * @param dataSourceType ex: 'read'
     * @param options ex: {pageable:false}
     */
    getMousePosition: function (e) {
        var _this = $(this);
        var offset = _this.offset();
        var w = _this.width();
        var h = _this.height();
        var pos = {
            left: e.pageX - offset.left,
            top: e.pageY - offset.top,
            bottom: h - (e.pageY - offset.top),
            right: w - (e.pageX - offset.left)
        };
        return pos;
    },
    /**
     * This is confirm dialog
     * @param msg message
     * @param func this is function when user click on "yes" button
     */
    replaceAll: function (string, find, replace) {
        return string.replace(new RegExp($.fn.escapeRegExp(find), 'g'), replace);
    },
    escapeRegExp: function (string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },
    /**
     * Sleep ()
     */
    sleep: function (seconds, func) {
        setTimeout(function () {
            func();
        }, (seconds * 1000));
    },
    emailTemplateForm: function (obj) {
        if (typeof (obj) === 'object') {
            $.fn.setAjax({
                url: obj.url, type: 'post', data: obj.data, success: function (result) {
                    $.fn.showPopup({content: result, title: obj.title, width: '660px', buttons: {}});
                }
            });
        }
    },
    strFormat: function (str, col) {
        col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

        return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
            if (m == "{{") {
                return "{";
            }
            if (m == "}}") {
                return "}";
            }
            return col[n];
        });
    },
    getQueryStrings: function (url) {
        url = typeof url !== 'undefined' ? url : window.location.href;
        var vars = [], hash;
        var hashes = url.slice(url.indexOf('?') + 1).split('&');

        var anchor = document.createElement('a');
        anchor.href = url;

        var queyrystring_id = anchor.pathname.slice(anchor.pathname.lastIndexOf('/') + 1);

        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        if (this.isNumber(queyrystring_id)) {
            vars.push('id');
            vars['id'] = queyrystring_id;
        }


        return vars;
    },
    checkCustomRequired: function (elements, returnObj) {
        var _msg = [];
        var _isValid = true;
        var _returnObj = (returnObj) ? true : false;

        $.each(elements, function (index, e) {
            if ($(e).val() == '') {
                $(e).addClass('error');
                if ($(e).hasClass('datepicker'))
                    $(e).parent().addClass('error');
                var _message = '<span>' + $(e).attr('data-msg-error') + '</span>' + '</br>';
                if ($.inArray(_message, _msg) < 0)
                    _msg.push(_message);
            } else {
                $(e).removeClass('error');
                var _parent = $(e).parent();
                if (_parent.hasClass('error'))
                    _parent.removeClass('error');
            }
        });

        if (_msg.length > 0)
            _isValid = false;

        return _returnObj ? {isValid: _isValid, msg: _msg.join('')} : _isValid;
    },
    view: function (selector) {
        $(selector + " input[type='text']").removeAttr('readonly');
        $(selector + " input[type='text']").prop('disabled', true);
        $(selector + " input[type='radio']").prop('disabled', true);
        $(selector + " input[type='checkbox']").prop('disabled', true);
        $(selector + " input[type='checkbox']").attr('onclick', 'return false;');
        $(selector + " button").prop('disabled', true);
        $(selector + " select").prop('disabled', true);
        $(selector + " select").attr('onfocus', 'this.blur()');
        $(selector + " select").selectpicker('refresh');
        $(selector + " .timepicker input[type=text]").each(function () {
            $(this).data("kendoTimePicker").enable(false);
        });

        $('div.modal-footer button.btn-default.right').addClass('hide');
    },
    checkResult: function (result) {
        if (result) {
            var _result = $.parseJSON(result);
            if (typeof (_result) === 'object' && _result.success == 1) {
                if (_result.notif && _result.notif.content) {
                    $.fn.notifSuccess(_result.notif)
                }
                return true;
            } else if (typeof (_result) === 'object' && _result.error != '') {
                $.fn.showErrorMsgFromModel(_result.error);
                // $.fn.notifError(_result.error);
            } else if (typeof (_result) === 'object' && _result.popup == 1) {
                $.fn.showPopup({
                    title: '',
                    content: _result.notif.content,
                    width: '550px',
                    buttons: {
                        c: {text: 'OK', class: 'left', dismiss: true},
                    },
                });
                return true;
            } else if (typeof (_result) === 'object' && _result.custom_popup == 1) {
                $.fn.showPopup({
                    title: '',
                    content: _result.notif.content,
                    width: '550px',
                    buttons: _result.notif.buttons,
                    removeBtnClose: typeof _result.notif.removeBtnClose != "undefined" && _result.notif.removeBtnClose != ''
                });
                return true;
            }
        }
        return false;
    },
    date: function (format, val) {
        var _this = '';

        if (typeof val != "undefined") {
            if ($.isArray(val))
                _this = new Date(val[0], val[1], val[2]);
            else
                _this = new Date(val);
        } else
            _this = new Date();

        if (_this != '') {
            var yyyy = _this.getFullYear().toString();
            var mm = (_this.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = _this.getDate().toString();

            if (format == 'mm-dd-yyyy') {
                return (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]) + '-' + yyyy;
            }
        } else
            return _this;

    },
    serializeArrayToJSON: function (seriallizeData, ignoreName) {
        var obj = {};
        if (typeof seriallizeData != "undefined" && seriallizeData.length > 0) {
            for (var a = 0; a < seriallizeData.length; a++) {
                if (typeof ignoreName != "undefined" && ignoreName.length > 0 && ignoreName.indexOf(seriallizeData[a].name) > -1) {
                    continue;
                }

                obj[seriallizeData[a].name] = seriallizeData[a].value;
            }
        }
        return obj;
    },
    filterForm: function () {
        if ($('.filter-form').hasClass('filter-slideup')) {
            $('.filter-form').removeClass('filter-slideup');
            $('.filter-form').addClass('filter-slidedown');
            $('.filter-form').slideDown();
        } else if ($('.filter-form').hasClass('filter-slidedown')) {
            $('.filter-form').removeClass('filter-slidedown');
            $('.filter-form').addClass('filter-slideup');
            $('.filter-form').slideUp();
        }
    },
    setVal: function (i, v) {
        if (typeof v == "undefined" || v == "undefined undefined - undefined")
            v = '';

        var _e = $(i);
        if (_e.length > 0) {
            if (_e.is('input'))
                _e.val(v);
            else if (_e.is('label'))
                _e.text(v);
        }
    },
    setTabIndex: function (selector) {
        var _i = 0;
        $(selector).each(function (i) {
            $(this).attr('tabindex', i + 1);
            _i = i + 1
        });
        return _i;
    },
    setNumericWithComma: function (selector) {
        $(selector).val(function (index, value) {
            return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
        $(selector).keyup(function (event) {
            if (event.which >= 37 && event.which <= 40)
                return;
            var value = $(this).val().replace(/,/g, "");
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            $(this).val(value);
            // format number
            $(this).val(function (index, value) {
                return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            });
        });
    },
    onKeyDoubleOnly: function (key) {
        key = typeof key == "undefined" ? 'keypress' : '';

        if (this.length > 0) {
            this.each(function () {
                switch (key) {
                    case 'keypress':
                        $(this).keypress(function (event) {
                            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                                event.preventDefault();
                            }
                        });
                        break;

                }

            });
        }
    },
    onKeyIntegerOnly: function (key) {
        key = typeof key == "undefined" ? 'keyup' : '';
        var selector = this.selector.replace('.', '');

        if (this.length > 0) {
            this.each(function () {
                var _this = $(this);

                if (_this.is('input')) {
                    _this.val(function (index, value) {
                        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    });

                    switch (key) {
                        case 'keyup':
                            _this.keyup(function (event) {
                                if (event.which >= 37 && event.which <= 40)
                                    return;
                                var value = $(this).val().replace(/,/g, "");
                                if (value.length > 5) {
                                    value = value.slice(0, 5);
                                }
                                $(this).val(value);
                                // format number
                                //$(this).val(function (index, value) {
                                //    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/^0+/, '');
                                //});
                            });

                            break;

                    }
                }

            });
        }
    },
    cke: function (obj) {
        var isObj = typeof obj != "undefined";

        var toolbar = isObj && typeof obj.toolbar != "undefined" ? obj.toolbar
                : ['PasteFromWord', '-',
                    'Bold', 'Italic', 'Underline', 'Strike', '-',
                    'NumberedList', 'BulletedList', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
                    'Link', '-', 'Maximize'];
        if (this.length > 0) {
            this.each(function () {
                var _id = this.id;
                CKEDITOR.replace(_id, {
                    toolbar: [toolbar],
                    height: 90,
                    //width: '100%',
                    ckeditor: '../../ckeditor/ckeditor.php',
                    ckBasePath: '../../ckeditor/',
                    css: '../../ckeditor/contents.css',
                    on: {
                        instanceReady: function () {
                            //var commonFunc = function () {
                            //
                            //    CKEDITOR.instances[_id].updateElement();
                            //};
                            //this.document.on("keyup", function(){
                            //
                            //    commonFunc();
                            //});
                            //this.document.on("paste", function () {
                            //
                            //    commonFunc();
                            //});
                            //this.document.on("keypress", function () {
                            //
                            //    commonFunc();
                            //});
                            //this.document.on("blur", function () {
                            //
                            //    commonFunc();
                            //});
                            //this.document.on("change", function () {
                            //
                            //    commonFunc();
                            //});
                        }
                    }
                });
            });

        }
    },
    getVal: function () {
        var values = [];
        if (this.length > 0) {
            this.each(function (i, v) {
                var _this = $(this);
                if (_this.is('input')) {
                    values.push(_this.val());
                } else if (_this.is('label'))
                    values.push(_this.text());
                else if (_this.is('select')) {
                    values.push(_this.val());
                } else if (_this.is('textarea')) {
                    if (_this.hasClass('editor')) {
                        var editor = CKEDITOR.instances[this.id]; // This works
                        if (editor) {
                            values.push(editor.getData());
                        }
                    } else
                        values.push(_this.val());
                }
            });
        }
        return values.length == 1 ? values[0] : values;
    },
    destroyKendoGrid: function () {
        var _this = $(this.selector);
        if (this.length > 0) {
            if (_this.attr('data-role') == 'grid') {
                var _kendo = _this.data("kendoGrid");
                if (_kendo) {
                    return _kendo.destroy();
                }
            }
        }
        return null;
    },
    query: function () {
        var _this = $(this.selector);
        if (this.length > 0) {
            this.each(function () {
                var _grid = $(this);
                if (_grid.attr('data-role') == 'grid') {
                    var _kendo = _grid.data("kendoGrid");
                    if (_kendo)
                        _kendo.dataSource.query();
                }
            })
        }
    },
    visibleColumnsKendoGrid: function (key, value) {
        if (this.length > 0 && typeof key != "undefined") {
            this.each(function (i, v) {
                var _this = $(this);
                if (_this.hasClass('k-grid')) {
                    var _grid = _this.data('kendoGrid');
                    if (typeof _grid != "undefined") {
                        if (!value) {
                            _grid.hideColumn(key);
                            //when grid display none, grid head not change to hidden when using hideColumn function
                            _grid.thead.find('>tr>th[data-field="' + key + '"]').hide();
                        } else
                            _grid.showColumn(key);
                    }
                }
            });
        }
    },
//    validate: function (form) {
//        var msg = [];
//        var isValid = false;
//        form.find('.required').each(function () {
//            if ($(this).val() == '' || this.text == '')
//                msg.push($(this).attr('data-msg-error'));
//        });
//        if (msg.length == 0)
//            isValid = true;
//        else {
//            isValid = false;
//            $.fn.showMorePopupV2({
//                title: 'Warning!', content: msg.toString(), buttons: {ok: {text: 'OK', isPrimary: 1}},
//                dialogOption: {
//                    backdrop: 'static',
//                    keyboard: false
//                }
//            });
//        }
//        return isValid;
//    },
    showMorePopupV2: function (obj) {
        if (typeof (obj) === 'object') {
            var modalID = 'modal' + $.fn.randomNum();
            var modalTitle = '', modalContent = '';
            if (obj.title) {
                modalTitle = obj.title;
            }
            if (obj.content) {
                modalContent = obj.content;
            }
            /**
             * use this option if you want to use larger width of modal
             */
            if (obj.size && obj.size == 'big') {
                $('#' + modalID + '>div.modal-dialog').attr('class', 'modal-dialog modal-lg');
            } else if (obj.size && obj.size == 'small') {
                $('#' + modalID + '>div.modal-dialog').attr('class', 'modal-dialog modal-sm');
            } else {
                $('#' + modalID + '>div.modal-dialog').attr('class', 'modal-dialog');
            }
            var strBtn = '';
            if (obj.buttons) {
                var buttonObj = obj.buttons;
                for (var key in buttonObj) {
                    if (buttonObj[key].text) {
                        strBtn += '<button class="btn';
                        strBtn += (buttonObj[key].isPrimary) ? ' btn-primary' : ' btn-default';
                        strBtn += (buttonObj[key].class) ? ' ' + buttonObj[key].class : '';
                        strBtn += '"';
                        strBtn += (buttonObj[key].isSubmit) ? ' type="Submit"' : ' type="button"';
                        strBtn += (buttonObj[key].dismiss) ? ' data-dismiss="modal"' : '';
                        strBtn += (buttonObj[key].func) ? ' onclick="$.fn.hideMorePopup($(\'#' + modalID + '\'));' + buttonObj[key].func + '"' : ' onclick="$.fn.hideMorePopup($(\'#' + modalID + '\'))"';
                        strBtn += '>' + buttonObj[key].text + '</button>';
                    }
                }
            }
            var dialogOption = null;
            if (obj.dialogOption) {
                dialogOption = obj.dialogOption;
            }
            var html = '<div class="modal fade" id="' + modalID + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<h4 class="modal-title">' + modalTitle + '</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    modalContent +
                    '</div>' +
                    '<div class="modal-footer" id="' + modalID + 'Footer">' +
                    strBtn +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            $('body').append(html);
            $('#' + modalID).modal(dialogOption);
            $('#' + modalID).next('.modal-backdrop').css('z-index', 1060);
            $('#' + modalID).css('z-index', 1070);
        }
    },
    hideMorePopup: function (e) {
        e.next('div.modal-backdrop').css('display', 'none');
        e.next('div.modal-backdrop').empty();
        e.next('div.modal-backdrop').remove();
        e.modal('hide');
        e.empty();
        e.remove();
    },
    getFormAttributes: function () {
        var obj = {};
        if (this.length > 0) {
            var seriallizeArray = $(this).serializeArray();
            if (typeof seriallizeArray != "undefined" && seriallizeArray.length > 0) {
                for (var a = 0; a < seriallizeArray.length; a++) {
                    var matches = seriallizeArray[a].name.match(/\[(.*?)\]/);
                    if (matches && matches.length > 0) {
                        obj[matches[1]] = seriallizeArray[a].value;
                    }
                }
            }
        }
        return obj;
    },
    qqFineUploader: function (obj) {

        var isObj = typeof obj != "undefined";

        if (this.length > 0) {
            this.each(function () {
                var _this = $(this);
                var _data = _this.data();


                var fineUploader = new qq.FineUploader({
                    element: this,
                    request: {
                        endpoint: _data.endpoint
                    },
                    onSubmit: function () {
                        uploader.setParams({
                            anotherParam: 'value'
                        });
                    },
                    multiple: false,
                    maxConnections: 10,
                    validation: {
                        allowedExtensions: ['jpeg', 'jpg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'zip', 'rar'],
                        sizeLimit: 10 * 1024 * 1024
                    },
                    text: {
                        uploadButton: 'Attach files'
                    },
                    callbacks: {
                        onComplete: function (id, fileName, responseJSON) {
                            if (responseJSON.success) {
                                _this.find('img#loading').remove();
                                if (typeof obj.onComplete != "undefined")
                                    obj.onComplete();
                            }
                        },
                        onUpload: function (id, fileName) {
                            if (fileName.search('%') >= 0 || fileName.search('#') >= 0) {
                                alert('Can not upload this file because it contain special characters "#" or "%". Please remove it!.');
                                return false;
                            }
                            if (typeof obj.onUpload != "undefined")
                                obj.onUpload();
                        }
                    }
                });


            });
        }
    },
    updateQueryStringParameter: function (key, value) {
        if (this.length > 0) {
            this.each(function () {
                var _this = $(this);
                var uri = _this.attr('action');

                var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
                var separator = uri.indexOf('?') !== -1 ? "&" : "?";
                if (uri.match(re)) {
                    uri = uri.replace(re, '$1' + key + "=" + value + '$2');
                } else {
                    uri = uri + separator + key + "=" + value;
                }

                _this.attr('action', uri);
            });
        }
    },
    getWidth: function () {
        var width = 0;
        this.each(function (i, element) {
            width += $(element).width();
        });
        return width;
    },
    resizeColumn: function (title, width) {
        var clone = this.find(" .k-grid-header-wrap th:visible");
        var index = '';

        clone.each(function (i, element) {
            var _data = $(element).data();

            if (_data.field == title) {
                index = i;
                return;
            }
        });

        var _header = this.find(".k-grid-header-wrap") //header
                .find("colgroup col")
                .eq(index);

        var _content = this.find(".k-grid-content") //content
                .find("colgroup col")
                .eq(index);


        //if(width > _header.width()){
        _header.css({width: width});
        _content.css({width: width});
        //}
    },
    setMask: function () {
        if (this.length > 0) {
            var allowSymbolRegex = function () {
                var _regex = '';

                if (this != '') {
                    var i = this.length;
                    while (i--) {
                        _regex += '\\\\\\' + this[i];
                    }
                }

                return _regex;
            };
            this.each(function () {
                var _this = $(this);
                var _data = _this.data();
                var _format = '*';
                var _option = {};
                var _allow_symbol = typeof _data.allow_symbol != "undefined" ? allowSymbolRegex.call(_data.allow_symbol) : '';

                if (_this.hasClass('numeric')) {
                    var _digits = typeof _data.digits != "undefined" ? _data.digits : false;
                    _format = _digits ? 'decimal' : 'integer';

                    _option = {
                        digits: _digits,
                        digitsOptional: true,
                        groupSeparator: typeof _data.separator != "undefined" ? _data.separator : "",
                        autoGroup: true,
                        allowPlus: false,
                        allowMinus: typeof _data.allow_minus != "undefined" ? _data.allow_minus : false,
                        clearMaskOnLostFocus: false,
                        removeMaskOnSubmit: false,
                        rightAlign: false,
                        radixPoint: typeof _data.radix_point != "undefined" ? _data.radix_point : false
                                //regex: "[0-9]*",
                    };
                } else if (_this.hasClass('alpha')) {
                    _format = 'Regex';
                    _option = {regex: "[a-zA-Z0-9" + _allow_symbol + "]{1,50}"};
                } else if (_this.hasClass('percentage')) {
                    _format = 'Regex';
                    _option = {regex: "^[1-9][0-9]?$|^100|^N/A|^0$"};
                }

                _this.inputmask(_format, _option);
                //_this.inputmask('Regex',_option);
            });
        }
    },
    popup: function () {
        if (this.length > 0) {
            $.fn.showMorePopup({
                title: 'Warning',
                content: this.html(),
                width: '550px',
                buttons: {
                    c: {text: 'OK', class: 'left', dismiss: true},
                },
            });
        }
    },
    dateTimePicker: function () {
        if (this.length > 0) {
            this.each(function () {
                var _this = $(this);
                var _data = _this.data();
                _this.kendoDateTimePicker({
                    change: function () {
                    },
                    format: typeof _data.format ? _data.format : "MM-dd-yyyy",
                    parseFormats: ["MM-dd-yyyy", "MM/dd/yyyy", "MM-dd-yy"]
                });
            });
        }
    },
    createCORSRequest: function (method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    },
    getTitle: function (text) {
        return text.match('<title>(.*)?</title>')[1];
    },
    makeCorsRequest: function (url) {
        var xhr = $.fn.createCORSRequest('POST', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function () {
            var text = xhr.responseText;
            var title = $.fn.getTitle(text);
            //alert('Response from CORS request to ' + url + ': ' + title);
        };

        xhr.onerror = function () {
            alert('Woops, there was an error making the request.');
        };

        xhr.send();
    },
    autoComplete: function (options) {
        if (this.length > 0) {
            this.each(function () {
                var _this = $(this);
                var _data = _this.data();

                var _option = {
                    dataSource: new kendo.data.DataSource({
                        transport: {
                            read: function (options) {
                                $.fn.setAjax({
                                    url: _data.url, type: "get", dataType: "json",
                                    success: function (result) {
                                        options.success(result);
                                    }
                                });
                            }
                        }
                    }),
                    dataTextField: typeof _data.field != "undefined" ? _data.field : '',
//                filter: "contains"
                    select: function (e) {
                        var dataItem = this.dataItem(e.item.index());
                        if (typeof options.select == "function")
                            options.select(dataItem, e.sender.element);
                    }
                };

                if (typeof options.dataBound == "function")
                    _option.dataBound = options.dataBound;

                _this.kendoAutoComplete(_option).data("kendoAutoComplete")
                        .list.width(typeof _data.width != "undefined" ? _data.width : 200);
            });
        }

    },
    defaultFirst: function () {

        if (this.length > 0) {
            var _this = $(this);
            var readOnlyLength = _this.val().length;

            _this.text(readOnlyLength);

            _this.on('keypress, keydown', function (event) {
                _this.text(event.which + '-' + this.selectionStart);
                if ((event.which != 37 && (event.which != 39))
                        && ((this.selectionStart < readOnlyLength)
                                || ((this.selectionStart == readOnlyLength) && (event.which == 8)))) {
                    return false;
                }
            });
        }
    },
    updateCKE: function () {
        for (var i in CKEDITOR.instances) {
            CKEDITOR.instances[i].updateElement();
        }
    },
    appendContent: function () {
        if (this.length == 1) {
            var _data = this.data();
            $.fn.setAjax({
                url: _data.url, success: function (content) {
                    var selector = $(_data.append_to);
                    if (selector.length > 0)
                        selector.html(content);
                }
            })
        }

    },
    randomNum: function (from, to) {
        if (!from) {
            from = 1;
        }
        if (!to) {
            to = 1000;
        }
        return Math.floor((Math.random() * from) + to);
    },
    validateEmail: function (email) {
        var re = /^([a-zA-Z0-9])+(([_.])?([a-zA-Z0-9])+)*[@]([a-zA-Z0-9])+[.]([a-zA-Z0-9]{3})+$/;
        return re.test(email);
    },
    validatePassword: function (password) {
        var re = /^([\w^\S])+$/gm;
        return re.test(password);
    },
    str_lead: function ($str, $length, $ch) {
        var _str = $str || '';
        var _length = $length || 5;
        var _ch = $ch || '0';
        if (_str.length >= _length) {
            return _str;
        }
        for (var i = 0; i < _length; i++) {
            _str = _ch + _str;
        }
        return _str.substr(-_length);
    },
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        if (typeof exdays == 'undefined')
            exdays = 365 * 5; //default cookie will be expired after 5 years
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    deleteCookie: function (cname) {
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    },
    serializeObject: function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
});

if (!Object.keys) {
    Object.keys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}


function htmlDecode(value) {
    return $("<textarea/>").html(value).text();
}

function htmlEncode(value) {
    return $('<textarea/>').text(value).html();
}

$.htmlDecode = htmlDecode;
$.htmlEncode = htmlEncode;

String.prototype.capitalize = function (all) {
    if (this.length === 0) {
        return '';
    }
    var str = this.toLowerCase();
    if (!all) {
        return str[0].toUpperCase() + str.substr(1);
    }
    return str.replace(/(^|\s|-|_|\t|\n|\v)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
    });
};

function getYesNo(value) {
    if (typeof (value) === 'undefined' || value + '' === '0') {
        return Lang.Comon.no.capitalize();
    }
    return Lang.Comon.yes.capitalize();
}

function emptyFromColumn($column) {
    var _column = $column || [];
    var _object = {};
    _column.forEach(function (x) {
        if (x.field) {
            _object[x.field] = '';
        }
    });
    return _object;
}

function emptyFromObj($obj) {
    var _object = {};
    Object.keys($obj).forEach(function (x) {
        if (x) {
            _object[x] = '';
        }
    });
    return _object;
}

function arrayMin($arr, $length, $emptyObj) {
    var _arr = $arr || [];
    var _length = $length || 10;
    var _obj = {};
    if (!$emptyObj && _arr.length > 0) {
        Object.keys(_arr[0]).forEach(function (x) {
            _obj[x] = '';
        });
    } else {
        _obj = $emptyObj;
    }
    if (_arr.length < _length) {
        for (var i = _arr.length; i <= _length; i++) {
            _arr.push(_obj);
        }
    }
    return _arr;
}

window.onbeforeunload = window.onunload = function () {
    for( var x in AjaxList){AjaxList[x].abort();}
    return null;
};

jQuery(window).load(function () {
    // PAGE IS FULLY LOADED  
    // FADE OUT YOUR OVERLAYING DIV
    $('#preloadpage').fadeOut();
});
