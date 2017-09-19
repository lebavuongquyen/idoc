/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
var DataTableHelper = function() {
    this.column = new DataTableColumn();
    this.button = new DataTableButton();
    this.api = new DataTableApi();
    return this;
};

DataTableHelper.prototype.model = function($item) {
    return new DataModel($item);
};

var DataTableColumn = function() {
    this.render = new DataTableColumnRender();
    return this;
};

DataTableColumn.prototype.action = function($actions) {
    var self = this;
    return {
        data: null,
        title: 'Actions',
        width: '80px',
        className : 'action-column',
        render: function() {
            return self.render.action($actions);
        }
    };
}

var DataTableColumnRender = function() {
    return this;
};

DataTableColumnRender.prototype.joinArray = function($delimiter, $list) {
    return $list.join($delimiter);
};

DataTableColumnRender.prototype.action = function($actions) {
    var _str = '';
    var button = new DataTableButton();
    for(var i in $actions) {
        _str += button.render($actions[i]);
    }
    return _str;
};

var DataModel = function($item) {
    for(var i in $item) {
        this['_' + i] = $item[i];
        this[i] = function() {
            return this['_' + i];
        };
    }
    return this;
};

var DataTableButton = function() {
    return this;
};

DataTableButton.prototype.add = function($option) {
    var _opt = $option || {};
    return {
        title: _opt.title || 'Add new item',
        text: _opt.text || 'Add',
        icon: _opt.icon || 'plus-circle',
        class: _opt.class || '',
        display: _opt.display || 'icon-only',
        click: _opt.click || '',
        data: _opt.data || null,
    };
};

DataTableButton.prototype.edit = function($option) {
    var _opt = $option || {};
    return {
        title: _opt.title || 'Edit item',
        text: _opt.text || 'Edit',
        icon: _opt.icon || 'pencil-square-o',
        class: _opt.class || '',
        display: _opt.display || 'icon-only',
        click: _opt.click || '',
        data: _opt.data || null,
    };
};

DataTableButton.prototype.delete = function($option) {
    var _opt = $option || {};
    return {
        title: _opt.title || 'Delete item',
        text: _opt.text || 'Delete',
        icon: _opt.icon || 'ban',
        class: _opt.class || '',
        display: _opt.display || 'icon-only',
        click: _opt.click || '',
        data: _opt.data || null,
    };
};

DataTableButton.prototype.render = function($item) {
    var title = $item.title || '';
    var text = $item.text || title;
    var cls = $item.class || '';
    var icon = '';
    var click = $item.click || '';
    if($item.icon) {
        icon = '<i class="fa fa-' + $item.icon + '"></i>';
    }
    var getText = function() {
        switch($item.display) {
            case 'text-only':
                return text;
            case 'icon-only':
                return icon;
            case 'icon-right':
                return text + '&nbsp;' + icon;
            default:
                return icon + '&nbsp;' + text;
        }
    };
    var getData = function() {
        if(typeof $item.data === 'string') {
            return $item.data;
        }
        if(typeof $item.data === 'object') {
            var _str = ' ';
            for(var i in $item.data) {
                _str += 'data-' + i + '="' + $item.data[i] + '" ';
            }
            return _str;
        }
        if(typeof $item.data === 'function') {
            return $item.data();
        }
        return '';
    };

    return '<a class="btn-table btn-link ' + cls
        + '" title="' + title + '" onclick="' + click
        + '" ' + getData() + ' >' + getText() + '</a>';
};

DataTableButton.prototype.common = function() {
    return [
        {
            extend: "pageLength",
            className: "btn-sm"
        },
        {
            extend: "copy",
            className: "btn-sm"
        },
        {
            extend: "excel",
            className: "btn-sm"
        },
        {
            extend: "pdf",
            className: "btn-sm"
        },
        {
            extend: "print",
            className: "btn-sm"
        },
        {
            extend: "colvis",
            className: "btn-sm"
        },
        {
            text: '<i class="fa fa-plus-square-o"></i> Add',
            className: 'btn-sm'

        }
    ];
};

