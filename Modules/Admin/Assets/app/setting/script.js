/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var grid,grid2;
/* global dataSource */
(function() {
    "use strict";
    grid = new Grid($('#datatable'));
    grid.setOptions({
        data : dataSource,
        columns: [
            grid.helper.column.action([
                grid.helper.button.edit(),
                grid.helper.button.delete()
            ]),
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
        onInit : function(){
            console.log($(arguments[0].target).find('tbody tr').length);
        },
    });
    grid.render();
    grid.addRow({name:'test' , value:'hello'});
})();