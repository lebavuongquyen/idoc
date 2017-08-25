/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var url = function($uri) {
    var _uri = $uri || '';
    return (global.base || $('base').attr('href')).replace(/\/$/, '')
            + '/' + _uri.replace(/^\//, '').replace(/\/$/, '');
};

var link = function($uri) {
    var _uri = $uri || '';
    return (global.base || $('base').attr('href')).replace(/\/?index.php\/?$/, '').replace(/\/$/, '')
            + '/' + _uri.replace(/^\//, '').replace(/\/$/, '');
};

var asset = function($uri) {
    var _uri = $uri || '';
    return (global.asset || $('base').attr('href')).replace(/\/?index.php\/?$/, '').replace(/\/$/, '')
            + '/' + _uri.replace(/^\//, '').replace(/\/$/, '');
};

var route = function($uri){
    var _uri = $uri || '';
    return (global.domain || $('base').attr('href')).replace(/\/?index.php\/?$/, '').replace(/\/$/, '')
            + '/' + _uri.replace(/^\//, '').replace(/\/$/, '');
};

var submit = function($opt){
    var _opt = $opt || {};
    $('body').append('<form id="temp_form" style="display:none;"></form>');
    var _temp = $('#temp_form');
    _temp.attr('action' , _opt.action).attr('method' , _opt.method);
    var _data = _opt.data || {};
    for( var i in _data) {
        _temp.append('<input type="hidden" name="'+i+'" value="'+_data[i]+'" />');
    }
    if ((_opt.method || '').toLowerCase() === 'post') {
        _temp.append('<input type="hidden" name="_token" value="'+global._token+'" />');
    }
    _temp.submit();
};
