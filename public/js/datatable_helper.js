/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
var DataTableHelper = function(){
    this.column = new DataTableColumn();
    return this;
};

DataTableHelper.prototype.model = function($item) {
    return new DataModel($item);
};

var DataTableColumn = function(){
    this.render = new DataTableColumnRender();
    return this;
};

DataTableColumn.prototype.action = function($actions){
    var self = this;
    return {
        data : null , 
        title : 'Actions',
        render : function(){
            return self.render.action($actions);
        }
    };
}

var DataTableColumnRender = function(){
    return this;
};

DataTableColumnRender.prototype.joinArray = function($delimiter , $list){
    return $list.join($delimiter);
};

DataTableColumnRender.prototype.action = function($actions){
    var _str = '';
    var render = function($item){
        var title = $item.title || '';
        var text = $item.text || title;
        var cls = $item.class || '';
        var icon = '';
        if($item.icon) {
            icon = '<i class="fa fa-'+$item.icon+'"></i>';
        }
        var getText = function(){
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
        var btnText = '';
        
        return '<a class="btn-table btn-link '+cls+'" title="'+title+'">'+getText()+'</a>';
    };
    for(var i in $actions) {
        _str += render($actions[i]);
    }
    return _str;
};

var DataModel = function($item){
    for(var i in $item){
        this['_' + i] = $item[i];
        this[i] = function(){
            return this['_' + i];
        };
    }
    return this;
};