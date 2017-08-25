/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Util, createUrl */

var Admin = function(){
    return this;
};

Admin.prototype.logout = function(){
    submit({
        action : route('logout'),
        method : 'post'
    });
};

var app = new Admin();