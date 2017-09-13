/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global dataSource */
var helper = new DataTableHelper();
(function() {
    "use strict";
    $('#datatable').DataTable({
        data: dataSource,
        columns: [
            helper.column.action([
                {icon:'plus' , text : 'Add'}
            ]),
            {title: 'Name', data: 'name'},
            {
                title: 'Value', data: 'value', render: function(data, type, row) {
                    if ($.isArray(data)) {
                        return helper.column.render.joinArray(', ', data);
                    }
                    return null;
                }
            }
        ],
        order: [[ 1, "asc" ]]
    });
})();