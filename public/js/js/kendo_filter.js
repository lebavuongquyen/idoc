/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global kendo */

var applyNewFilter = function(masterFilter, newFilter) {
    var masterFilter = masterFilter || {logic: "and", filters: []};
    masterFilter.filters.push(newFilter);
    return masterFilter;
};

var removeFilterForField = function(dataSource, field) {

    var masterFilter = dataSource.filter();

    if(! masterFilter) {
        return;
    }

    // Get existing filters for the field
    var existingFilters = jQuery.grep(masterFilter.filters, function(item, index) {
        return item.field === field;
    });

    jQuery.each(existingFilters, function(i , item) {
        var index = masterFilter.filters.indexOf(item);
        masterFilter.filters.splice(index, 1);
    });
    return masterFilter;
};

var genSelect = function(data) {
    var _src = data.dataSource || [];
    var _str = '<select style="width:200px" class="filter-select">';
    if($.isArray(_src)) {
        for(var i = 0; i < _src.length; i ++) {
            if($.isPlainObject(_src[i])) {
                var _key = Object.keys(_src[i]);
                _str += '<option value="' + (_src[i][data.valueKey || _key[0]] === '' ? '' : 'filter_option_') 
                    + _src[i][data.valueKey || _key[0]] + '">' + _src[i][data.textKey || _key[0]] + '</option>';
            }
            else {
                _str += '<option value="' + (_src[i] === '' ? '' : 'filter_option_') + _src[i] + '">' 
                    + _src[i] + '</option>';
            }
        }
    }
    else {
        var _key = Object.keys(_src);
        for(var i = 0; i < _key.length; i ++) {
            _str += '<option value="' + (_key[i] === '' ? '' : 'filter_option_') + _key[i] + '">' 
                + _src[_key[i]] + '</option>';
        }
    }
    _str += '</select>';
    return _str;
};

var KendoFilter = function($opt) {
    var _opt = $opt || {};
    _opt.columns = _opt.columns || {};
    var self = this;
    self.init = function(e) {
        var cell = e.sender.element.find('th[data-field="' + e.field + '"]');
        var check = true;
        if(_opt.columns[e.field]) {
            var _conf = _opt.columns[e.field];
            if(typeof (_conf) === 'function') {
                check = _conf(e, cell);
            }
            if(typeof _conf === 'string' && typeof (self[_conf]) === 'function') {
                check = self[_conf](e, cell);
            }
            if(typeof _conf === 'object' && typeof (self[_conf.type]) === 'function') {
                check = self[_conf.type](e, cell, _conf);
            }
        }
        if(check && typeof (_opt.onInit) === 'function') {
            _opt.onInit(e, cell);
        }
    };
    return self;
};

KendoFilter.prototype.numberRange = function(e, cell, config) {
    var _grid = e.sender;
    var _frm = e.container;
    var _field = e.field;
    _frm.off().empty();
    var _data = $.extend(config, {field_name: cell.data('title')});
    var template = kendo.template($("#filterNumberRange").html());
    _frm.html(template(_data));
    _frm.validate({
        rules: {
            min: {
                lte: {object: _frm.find('input[name=max]'), emptyAsZero: false}
            },
            max: {
                gte: {object: _frm.find('input[name=max]'), emptyAsZero: false}
            }
        },
        submitHandler: function(frm) {
            var _frm = $(frm);
            // Remove all filter
            // Final filter
            var _masterFilter = removeFilterForField(_grid.dataSource, _field);
            // Create custom filter
            var _min = _frm.find('input[name=min]');
            if(_min.val()) {
                _masterFilter = applyNewFilter(_masterFilter, {
                    field: _field,
                    operator: 'gte',
                    value: _min.val()
                });
            }
            var _max = _frm.find('input[name=max]');
            if(_max.val()) {
                _masterFilter = applyNewFilter(_masterFilter, {
                    field: _field,
                    operator: 'lte',
                    value: _max.val()
                });
            }
            if(! _min.val() && ! _max.val()) {
                _grid.dataSource.filter(removeFilterForField(_grid.dataSource, _field));
            }
            else {
                _grid.dataSource.filter(_masterFilter);
            }
            _frm.data('kendoPopup').close();
        }
    });
    _frm.find('input').on('keypress', function(e) {
        if(e.keyCode === 13) {
            _frm.find('button[type=submit]').trigger('click');
        }
    });
    _frm.find('button[type=reset]').on('click', function() {
        _grid.dataSource.filter(removeFilterForField(_grid.dataSource, _field));
        _frm.data('kendoPopup').close();
    });
};

