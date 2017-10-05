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

deleteItem = function(e) {
    alert('delete item');
};

var loadForm = function($id) {
    var content = formContent($id);
    Widget.dialog({
        title: 'Add ' + module,
        content: content,
        width: '300px',
        buttons: [
            {
                text: 'Save', class: 'right',
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
    if (!$id) {
        $name = 'new';
    }
    else {
        $name = $id.replace('::' , '__');
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

var displayValueObject = function(value, ele) {
    var container = ele.find('.value-object-container');
    container.html('');
    var temp = $('#object_key').clone().attr('id', null).show();
    if($.isEmptyObject(value)) {
        container.append(temp);
        return;
    }
    var index = 0;
    for(var i in value) {
        temp.find('input:first').attr('name', 'keys[' + index + ']').val(i);
        temp.find('input:last').attr('name', 'values[' + index + ']').val(value[i]);
        container.append(temp.clone());
    }
    ele.off('change', 'input.input').on('change', 'input.input', changeValue);
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
    else {
        temp.key = value;
    }
    return temp;
};

var value2default = function(value) {
    if($.isArray(value)) {
        return value.join(', ');
    }
    var temp = [];
    for(var i in value) {
        temp.push(i + ':' + value[i]);
    }
    return temp.join(';');
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
            console.log(getDefaultValue(ele));
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
    if(!validateFrom(ele)) {
        return;
    }
    Util.ajax({
        url: url('setting/save'),
        method: 'post',
        data: model,
        dataType: 'json',
        showMessage : true,
        success: function(result) {
            if(result.status === 200) {
                var item = grid.itemById(model.name);
                if (item) {
                    grid.updateById(model.name , model);
                }
                else {
                    grid.addRow(model);
                }
                model = {};
            }
            else {
                Widget.notify({
                    title : result.status === 200 ? 'Success':'Error',
                    text : result.message || (result.status === 200 ? 'Action success':'Something when wrong'),
                    type : result.status === 200 ? 'success':'error'
                });
            }
        }
    });
};

var validateFrom = function(ele){
    if (!model.name) {
        Widget.notify({
            title : 'Error',
            type:'error',
            text : 'Setting Name is required',
        });
        return false;
    }
    if (!model.value || $.isEmptyObject(model.value)) {
        Widget.notify({
            title : 'Error',
            type:'error',
            text : 'Setting value is required',
        });
        return false;
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
                    return data;
                }
            }
        ],
        onInit: function() {
            console.log($(arguments[0].target).find('tbody tr').length);
        },
        rowId: 'name'
    });
    grid.render();
})();