var DataTableApi = function() {
    return this;
};

DataTableApi.prototype.selected = function(api) {
    return api.rows('.selected').data();
};

DataTableApi.prototype.addRow = function(dt , data) {
    return dt.row.add(data).draw(false);
};

var Grid = function($target, $opt) {
    var _opt = $opt || {};
    this.helper = new DataTableHelper();
    this.target = $target;
    this.options = {
        dom: "Bfrtip",
        buttons: this.helper.button.common(),
        responsive: true,
        lengthMenu: [[10, 25, 50, - 1], [10, 25, 50, "All"]],
        columns: [],
        order: [[1, "asc"]],
        paging: true,
        searching: true,
        ordering: false,
        select: {
            style: 'os',
            blurable: false,
            info: true,
            selector : 'td:not(".action-column")'
        },
        autoWidth: true,
        deferRender: _opt.data ? true : false,
        info: true,
        language: {
            decimal: "",
            emptyTable: "No data available in table",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            infoEmpty: "Showing 0 to 0 of 0 entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Show _MENU_ entries",
            loadingRecords: "Loading...",
            processing: "Processing...",
            search: "Search:",
            zeroRecords: "No matching records found",
            paginate: {
                first: "First",
                last: "Last",
                next: "Next",
                previous: "Previous"
            },
            aria: {
                sortAscending: ": activate to sort column ascending",
                sortDescending: ": activate to sort column descending"
            },
        },
        processing: false,
        serverSite: _opt.ajax ? true : false,
        stateSave: true,
        destroy: true,
        createdRow: function(row, data, dataIndex) {},
        colReorder: true,
        rowId: 'id',
//        rowReorder : {
//            selector : 'td:not(".action-column")'
//        }
    };
    this.setOptions($opt);
    return this;
};

Grid.prototype.setOptions = function($opt) {
    var _opt = $opt || {};
    for(var i in _opt) {
        this.options[i] = _opt[i];
    }
    return this.options;
};

Grid.prototype.render = function() {
    if(! this.__validate()) {
        return;
    }
    if(this.fn) {
        this.fn.fnDestroy();
        this.__unbindEvent();
    }
    /**
     * after render the datatable
     * function(e , setting , data){}
     */
    this.target.on('init.dt', this.options.onInit);
    this.dt = this.target.DataTable(this.options);
    this.fn = this.target.dataTable();
    this.api = this.fn.api();
    this.__bindEvent();
    return this;
};

Grid.prototype.__validate = function() {
    if(! this.target) {
        QLog('error', 'No table element set');
        return false;
    }

    if(! (this.target instanceof jQuery)) {
        this.target = $(this.target);

    }
    if(! this.target.length) {
        QLog('error', 'No table element found');
        return false;
    }
    return true;
};
Grid.prototype.__bindEvent = function() {
    var self = this;
    /**
     * function(e , row , type , index){}
     */
    this.dt.on('select.dt', this.options.onSelect);
    /**
     * function(e , row , type , index){}
     */
    this.dt.on('deselect.dt', this.options.onDeselect);
    /**
     * after a row added
     * function(e , setting){}
     */
    this.dt.on('draw.dt', this.options.onDraw);
    
    /**
     * before remove datatable
     * function(e , setting){}
     */
    this.dt.on('destroy.dt', this.options.onDestroy);
};

Grid.prototype.__unbindEvent = function() {
    var self = this;
    this.dt.off('select.dt');
    this.dt.off('deselect.dt');
    this.dt.off('draw.dt');
    this.dt.off('destroy.dt');
    this.target.off('init.dt');
};

Grid.prototype.selected = function() {
    return this.helper.api.selected(this.api);
}

Grid.prototype.addRow = function(data) {
    return this.helper.api.addRow(this.dt , data);
}