/* global Util, AjaxList, baseUrl, enums */

jQuery.fn.extend({
    showLoading: function (appendTo) {
        if (appendTo && typeof (appendTo) === 'object') {
            if (appendTo.find('.loadingBox').length < 1) {
                var strHTML = '<div class="loadingBox"></div><div class="loadingBoxOverlay"></div>';
                appendTo.append(strHTML);
            }
            appendTo.addClass('loading');
        } else {
            if ($('body > .loadingBox').length < 1) {
                var strHTML = '<div class="loadingBox"></div><div class="loadingBoxOverlay"></div>';
                $('body').append(strHTML);
            }
            $('body').addClass('loading');
        }
    },
    hideLoading: function (appendTo) {
        if (appendTo && typeof (appendTo) === 'object') {
            appendTo.removeClass('loading');
            appendTo.find('.loadingBox').remove();
            appendTo.find('.loadingBoxOverlay').remove();
        } else {
            $('body').removeClass('loading');
            $('body > .loadingBox').remove();
            $('body > .loadingBoxOverlay').remove();
        }
    },
    showPopup: function (obj) {
        if (typeof (obj) === 'object') {
            var modalID = 0;
            var idAtt;
            $('body').find('.modal').each(function () {
                idAtt = $(this).attr('id').replace(/[^\d.]/g, '');
                idAtt = parseInt(idAtt);
                if (modalID < idAtt) {
                    modalID = idAtt;
                }
            });
            modalID = 'modal' + (modalID + 1);
            var modalTitle = '', modalContent = '';
            var modalSize = '';
            if (obj.title) {
                modalTitle = obj.title;
            }
            if (obj.content) {
                modalContent = obj.content;
            }

            /**
             * use this option if you want to use larger width of modal
             */
            var modalStyle = '', modalSize = '';
            if (obj.width) {
                modalStyle = ' style="width:' + obj.width + '"';
            } else if (obj.size && obj.size == 'big') {
                modalSize = 'modal-lg';
            } else if (obj.size && obj.size == 'small') {
                modalSize = 'modal-sm';
            }
            var strBtn = '';
            if (obj.buttons) {
                var buttonObj = obj.buttons;
                var count = 0;
                for (var key in buttonObj) {
                    if (buttonObj[key].text) {
                        count++;
                        var onClickFunc = '';
                        if (buttonObj[key].func)
                            onClickFunc += buttonObj[key].func;
                        var mouseOverFunc = '';
                        if (buttonObj[key].mouseOver)
                            mouseOverFunc = buttonObj[key].mouseOver;
                        var mouseOutFunc = '';
                        if (buttonObj[key].mouseOut)
                            mouseOutFunc = buttonObj[key].mouseOut;
                        var checkClass = 'btn-' + modalID + '-' + count;
                        strBtn += '<button class="btn ' + checkClass;
                        strBtn += (buttonObj[key].isPrimary) ? ' btn-primary' : ' btn-default';
                        strBtn += (buttonObj[key].class) ? ' ' + buttonObj[key].class : '';
                        strBtn += '"';
                        strBtn += (buttonObj[key].isSubmit) ? ' type="Submit"' : ' type="button"';
                        strBtn += (buttonObj[key].dismiss) ? ' data-dismiss="modal"' : '';
                        for (var _attr in buttonObj[key]) {
                            if (_attr.match("data-"))
                                strBtn += (buttonObj[key][_attr]) ? _attr + '="' + buttonObj[key][_attr] + '"' : '';
                        }

                        if (buttonObj[key].dismiss) {
                            onClickFunc += ' $.fn.dismissModal($(this));';
                        }
                        if (onClickFunc != '')
                            strBtn += ' onclick="' + onClickFunc + '"';
                        if (mouseOverFunc != '')
                            strBtn += ' onmouseover="' + mouseOverFunc + '"';
                        if (mouseOutFunc != '')
                            strBtn += ' onmouseout="' + mouseOutFunc + '"';
                        strBtn += '>' + buttonObj[key].text + '</button>';
                        if (typeof buttonObj[key].click != "undefined") {
                            $(window).bind('click', function (e) {
                                var eClass = e.target.className;
                                if (eClass.match(checkClass)) {
                                    buttonObj[key].click();
                                }
                            });
                        }
                    }
                }
                var dialogOption = null;
                if (obj.dialogOption) {
                    dialogOption = obj.dialogOption;
                }
                if (typeof (dialogOption) == 'object' && dialogOption != null) {
                    var moreOption;
                    moreOption['backdrop'] = 'static';
                    moreOption['keyboard'] = false;
                    dialogOption.push(moreOption);
                } else {
                    dialogOption = {backdrop: 'static', keyboard: false}
                }

                var onCloseFunc = '';
                if (obj.onCloseFunc) {
                    onCloseFunc = obj.onCloseFunc;
                }
                var btnClose = '<a href="javascript:void(0)" class="btnClose" onclick="' + onCloseFunc + '$.fn.dismissModal($(this));"><i class="fa fa-lg fa-times-circle"></i></a>';
                if (obj.removeBtnClose && obj.removeBtnClose == true) {
                    btnClose = '';
                }
                var modalClass = '';
                if (obj.class) {
                    modalClass += ' ' + obj.class;
                }
                var html = '<div class="modal fade' + modalClass + '" id="' + modalID + '" tabindex="" role="dialog" aria-labelledby="myModalLabel">' +
                        '<div class="modal-dialog ' + modalSize + '"' + modalStyle + '>' +
                        '<div class="modal-content">' +
                        '<div class="modal-header">' +
                        '<h4 class="modal-title" id="modal_title">' + modalTitle + '</h4>' + btnClose +
                        //'<h4 class="modal-title">' + modalTitle + '</h4>' +
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
                $('body').find('#' + modalID).modal(dialogOption);
                /*fix can't scroll when close morepopup*/
                $('#' + modalID).on('shown.bs.modal', function (e) {
                    e.preventDefault();
                    var input = $('.modal-content').children().find('.required');
                    if (input.length <= 1) {
                        $('.right').focus();
                    } else {
                        var first_input = $('.required')[0];
                        $(first_input).focus();

                    }
                    $('#' + modalID).on('keydown', function (e) {

                        if (e.keyCode === 27) {
                            $('.left').trigger('click');
                        }
                        if (!obj.hasTextArea) {
                            if (e.keyCode === 13) {
                                $('.right').trigger('click');
                            }
                        }

                    });
                    if (typeof stopReloader === 'function') {
                        stopReloader();
                    }
                    if (typeof obj.shown == "function")
                        obj.shown(e);
                }
                );
                $('#' + modalID).on('hide.bs.modal', function (e) {
                    if (typeof startReloader === 'function') {
                        startReloader();
                    }
                    // $("body").removeClass("modal-open-alt");
                    var _form = $(this).find('form').getFormAttributes();
                    if (typeof obj.close == "function")
                        obj.close(_form);
                    if (typeof obj.success == "function")
                        obj.success(_form);
                });
                $('body').scrollTop(0);
            }
        }
    },
    hidePopup: function (e) {
        e.next('div.modal-backdrop').css('display', 'none');
        e.next('div.modal-backdrop').empty();
        e.next('div.modal-backdrop').remove();
        e.modal('hide');
        e.empty();
        e.remove();
    },
    showMorePopup: function (obj) {
        if (typeof (obj) === 'object') {
            var modalID = 'modal' + $.fn.randomNum();
            if (0 < $('#' + modalID).length) {
                $('#' + modalID).empty();
                $('#' + modalID).remove();
            }

            var modalTitle = '', modalContent = '';
            var modalSize = '';
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
            var modalStyle = '', modalSize = '';
            if (obj.width)
                modalStyle = ' style="width:' + obj.width + '"';
            else if (obj.size && obj.size == 'big')
                modalSize = 'modal-lg';
            else if (obj.size && obj.size == 'small')
                modalSize = 'modal-sm';

            var strBtn = '';
            if (obj.buttons) {
                var buttonObj = obj.buttons;
                var count = 0;
                for (var key in buttonObj) {
                    if (buttonObj[key].text) {
                        count++;
                        var onClickFunc = '';
                        if (buttonObj[key].func)
                            onClickFunc += buttonObj[key].func;
                        var checkClass = 'btn-' + modalID + '-' + count;
                        strBtn += '<button class="btn ' + checkClass;
                        strBtn += (buttonObj[key].isPrimary) ? ' btn-primary' : ' btn-default';
                        strBtn += (buttonObj[key].class) ? ' ' + buttonObj[key].class : '';
                        strBtn += '"';
                        strBtn += (buttonObj[key].isSubmit) ? ' type="Submit"' : ' type="button"';
                        strBtn += (buttonObj[key].dismiss) ? 'data-dismiss="modal"' : '';
                        if (buttonObj[key].dismiss) {
                            onClickFunc += ' $.fn.dismissModal($(this));';
                        }
                        strBtn += ' onclick="' + onClickFunc + '"';
                        strBtn += '>' + buttonObj[key].text + '</button>';
                        if (typeof buttonObj[key].click != "undefined") {
                            $(window).bind('click', function (e) {
                                var eClass = e.target.className;
                                if (eClass.match(checkClass)) {
                                    buttonObj[key].click();
                                }
                            });
                        }

                    }
                }
            }
            var dialogOption = null;
            if (obj.dialogOption) {
                dialogOption = obj.dialogOption;
            }
            if (typeof (dialogOption) == 'object' && dialogOption != null) {
                var moreOption;
                moreOption['backdrop'] = false;
                moreOption['keyboard'] = false;
                dialogOption.push(moreOption);
            } else {
                dialogOption = {backdrop: false, keyboard: false}
            }
            var onCloseFunc = '';
            if (obj.onCloseFunc) {
                onCloseFunc = obj.onCloseFunc;
            }
            var btnClose = '<a href="javascript:void(0)" class="btnClose" onclick="' + onCloseFunc + '$.fn.dismissModal($(this));"><i class="fa fa-lg fa-times-circle"></i></a>';
            if (obj.removeBtnClose && obj.removeBtnClose == true) {
                btnClose = '';
            }
            var modalClass = '';
            if (obj.class) {
                modalClass = ' ' + obj.class;
            }
            var html = '<div class="modal fade' + modalClass + '" style="z-index:1060" id="' + modalID + '" tabindex="" role="dialog" aria-labelledby="myModalLabel">' +
                    '<div class="modal-dialog ' + modalSize + '"' + modalStyle + '>' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<h4 class="modal-title">' + modalTitle + '</h4>' + btnClose +
                    '</div>' +
                    '<div class="modal-body">' +
                    modalContent +
                    '</div>' +
                    '<div class="modal-footer" id="' + modalID + 'Footer">' +
                    strBtn +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-backdrop fade in" style="z-index:1052"></div>';

            $('body').append(html);
            $('#' + modalID).modal(dialogOption);
            /////*fix can't scroll when close morepopup*/
            $('#' + modalID).on('shown.bs.modal', function (e) {
                $("body").addClass("modal-open-alt");
                if (typeof obj.shown == "function")
                    obj.shown();
            });

            $('#' + modalID).on('hide.bs.modal', function (e) {
                var _form = $(this).find('form').getFormAttributes();
                if (typeof obj.close == "function")
                    obj.close(_form);
                if (typeof obj.success == "function")
                    obj.success(_form);
            });
        }
    },
    toggleBox: function (applyTo) {
        function togle(e) {
            if (e.hasClass('show')) {
                e.find('header a.btnToggle>i.fa-chevron-circle-down').addClass('fa-chevron-circle-up');
                e.find('header a.btnToggle>i.fa-chevron-circle-up').removeClass('fa-chevron-circle-down');
            } else {
                e.find('header a.btnToggle>i.fa-chevron-circle-up').addClass('fa-chevron-circle-down');
                e.find('header a.btnToggle>i.fa-chevron-circle-down').removeClass('fa-chevron-circle-up');
            }
            e.find('header a.btnToggle').click(function () {
                e.toggleClass('show');
                if (e.hasClass('show')) {
                    e.find('header a.btnToggle>i.fa-chevron-circle-down').addClass('fa-chevron-circle-up');
                    e.find('header a.btnToggle>i.fa-chevron-circle-up').removeClass('fa-chevron-circle-down');
                } else {
                    e.find('header a.btnToggle>i.fa-chevron-circle-up').addClass('fa-chevron-circle-down');
                    e.find('header a.btnToggle>i.fa-chevron-circle-down').removeClass('fa-chevron-circle-up');
                }
            });
        }

        if (applyTo) {
            applyTo.find('.toggleBox').each(function () {
                togle($(this));
            });
        } else {
            $('.toggleBox').each(function () {
                togle($(this));
            });
        }
    },
    notifError: function (obj) {
        if (typeof (obj) === 'object') {
            obj.type = 'error';
            if (typeof obj.title === 'undefined') {
                obj.title = 'Oops';
            }
            $.fn.showNotification(obj);
        }
    },
    notifSuccess: function (obj) {
        if (typeof (obj) === 'object') {
            obj.type = 'success';
            if (typeof obj.title === 'undefined') {
                obj.title = 'Success';
            }
            $.fn.showNotification(obj);
        }
    },
    notifWarning: function (obj) {
        if (typeof (obj) === 'object') {
            obj.type = 'warning';
            $.fn.showNotification(obj);
        }
    },
    showNotification: function (obj) {
        var iconClassName = 'icon-volume-up';
        switch (obj.type) {
            case 'error':
                iconClassName = 'fa-times-circle-o';
                break;
            case 'success':
                iconClassName = 'fa-check';
                break;
            case 'warning':
                iconClassName = 'fa-warning';
                break;
        }
        var content = '';
        if (typeof obj.content === 'object') {
            // content = '<ul style="list-style-type: none; ">';
            for (var i = 0; i < obj.content.length; i++) {
                content += '<span>' + obj.content[i] + '</span><br />';
            }
            // content += '</ul>';
        } else {
            content = obj.content;
        }
        var _msg = '<div class="notifWrap displayFlex"><div class="notifIcon"><i class="fa fa-lg '
                + iconClassName + '"></i></div><div class="flexMax notifContent">' +
//                '<h2>' + obj.title + '</h2>' +
                content +
                '</div><div class="clr"></div></div>';

        notif({
            type: obj.type,
            msg: _msg,
            position: (enums.notification.position) ? enums.notification.position : "right",
            width: (enums.notification.width) ? enums.notification.width : 250,
            multiline: true,
            time: obj.timeout || enums.notification.time || 5000
        });
        if (typeof obj.onDismiss === 'function') {
            setTimeout(obj.onDismiss, obj.timeout || enums.notification.time || 5000);
        }
    },
    setDataGrid: function (obj, options) {
        obj = obj || {};
        options = options || {};
        if (options.dataSource) {
            return new kendo.data.DataSource({
                data: options.dataSource,
                pageSize: options.pageSize || 10,
                schema: {data: "data", total: "total", model: obj.model},
                sort: options.sort || {}
            });
        }
        var sourceOption = {
            batch: true,
            serverPaging: (typeof options.serverPaging != 'undefined') ? options.serverPaging : enums.kendo.serverPaging,
            serverSorting: (typeof options.serverSorting != 'undefined') ? options.serverSorting : enums.kendo.serverSorting,
            serverFiltering: (typeof options.serverFiltering != 'undefined') ? options.serverFiltering : enums.kendo.serverFiltering,
            pageSize: (typeof options.pageSize != 'undefined') ? options.pageSize : enums.kendo.pageable.pageSizes[0],
            sort: options.sort || {},
            schema: {data: "data", total: "total", model: obj.model},
            change: function (e) {
                if (typeof options.change != 'undefined' && typeof options.change == 'function') {
                    options.change(e);
                }
            },
            requestStart: function (e) {
                if (!options.hideLoading) {
//                    kendo.ui.progress($('body'), true);
                    $.fn.showLoading(obj.grid);
                }

                if (typeof options.requestStart != 'undefined' && typeof options.requestStart == 'function') {
                    options.requestStart(e, obj);
                }
            },
            requestEnd: function (e) {
                if (!options.hideLoading) {
//                    kendo.ui.progress($('body'), false);
                    $.fn.hideLoading(obj.grid);
                }
                if (typeof options.requestEnd != 'undefined' && typeof options.requestEnd == 'function') {
                    options.requestEnd(e, obj);
                }
            }
        };
        sourceOption.transport = {
            read: function (return_data) {
                var data;
                if (typeof obj.data != 'undefined') {
                    data = obj.data;
                } else {
                    data = $.extend({}, return_data.data, obj.readData);
                }

                $.ajax({
                    url: obj.readURL, type: "get", dataType: "json", data: data,
                    success: function (result) {
                        return_data.success(result);
                        if (result.total > 0) {
                            obj.grid.find('.k-scrollbar.k-scrollbar-vertical').children().css('height', (result.total * 50) + 'px');
                        }
                    },
                    error: function (error, text, xhr) {
                        var grid = obj.grid.data('kendoGrid');
                        var msg = error.responseText || 'Error';
                        // grid.table.find('tbody').append('<tr class="disabled-drag"><td colspan="'+grid.columns.length+'">'+msg+'</td></tr>');
                        return_data.error();
                    }
                });
            },
            create: function (return_data) {
                $.ajax({
                    url: obj.createURL, type: "post", dataType: "json",
                    data: {models: return_data.data.models[0], data: obj.createData},
                    success: function (result) {
                        return_data.success(result);
                        dataSource.query();
                    }
                });
            },
            update: function (return_data) {
                $.ajax({
                    url: obj.updateURL, type: "post",
                    data: {models: return_data.data.models[0], data: obj.updateData},
                    success: function (result) {
                        return_data.success(result);
                        dataSource.query();
                        $.fn.checkResult(result);
                    }
                });
            },
            destroy: function (return_data) {
                $.ajax({
                    url: obj.destroyURL, type: "post", dataType: "json",
                    data: {models: return_data.data.models[0], data: obj.destroyData},
                    success: function (result) {
                        return_data.success(result);
                        dataSource.query();
                    }
                });
            }
        };
        var dataSource = new kendo.data.DataSource(sourceOption);
        return dataSource;
    },
    setKendoGrid: function (applyTo, columns, url, options) {
        if (typeof options != 'object')
            options = new Object();
        var _requestData = (typeof options.requestData != "undefined") ? options.requestData : {};
        var _dataSource = $.fn.setDataGrid($.extend({readURL: url, grid: applyTo}, _requestData), options);

        var _options = {
            dataSource: _dataSource,
            toolbar: (typeof options.toolbar != 'undefined') ? options.toolbar : '',
            editable: (typeof options.editable != 'undefined') ? options.editable : '',
            scrollable: (typeof options.scrollable != 'undefined') ? options.scrollable : enums.kendo.scrollable,
            navigatable: (typeof options.navigatable != 'undefined') ? options.navigatable : enums.kendo.navigatable,
            sortable: (typeof options.sortable != 'undefined') ? options.sortable : enums.kendo.sortable,
            pageable: (typeof options.pageable != 'undefined') ? options.pageable : enums.kendo.pageable,
            autoBind: (typeof options.autoBind != 'undefined') ? options.autoBind : enums.kendo.autoBind,
            resizable: (typeof options.resizable != 'undefined') ? options.resizable : enums.kendo.resizable,
            reorderable: (typeof options.reorderable != 'undefined') ? options.reorderable : enums.kendo.reorderable,
            filterable: (typeof options.filterable != 'undefined') ? options.filterable : enums.kendo.filterable,
            columnReorder: function (e) {
                if (typeof options.columnReorder != 'undefined' && typeof options.columnReorder == 'function') {
                    options.columnReorder(e);
                }
            },
            filterMenuInit : options.filterMenuInit,
            columnResize: (typeof options.columnResize != 'undefined') ? options.columnResize : '',
            selectable: (typeof options.selectable != 'undefined') ? options.selectable : false,
            columns: columns,
            navigate: function (e) {
                if (typeof options.onNavigate != 'undefined' && typeof options.onNavigate == 'function') {
                    options.onNavigate(e, this);
                }
                return e;
            },
            change: function (e) {
                if (typeof options.onChange != 'undefined' && typeof options.onChange == 'function') {
                    options.onChange(e, this);
                }
                return e;
            },
            edit: function (e) {
                if (typeof options.onEdit != 'undefined') {
                    options.onEdit(e, this);
                }
                return e;
            },
            dataBound: function (e) {
                if (typeof this.content != 'undefined') {
                    this.content.find('table tr td').each(function () {
                        var _this = $(this);
                        var _hasTextOnly = _this.children().length == 0;

                        if (_hasTextOnly) {
                            $(this).attr('title', _this.text());
                        } else {

                        }
                    });
                }
                if (typeof options.onDataBound != 'undefined') {
                    var pagerWrap = this.element.find('.k-pager-wrap');
                    var customPagerInfo = pagerWrap.find('.k-customer-pager-info');

                    if (customPagerInfo.length == 0) {
                        customPagerInfo = $('<div class="k-customer-pager-info" style="position: relative;float: right"></div>').appendTo(pagerWrap);
                    }

                    options.onDataBound(this.dataSource, {
                        pagerInfo: customPagerInfo,
                        gridColumns: this.columns,
                    });
                }
                return e;
            },
            dataBinding: function (e) {
                if (typeof (options.onDataBinding) === 'function') {
                    options.onDataBinding(e);
                }
                return e;
            }
        };

        if (typeof options.detailTemplate != 'undefined') {
            _options.detailTemplate = options.detailTemplate;
        }
        if (typeof options.detailInit != 'undefined') {
            _options.detailInit = function (e) {
                options.detailInit(e)
            };
        }

        if (typeof options.height != 'undefined')
            _options.height = options.height;

        applyTo.kendoGrid(_options);

        if (typeof options.draggable != "undefined" && !$.isEmptyObject(options.draggable)) {
            var _dragable = options.draggable;
            var _dropTarget = _dragable.dropTarget;
            var _currentRowBackground = '';
            var _currentRow;
            applyTo.data("kendoGrid").table.kendoDraggable({
                filter: "tbody > tr",
                group: typeof _dropTarget != "undefined" ? "customGroup" : "gridGroup",
                dragstart: function (e) {
                    if (typeof _dropTarget == "undefined") {
                        $("tr:not(:first):not(.unactive)").hover(
                                function () {
                                    //hover in drag start
                                    //$(this).css("background", 'yellow');
                                },
                                function () {
                                    //hover out drag start
                                    //if(_currentRowBackground == ''){
                                    //    _currentRowBackground = $(this).css('background');
                                    //    _currentRow = $(this);
                                    //}
                                    $(this).removeClass('top_line bottom_line').removeAttr('data-pos');
                                }
                        ).mousemove(function (e) {
                            var pos = $(this).getMousePosition(e);
                            var dropItem = $(this).find('td input[type="hidden"].gridData');

                            //if (pos.top < pos.bottom) {
                            //    dropItem.attr('data-pos', 'top');
                            //    $(this).addClass('top_line').removeClass('bottom_line');
                            //}
                            //else {
                            //    dropItem.attr('data-pos', 'bottom');
                            //    $(this).addClass('bottom_line').removeClass('top_line');
                            //}
                            //only set pos is bottom of row when moving job to the end of queue, all another case will count as move to top of row
                            if (pos.bottom > 5) {
                                dropItem.attr('data-pos', 'top');
                                $(this).addClass('top_line').removeClass('bottom_line');
                            } else {
                                dropItem.attr('data-pos', 'bottom');
                                $(this).addClass('bottom_line').removeClass('top_line');
                            }
                        });
                    }

                    $('body').css('cursor', 'move');
                },
                dragend: function () {
                    if (typeof _dropTarget == "undefined") {
                        $("tr:not(:first):not(.unactive)").hover(
                                function () {
                                    //hover in drag end
                                    //$(this).css("background", '');
                                    //if(typeof _currentRow != 'undefined'){
                                    //    _currentRow.css("background", _currentRowBackground);
                                    //}
                                },
                                function () {
                                    //hover out drag end
                                    //$(this).css("background", _currentRowBackground);
                                }
                        ).unbind('mousemove');
                    }

                    $('body').css('cursor', 'default');
                },
                cursorOffset: {top: 10, left: 10},
                drag: function () {
                    //if(_currentRowBackground != '')
                    //     _currentRow.css('background', _currentRowBackground);
                },
                hint: function (e) {
                    var _e = e.clone();
                    //e.css('background', _currentRowBackground);
//                    _e.find('td.k-hierarchy-cell,td.not_hint').remove();
                    return $('<div class="k-widget k-grid"><table><tbody><tr>' + _e.html() + '</tr></tbody></table></div>');
                }
            });

            var _dropFunction = function (dragData, dropData) {

                if (typeof dragData != "undefined" && typeof dropData != "undefined") {
                    var _dragableData = {dragData: dragData, dropData: dropData};
                    if (typeof _dragable.dropConfirm != "undefined") {
                        $.fn.confirmBox(_dragable.dropConfirm, function () {
                            if (typeof _dragable.dropFunction == "function")
                                _dragable.dropFunction(_dragableData);
                        });
                    } else {
                        if (typeof _dragable.dropFunction == "function")
                            _dragable.dropFunction(_dragableData);
                    }
                }
            };
            if (typeof _dropTarget == "undefined") {
                applyTo.kendoDropTarget({
                    group: "gridGroup",
                    dragenter: function (e) {
                    },
                    dragleave: function (e) {
                    },
                    drop: function (e) {
                        //e.dropTarget.removeClass("scale-value-hover");
                        var dragItem = e.draggable.currentTarget.find('td input[type="hidden"].gridData');
                        var dragData = dragItem.data();
                        var dropItem = $(e.target).parents('tr').find('input[type="hidden"].gridData');
                        var dropData = dropItem.data();
                        _dropFunction(dragData, dropData);
                    }
                });
            } else if (typeof _dragable.dropTarget != "undefined") {
                $(_dragable.dropTarget).kendoDropTarget({
                    group: "customGroup",
                    dragenter: function (e) {
                    },
                    dragleave: function (e) {
                    },
                    drop: function (e) {
                        //e.dropTarget.removeClass("scale-value-hover");
                        var dragItem = e.draggable.currentTarget.find('td input[type="hidden"].gridData');
                        var dragData = dragItem.data();
                        var dropItem = e.dropTarget;
                        var dropData = dropItem.data();

                        _dropFunction(dragData, dropData);
                    }
                });
            }

        }

    },
    queryKendoGrid: function (obj) {
        var _this = $(this.selector || '#' + this[0].id);
        var _kendo = '';
        if (this.length > 0) {
            if (_this.attr('data-role') == 'grid') {
                _kendo = _this.data("kendoGrid")
            } else {
                if (_this.hasClass('old-people')) {
                    _kendo = _this.children().data("kendoGrid");
                }
            }
            if (_kendo) {
                if (typeof obj === 'undefined')
                    _kendo.dataSource.query();
                else
                    _kendo.dataSource.query(obj);
            }
        }

        return null;
    },
    selectedRowKendoGrid: function () {
        var _this = $(this.selector || '#' + this[0].id);
        var _kendo = '';
        if (this.length > 0) {
            if (_this.attr('data-role') == 'grid') {
                _kendo = _this.data("kendoGrid")
            } else {
                if (_this.hasClass('old-people')) {
                    _kendo = _this.children().data("kendoGrid");
                }
            }

            if (_kendo) {
                return _kendo.select();
            }
        }
        return null;
    },
    confirmBox: function (msg, func, obj) {
        var _obj = typeof obj != "undefined" ? obj : {};
        var click_no;
        if (typeof _obj.func_no !== 'undefined') {
            click_no = _obj.func_no;
        }

        $.fn.confirmPopup({
            title: typeof _obj.title != "undefined" ? _obj.title : "Warning",
            size: "small", content: msg,
            width: typeof _obj.width != 'undefined' ? _obj.width : '',
            buttons: typeof _obj.buttons != 'undefined' ? _obj.buttons : {
                c: {
                    text: 'No', class: 'left', dismiss: 1, func_no: click_no, click: function () {
                        if (typeof _obj.click_no_func == 'function') {
                            _obj.click_no_func();
                        }
                    }
                },
                o: {
                    text: 'Yes', dismiss: 1, class: 'right diff', click: function () {
                        func();
                    }
                }
            },
            close: function () {
                if (typeof _obj.close == "function")
                    _obj.close();
            },
            success: function () {
                if (typeof _obj.success == "function")
                    _obj.success();
            }
        });
    },
    confirmPopup: function (obj) {
        if (typeof (obj) === 'object') {
            $('#siteModal>div.modal-dialog').attr('style', '');

            if (obj.title)
                $('#siteModalLabel').html(obj.title);
            if (obj.content)
                $('#siteModalBody').html(obj.content);
            if (obj.width) {
                $('#siteModal>div.modal-dialog').css('width', obj.width + 'px');
                $('#siteModal>div.modal-dialog').attr('class', 'modal-dialog');
            } else if (obj.size && obj.size == 'big')
                $('#siteModal>div.modal-dialog').attr('class', 'modal-dialog modal-lg');
            else if (obj.size && obj.size == 'small')
                $('#siteModal>div.modal-dialog').attr('class', 'modal-dialog modal-sm');
            else
                $('#siteModal>div.modal-dialog').attr('class', 'modal-dialog');

            if (obj.buttons) {
                var buttonObj = obj.buttons;
                $('#siteModalFooter').html('');
                for (var key in buttonObj) {
                    var strBtn = '';
                    if (buttonObj[key].text) {
                        strBtn += '<button class="btn';
                        strBtn += (buttonObj[key].isPrimary) ? ' btn-primary' : ' btn-default';
                        strBtn += (buttonObj[key].class) ? ' ' + buttonObj[key].class : '';
                        strBtn += '"';
                        strBtn += (buttonObj[key].isSubmit) ? ' type="submit" ' : ' type="button"';
                        strBtn += (buttonObj[key].dismiss) ? ' data-dismiss="modal"' : '';

                        if (buttonObj[key].func_no) {
                            strBtn += (buttonObj[key].func_no) ? ' onclick="' + buttonObj[key].func_no + '"' : '';
                        }
                        // strBtn += (buttonObj[key].func) ? ' onclick="' + buttonObj[key].func + '"' : '';
                        strBtn += 'id="footerButton_' + key + '"';
                        strBtn += '>' + buttonObj[key].text + '</button>';
                        $('#siteModalFooter').append(strBtn);
                        if (!obj.custom) {
                            if (typeof buttonObj[key].click != "undefined" && !buttonObj[key].func_no) {
                                $('#siteModalFooter #footerButton_' + key).click(buttonObj[key].click);
                            }
                        } else {
                            if (typeof buttonObj[key].click_yes != "undefined" && !buttonObj[key].click_no) {
                                $('#siteModalFooter #footerButton_' + key).click(buttonObj[key].click_yes);
                            }
                            if (typeof buttonObj[key].click_no != "undefined" && !buttonObj[key].click_yes) {
                                $('#siteModalFooter #footerButton_' + key).click(buttonObj[key].click_no);
                            }
                        }
                    }
                }
            }
            var dialogOption = null;
            if (obj.dialogOption)
                dialogOption = obj.dialogOption;
            if (obj.disableCloseButton === true) {
                $('#siteModal').find('.close').each(function () {
                    $(this).css('display', 'none');
                });
            }
            $('#siteModal').modal(dialogOption);
            $('#siteModal').on('shown.bs.modal', function (e) {

                var input = $('.modal-content').children().find('.required');
                $('#siteModal').on('keydown', function (e) {

                    e.preventDefault();
                    if (input.length <= 1) {
                        $('.right').focus();
                    } else {
                        var first_input = $('.required')[0];
                        $(first_input).focus();
                    }
                    if (e.keyCode === 27) {
                        $('.left').trigger('click');
                    }
                    if (e.keyCode === 13 || e.keyCode === 9) {

                        $('.right').trigger('click');
                    }
                });
                if (typeof stopReloader === 'function') {
                    stopReloader();
                }
                if (typeof obj.shown == "function")
                    obj.shown(e);
            });
            $('#siteModal').on('hide.bs.modal', function (e) {
                /////*fix can't scroll when close morepopup*/
                if ($('.modal').length > 1) {
                    $("body").addClass("modal-open-alt");
                }
                if (typeof obj.close == "function")
                    obj.close();
                if (typeof obj.success == "function")
                    obj.success();
            });
        }
        return false;
    },
    disableAllControls: function (container_id) {
        if (typeof container_id != 'undefined') {
            if ($.trim(container_id) != '') {
                $('#' + container_id).find('input, button, select, textarea').prop('disabled', true);
            }
        }

        return false;
    },
    removeComma: function (nStr) {
        if (!nStr)
            return '';

        return parseFloat(nStr.replace(/,/g, ''));
    }
});

function createUrl($uri) {
    var _uri = $uri || '';
    return (baseUrl || $('base').attr('href')).replace(/\/$/, '')
            + '/' + _uri.replace(/^\//, '').replace(/\/$/, '');
}

function createHref($uri) {
    var _uri = $uri || '';
    return (baseUrl || $('base').attr('href')).replace(/\/?index.php\/?$/,'').replace(/\/$/, '')
            + '/' + _uri.replace(/^\//, '').replace(/\/$/, '');
}