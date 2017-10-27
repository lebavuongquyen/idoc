/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global addItem, Util, activeItem */

'use strict';
var addItem, editItem, deleteItem, saveItem;
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

DataTableColumn.prototype.action = function($actions, $opt) {
    var self = this;
    var _opt = $opt || {};
    return {
        data: _opt.data,
        title: _opt.title || 'Actions',
        width: _opt.width || '80px',
        className: 'action-column ' + (_opt.className || ''),
        render: (typeof _opt.render === 'function') ? _opt.render : function($value) {
            return self.render.action($actions, $value);
        }
    };
};

DataTableColumn.prototype.active = function($opt) {
    var self = this;
    var _opt = $opt || {};
    return {
        data: _opt.data,
        title: _opt.title || 'Actived',
        width: _opt.width || '80px',
        className: 'cell-text-center ' + (_opt.className || ''),
        render: (typeof _opt.render === 'function') ? _opt.render : function($value) {
            return self.render.active($value , _opt);
        }
    };
};

var DataTableColumnRender = function() {
    return this;
};

DataTableColumnRender.prototype.joinArray = function($delimiter, $list) {
    return $list.join($delimiter);
};

DataTableColumnRender.prototype.joinObject = function($delimiter, $obj) {
    var $list = [];
    for(var i in $obj) {
        $list.push(i + ':' + $obj[i]);
    }
    return this.joinArray($delimiter, $list);
};

DataTableColumnRender.prototype.action = function($actions, $data) {
    var _str = '';
    var button = new DataTableButton();
    for(var i in $actions) {
        _str += button.render($actions[i], $data);
    }
    return _str;
};

DataTableColumnRender.prototype.active = function($value, $option) {
    var button = new DataTableButton();
    return button.render(button.active($value , $option),$value);
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
        click: _opt.click || (typeof addItem === 'function' ? 'addItem(event , this);' : ''),
        data: _opt.data || null
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
        click: _opt.click || (typeof editItem === 'function' ? 'editItem(event , this);' : ''),
        data: _opt.data || null
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
        click: _opt.click || (typeof deleteItem === 'function' ? 'deleteItem(event , this);' : ''),
        data: _opt.data || null
    };
};

DataTableButton.prototype.active = function($value, $option) {
    var _opt = $option || {};
    var _active = $value ? 'Actived' : 'Inactived';
    var _icon = $value ? 'check-circle-o' : 'ban';
    return {
        title: _opt.title || _active + ' item',
        text: _opt.text || _active,
        icon: _opt.icon || _icon,
        class: _opt.class || '',
        display: _opt.display || 'icon-only',
        click: _opt.click || (typeof activeItem === 'function' ? 'activeItem(event , this);' : ''),
        data: _opt.data || null
    };
};

DataTableButton.prototype.render = function($item, $data) {
    var title = $item.title || '';
    var text = $item.text || title;
    var cls = $item.class || '';
    var icon = '';
    var click = $item.click || '';
    if(typeof click === 'function') {
        click = $item.click($data);
    }
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
        return $item.data;
    };

    var getDataValue = function() {
        if(typeof $data === 'object') {
            var _str = ' ';
            for(var i in $data) {
                _str += 'data-value.' + i + '="' + $data[i] + '" ';
            }
            return _str;
        }
        return 'data-value="' + $data + '"';
    };

    return '<a class="btn-table btn-link ' + cls
        + '" title="' + title + '" onclick="' + click
        + '" ' + getData() + ' ' + getDataValue() + ' >' + getText() + '</a>';
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
            className: 'btn-sm',
            action: function() {
                if(typeof addItem === 'function') {
                    addItem();
                }
            }
        }
    ];
};

var DataTableApi = function() {
    return this;
};

DataTableApi.prototype.selected = function(api) {
    return api.rows('.selected').data();
};

DataTableApi.prototype.addRow = function(dt, data) {
    return dt.row.add(data).draw();
};

DataTableApi.prototype.addRows = function(dt, datas) {
    return dt.rows.add(datas).draw();
};

DataTableApi.prototype.insertRow = function(dt, index, item, callback) {
    var _data = dt.data().toArray();
    _data = Util.arrayInsert(_data, index, item);
    this.clear(dt);
    this.addRows(dt, _data);
    dt.draw();
    if(typeof callback === 'function') {
        callback(dt, index, item);
    }
    return dt;
};

DataTableApi.prototype.clear = function(dt, callback) {
    dt.clear();
    if(typeof callback === 'function') {
        callback(dt);
    }
    return dt;
};

DataTableApi.prototype.draw = function(dt, callback) {
    dt.draw();
    if(typeof callback === 'function') {
        callback(dt);
    }
    return dt;
};

DataTableApi.prototype.reload = function(dt, callback) {
    if(dt.ajax.url()) {
        return dt.ajax.reload(callback);
    }
    return this.draw(dt, callback);
};

DataTableApi.prototype.removeById = function(dt, id, callback) {
    dt.row('#' + id).remove().draw();
    if(typeof callback === 'function') {
        callback(dt, id);
    }
    return dt;
};

var Grid = function($target, $opt) {
    var _opt = $opt || {};
    this.helper = new DataTableHelper();
    this.target = $target;
    this.options = {
        dom: "Bfrtip",
        buttons: this.helper.button.common(),
//        responsive: true,
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
            selector: 'td:not(".action-column")'
        },
        autoWidth: true,
        deferRender: _opt.data ? _opt.data : false,
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
            }
        },
        processing: false,
        serverSite: _opt.ajax ? true : false,
        stateSave: true,
        destroy: true,
        createdRow: function(row, data, dataIndex) {},
        colReorder: true,
        rowId: 'row_id',
        scrollX: true,
        id : 'id',
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
    this.container = this.target.parents('.dataTables_wrapper');
    this.containerFilter = this.container.find('>.dataTables_filter');
    this.containerButtons = this.container.find('>.dt-buttons.btn-group');
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
    return this.helper.api.selected(this.api).toArray();
};

Grid.prototype.selectedRow = function() {
    var ele = this.target.find('tbody tr.selected');
    return ele.length ? ele : null;
};

Grid.prototype.addRow = function(data) {
    return this.helper.api.addRow(this.dt, data);
};

Grid.prototype.addRows = function(data) {
    return this.helper.api.addRows(this.dt, data);
};

Grid.prototype.data = function() {
    return this.dt.rows().data().toArray();
};

Grid.prototype.total = function() {
    return this.dt.page.info().recordsTotal;
};

Grid.prototype.searchTotal = function() {
    return this.dt.page.info().recordsDisplay;
};

Grid.prototype.rowById = function($id) {
    var element = this.target.find('tbody tr#' + $id);
    return element.length ? element : null;
};

Grid.prototype.itemById = function($id) {
    var rowId = this.options.id;
    return this.data().find(function(item) {
        return item[rowId] == $id;
    });
};

Grid.prototype.reload = function(callback) {
    return this.helper.api.reload(this.dt, callback);
};

Grid.prototype.itemIndex = function($id) {
    var rowId = this.options.rowId;
    return this.data().findIndex(function(item) {
        return item[rowId] == $id;
    });
};

Grid.prototype.updateById = function($id, $data) {
    var _data = this.itemById($id);
    return this.dt.row('#' + $id).data($.extend(_data, $data)).draw();
};

Grid.prototype.removeById = function($id, $callback) {
    return this.helper.api.removeById(this.dt, $id, $callback);
};

Grid.prototype.insertRow = function($index, $item, $callback) {
    return this.helper.api.insertRow(this.dt, $index, $item, $callback);
};