KendoFilter.prototype.dateRange = function(e, cell, config) {
    var _grid = e.sender;
    var _frm = e.container;
    var _field = e.field;
    var _cf = config || {};
    _frm.off().empty();
    var _data = $.extend(config, {field_name: cell.data('title')});
    var template = kendo.template($("#filterDateRange").html());
    _frm.html(template(_data));
    var _optStart = {
        value: _cf.min,
        min: _cf.min,
        change: function(e) {
            var startDate = start.value(),
                endDate = end.value();
            if(startDate) {
                startDate = new Date(startDate);
                startDate.setDate(startDate.getDate());
                end.min(startDate);
            }
            else {
                _optEnd.value = new Date(endDate);
                end = _frm.find("input[name=max]").kendoDatePicker(_optEnd).data("kendoDatePicker");
            }
        },
        format: _cf.format || 'MM/dd/yyyy',
        parseFormats: [_cf.format || "MM/dd/yyyy"]
    };

    var _optEnd = {
        value: _cf.max,
        max: _cf.max,
        change: function() {
            var endDate = end.value(),
                startDate = start.value();

            if(endDate) {
                endDate = new Date(endDate);
                endDate.setDate(endDate.getDate());
                start.max(endDate);
            }
            else {
                _optStart.value = new Date(startDate);
                start = _frm.find("input[name=min]").kendoDatePicker(_optStart).data("kendoDatePicker");
            }
        },
        format: _cf.format || 'MM/dd/yyyy',
        parseFormats: [_cf.format || 'MM/dd/yyyy']
    };

    var start = _frm.find("input[name=min]").kendoDatePicker(_optStart).data("kendoDatePicker");

    var end = _frm.find("input[name=max]").kendoDatePicker(_optEnd).data("kendoDatePicker");
    _frm.validate({
        submitHandler: function(frm) {
            var _frm = $(frm);
            // Final filter
            var _masterFilter = removeFilterForField(_grid.dataSource, _field);
            // Create custom filter
            var _min = _frm.find('input[name=min]');
            if(_min.val()) {
                _masterFilter = applyNewFilter(_masterFilter, {
                    field: _field,
                    operator: 'gte',
                    value: _min.val()
                });
            }
            var _max = _frm.find('input[name=max]');
            if(_max.val()) {
                _masterFilter = applyNewFilter(_masterFilter, {
                    field: _field,
                    operator: 'lte',
                    value: _max.val()
                });
            }
            if(! _min.val() && ! _max.val()) {
                _grid.dataSource.filter(removeFilterForField(_grid.dataSource, _field));
            }
            else {
                _grid.dataSource.filter(_masterFilter);
            }
            _frm.data('kendoPopup').close();
        }
    });
    _frm.find('input').on('keypress', function(e) {
        if(e.keyCode === 13) {
            _frm.find('button[type=submit]').trigger('click');
        }
        if(! this.value) {
            $(this).trigger('change');
        }
    });
    _frm.find('button[type=reset]').on('click', function() {
        _grid.dataSource.filter(removeFilterForField(_grid.dataSource, _field));
        _frm.data('kendoPopup').close();
    });
};

KendoFilter.prototype.select = function(e, cell, config) {
    var _grid = e.sender;
    var _frm = e.container;
    var _field = e.field;
    var _cf = config || {};
    _frm.off().empty();
    var _data = $.extend(config, {field_name: cell.data('title')});
    var template = kendo.template($("#filterSelect").html());
    _frm.html(template(_data));
    if(_cf.multiple) {
        _frm.find('select').attr('multiple', true);
    }
    else {
        if(! _frm.find('select').find('option[value=""]').length) {
            _frm.find('select').append('<option value="">' + (_cf.noneSelectedText || '--Select--') + '</option>');
        }
    }
    _frm.find('select').val(null).selectpicker({
        noneSelectedText: _cf.noneSelectedText || '--Select--',
        liveSearch : _cf.liveSearch,
        dropdownAlignRight : typeof(_cf.dropdownAlignRight) !== 'undefined' ? _cf.dropdownAlignRight : 'auto',
        dropupAuto : typeof(_cf.dropupAuto) !== 'undefined' ? _cf.dropupAuto : true,
        windowPadding : '20px'
    });
    _frm.validate({
        submitHandler: function(frm) {
            var _frm = $(frm);
            // Remove all filter
            var _masterFilter = removeFilterForField(_grid.dataSource, _field);
            //Value
            var _value = _frm.find('select').val();
            if(_value) {
                // Final filter
                var _finalValue;
                if($.isArray(_value)) {
                    _finalValue = [];
                    _value.forEach(function(item) {
                        _finalValue.push(item.replace('filter_option_', ''));
                    });
                }
                else {
                    _finalValue = _value.replace('filter_option_', '');
                }
                var _masterFilter = applyNewFilter(_masterFilter, {
                    field: _field,
                    operator: _cf.multiple ? 'in' : 'eq',
                    value: _finalValue
                });
            }
            _grid.dataSource.filter(_masterFilter);
            _frm.data('kendoPopup').close();
        }
    });
    _frm.find('button[type=reset]').on('click', function() {
        _frm.find('select').val(null).selectpicker('refresh');
        _grid.dataSource.filter(removeFilterForField(_grid.dataSource, _field));
        _frm.data('kendoPopup').close();
    });
};

KendoFilter.prototype.multiSelect = function(e, cell, config) {
    this.select(e, cell, $.extend(config, {multiple: true}));
};