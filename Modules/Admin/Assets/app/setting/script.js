/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global dataSource , Grid, Widget, Util */
var grid;
var model = {};
var module = 'Setting';

addItem = function(e) {
    loadForm();
};

editItem = function(e, ele) {
    loadForm($(ele).data('value'));
};

deleteItem = function(e, ele) {
    var id = $(ele).data('value');
    Widget.confirm({
        content: 'Do you really want to delete ' + id,
        yes: function() {
            Util.ajax({
                url: url('setting/delete'),
                method: 'post',
                data: {name: id},
                dataType: 'json',
                success: function(result) {
                    if(result.status === 200) {
                        grid.removeById(id);
                    }
                    Notice.ajaxResult(result);
                }
            });
        }
    });
};

var loadForm = function($id) {
    if($id) {
        $id += '';
    }
    var content = formContent($id);
    Util.modal({
        title: 'Add ' + module,
        content: content,
        width: '300px',
        buttons: [
            {
                text: 'Save', float: 'right',
                click: function(e) {
                    changeValue(e);
                    saveValue(content);
                }
            }
        ]
    });
};

var formContent = function($id) {
    var ele = $('#frm').clone().show();
    if(! $id) {
        $name = 'new';
    }
    else {
        $name = $id.replace('::', '__');
    }
    ele.attr('id', 'frm' + $name)
        .find('input[name=name]')
        .val($id).prop('readonly', $id ? true : false)
    model = $id ? $.extend({}, grid.itemById($id)) : {};
    ele.find('.value').hide().find('.input').prop('disabled', true);
    var type = 'default';
    if($.isArray(model.value)) {
        type = 'array';
    }
    else if(typeof model.value === 'object') {
        type = 'object';
    }
    ele.on('click', '.btn-group button:not(.active)', function(e) {
        $(this).parent().children().removeClass('active btn-primary');
        $(this).addClass('active btn-primary');
        showValue(this.value, ele);
        setValue(model.value, this.value, ele);
    })
        .on('change', 'input[name=name]', changeName)
        .on('change', 'input.input', changeValue);
    ele.find('.btn-group button[value=' + type + ']').click();
    return ele;
};

var showValue = function(type, ele) {
    ele.find('.value').hide().find('.input').prop('disabled', true);
    ele.find('.' + type + '-type').addClass('active btn-primary');
    ele.find('.value-' + type).show().find('.input').show().prop('disabled', false);
};

var setValue = function(value, type, ele) {
    switch(type) {
        case 'array':
            var input = ele.find('.value-array input[name=value]');
            input.off('itemAdded').off('itemRemoved');
            input.hide().val(switchValueType(value, type)).tagsinput('destroy');
            input.tagsinput({
                triggerChange: false
            });
            input.on('itemAdded', function(e) {
                changeValue(e);
            })
                .on('itemRemoved', function(e) {
                    changeValue(e);
                });
            break;
        case 'object':
            displayValueObject(switchValueType(value, type), ele);
            break;
        default:
            ele.find('.value-default input').val(switchValueType(value, type));
            break;
    }
};
var count = 0;
var displayValueObject = function(value, ele) {
    var container = ele.find('.value-object-container');
    count ++;
    container.html('');

    var temp = $('#object_key').clone().attr('id', null).show();
    if($.isEmptyObject(value)) {
        container.append(temp.clone());
    }
    else {
        var index = 0;
        var _new;
        for(var i in value) {
            _new = temp.clone();
            _new.find('input:last').prop('disabled', false);
            _new.find('input:first').attr('name', 'keys[' + index + ']').val(i);
            _new.find('input:last').attr('name', 'values[' + index + ']').val(value[i]);
            container.append(_new);
            index ++;
        }
        _new = temp.clone();
        _new.find('input:first').attr('name', 'keys[' + index + ']');
        _new.find('input:last').attr('name', 'values[' + index + ']');
        index ++;
        container.append(_new);
    }

    ele.off('change', 'input.input').on('change', 'input.input', changeValue);
    container.off('keyup').on('keyup', '.form-group:not(.new-row) input.object-keys:last', function(e) {
        $(this).parents('.form-group').removeClass('new-row');
        container.find('.form-group:not(.new-row) input.object-values:last').prop('disabled', $(this).val()
            ? false : true);
    })
        .on('blur', '.form-group:not(.new-row) input:last', function(e) {
            console.log('blur');
            container.find('.new-row').removeClass('new-row');
        })
        .on('keyup', '.form-group:not(.new-row) input:last', function(e) {
            if($(this).val()) {
                if(container.find('.new-row').length === 0) {
                    _new = temp.clone().addClass('new-row');
                    var i = container.find('.form-group').length;
                    _new.find('input:first').attr('name', 'keys[' + i + ']');
                    _new.find('input:last').attr('name', 'values[' + i + ']');
                    container.append(_new);
                }
            }
            else {
                container.find('.new-row').remove();
            }
        })
        .on('blur', '.object-keys', function(e) {
            var name = this.name;
            var value = this.value;
            var ele = $(this);
            var error = false;
            if (!value) {
                return;
            }
            container.find('.object-keys:not([name="' + name + '"])').each(function() {
                if(error) {
                    return;
                }
                if(this.value === value) {
                    error = true;
                }
            });
            if(error) {
                ele.addClass('error');
                Notice.error('This key name is already exist');
                ele.focus();
            }
            else {
                ele.removeClass('error');
            }
        });
};

