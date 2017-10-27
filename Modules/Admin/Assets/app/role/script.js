/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global dataSource , Grid, Widget, Util */
var grid;
var model = {};
var module = 'Role';
var controller = 'role';
addItem = function(e) {
    loadForm();
};
editItem = function(e, ele) {
    window.location = url(controller + '/update/' + ele.data('value'));
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
var loadForm = function() {

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
            {title: 'Group', data: 'group.name'},
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