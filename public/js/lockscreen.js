/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var LockScreen = function($opt) {
    this.options = {
        enable: true,
        timeout: 30000,
    };
    return this.init($opt);
};

LockScreen.prototype.init = function($opt) {
    var _opt = {};
    if(typeof $opt === 'function') {
        _opt = $opt();
    }
    else if(typeof $opt === 'object') {
        _opt = $opt;
    }
    $(window)
        .unbind('click')
        .unbind('keypress')
        .bind({
            click: function(e) {
                console.log(e);
            },
            keypress: function(e) {
                console.log(e);
            }
        });
    return this;
};
