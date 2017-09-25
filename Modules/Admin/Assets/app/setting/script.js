/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global dataSource */
var grid, grid2;

addItem = function(e){
    alert('add item');
};

editItem = function(e){
    alert('edit item');
};

deleteItem = function(e){
    alert('delete item');
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