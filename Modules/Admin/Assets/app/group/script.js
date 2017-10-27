/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global dataSource , Grid, Widget, Util */
var grid;
var model = {};
var module = 'Group';
var controller = 'group';
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
                url: url(controller + '/destroy'),
                method: 'post',
                data: {id: id},
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

var loadForm = function($id, $view) {
    var _action = $view ? 'view' : ($id ? 'update' : 'create');
    Util.ajax({
        url: url(controller + '/' + _action + ($id ? '/' + $id : '')),
        success: function(result) {
            Widget.dialog({
                title: _action.capitalize() + ' ' + module,
                content: result,
                buttons: [
                    {
                        text: 'Save', float: 'right',
                        click: function(e) {
                            e.data.modal.find('form').submit();
                        }
                    }
                ],
                shown: function(e){
                    e.data.modal.find('form').validate();
                }
            })
        }
    });
};

var saveItem = function($id , e) {
    
};

(function() {
    "use strict";
    grid = new Grid($('#datatable'));
    grid.setOptions({
        processing: true,
        serverSide: true,
        ajax: {
            url: url(controller + '/get'),
            beforeSend: function() {
                var _uri = Util.uri(this.url);
                var _query = Util.query(this.url);
                _query = $.deparam.querystring(_query);
                delete(_query.columns);
                this.url = _uri + '?' + $.param(_query);
            }
        },
        columns: [
            {
                data: 'id',
                title: 'Actions',
                width: '80px',
                className: 'action-column',
                render: function($value) {
                    if($value == 1) {
                        return '';
                    }
                    return grid.helper.column.render.action([
                        grid.helper.button.edit(),
                        grid.helper.button.delete()
                    ], $value);
                }
            },
            {title: 'Name', data: 'name'},
            {title: 'Short Name', data: 'short_name'},
            {
                title: 'Parent',
                data: 'pr',
                render: function($value) {
                    if($value) {
                        return $value.name;
                    }
                    return '';
                }
            },
        ],
        onInit: function() {
            console.log($(arguments[0].target).find('tbody tr').length);
        },
    });
    grid.render();
})();