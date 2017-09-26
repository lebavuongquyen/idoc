/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global dataSource , Grid */
var grid, grid2;
var module = 'Setting';

addItem = function(e){
    loadForm();
};

editItem = function(e , ele){
    loadForm($(ele).data('value'));
};

deleteItem = function(e){
    alert('delete item');
};

var loadForm = function($id){
    Widget.dialog({
        title: 'Add ' + module,
        content : formContent($id)
    });
};

var formContent  = function($id){
    var ele = $('#frm').clone().show();
    ele.find('input[name=name]').val($id).prop('readonly', $id ? true : false);
    return ele;
};

(function() {
    "use strict";
    grid = new Grid($('#datatable'));
    grid.setOptions({
        data: dataSource,
        columns: [
            grid.helper.column.action([
                grid.helper.button.edit(),
                grid.helper.button.delete()
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
        rowId : 'name'
    });
    grid.render();
    grid.addRow({name: 'test', value: 'hello'});
})();