var switchValueType = function(value, type) {
    var currentType = 'default';
    if($.isArray(value)) {
        currentType = 'array';
    }
    else if(typeof value === 'object') {
        currentType = 'object';
    }
    switch(type) {
        case 'array':
            return currentType === type ? value : value2array(value);
            break;
        case 'object':
            return currentType === type ? value : value2object(value);
            break;

        default:
            return currentType === type ? value : value2default(value);
            break;
    }
};

var value2array = function(value) {
    var temp = [];
    if(typeof value === 'object') {
        for(var i in value) {
            temp.push(value[i]);
        }
    }
    else {
        temp.push(value);
    }
    return temp;
};

var value2object = function(value) {
    var temp = {};
    if(typeof value === 'object') {
        for(var i in value) {
            temp[i] = value[i];
        }
    }
    return temp;
};

var value2default = function(value) {
    if($.isArray(value)) {
        return grid.helper.column.render.joinArray(', ', value);
    }
    if (typeof value === 'object') {
        return grid.helper.column.render.joinObject('; ' , data);
    }
    return value;
};

var changeName = function(e) {
    model.name = this.value;
};

var changeValue = function(e) {
    var ele = $(e.target).parents('.modal');
    var type = ele.find('button.active').val();
    switch(type) {
        case 'array':
            var value = getArrayValue(ele);
            if(value) {
                model.value = value;
            }
            break;
        case 'object':
            model.value = getObjectValue(ele);
            break;
        default:
            model.value = getDefaultValue(ele);
            break;
    }
};

var getArrayValue = function(ele) {
    var tags = ele.find('.value-array input[name=value]').data().tagsinput;
    return tags ? tags.itemsArray : false;
};

var getObjectValue = function(ele) {
    var value = {};
    var keys = ele.find('.value-object-container input.object-keys');
    var values = ele.find('.value-object-container input.object-values');
    keys.each(function(index, ele) {
        if(ele.value) {
            value[ele.value] = values[index].value;
        }
    });
    return value;
};

var getDefaultValue = function(ele) {
    return ele.find('.value-default input[name=value]').val();
};

var saveValue = function(ele) {
    if(! validateFrom(ele)) {
        return;
    }
    Util.ajax({
        url: url('setting/save'),
        method: 'post',
        data: model,
        dataType: 'json',
        showMessage: true,
        success: function(result) {
            if(result.status === 200) {
                var item = grid.itemById(model.name);
                if(item) {
                    grid.updateById(model.name, model);
                }
                else {
                    grid.addRow(model);
                }
                model = {};
                Util.hideModal(ele);
            }
            Notice.ajaxResult(result);
        }
    });
};

var validateFrom = function(ele) {
    if(! model.name) {
        Notice.error('Setting Name is required');
        return false;
    }
    if(! model.value || $.isEmptyObject(model.value)) {
        return false;
        Notice.error('Setting value is required');
    }
    return true;
};


(function() {
    "use strict";
    grid = new Grid($('#datatable'));
    grid.setOptions({
        data: dataSource,
        columns: [
            grid.helper.column.action([
                grid.helper.button.edit(),
                grid.helper.button.delete(),
            ], {data: 'name'}),
            {title: 'Name', data: 'name'},
            {
                title: 'Value', data: 'value', render: function(data, type, row) {
                    if($.isArray(data)) {
                        return grid.helper.column.render.joinArray(', ', data);
                    }
                    if (typeof data === 'object') {
                        return grid.helper.column.render.joinObject('; ' , data);
                    }
                    return data;
                }
            }
        ],
        onInit: function() {
        },
        rowId: 'name'
    });
    grid.render();
})();