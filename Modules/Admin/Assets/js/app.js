/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Util, createUrl, Interval, moment */

var Admin = function() {
    return this;
};

Admin.prototype.logout = function() {
    submit({
        action: route('logout'),
        method: 'post'
    });
};

Admin.prototype.toggleFull = function(){
    Util.toggleFullScreen();
};

var UserMessage = function() {
    this.elementId = 'user_message';
    this.element = $('#' + this.elementId);
    this.badgeTotal = this.element.find('span.user-message-total');
    this.listContainer = this.element.find('ul.msg_list');
    this.noAvatar = route('public/image/no-avatar.png');
    this.logo = route('public/image/logo.png');
    this.unRead = 0;
    this.timeout = 5000;
    return this;
};

UserMessage.prototype.footer = function() {
    return ''
        + '<li>'
        + '	<div class="text-center">'
        + '		<a>'
        + '			<strong>See All Alerts</strong>'
        + '			<i class="fa fa-angle-right"></i>'
        + '		</a>'
        + '	</div>'
        + '</li>';
};

UserMessage.prototype.genMessage = function(item) {
    if(! item.is_read) {
        this.unRead ++;
    }
    var _avatar = item.from ?
        (item.from.current_avatar
            ? item.from.current_avatar.link : this.noAvatar) : this.logo;
    return ''
        + '<li class="user-message-item '+(item.is_read ? 'read' : '')+'">'
        + '	<a>'
        + '		<span class="image"><img src="' + _avatar + '" alt="Profile Image" /></span>'
        + '		<span>'
        + '			<span>' + (item.from ? item.from.name : 'System') + '</span>'
        + '			<span class="time">' + moment(item.created_at).fromNow(true) + '</span>'
        + '		</span>'
        + '		<span class="message">'
        + '			' + item.content
        + '		</span>'
        + '	</a>'
        + '</li>';
};

UserMessage.prototype.lastestMessage = function() {
    var self = this;
    self.unRead = 0;
    Util.ajax({
        url: url('lastest-message-current-user'),
        dataType: 'json',
        success: function(result) {
            self.onUpdated(result);
        }
    });
};

UserMessage.prototype.onUpdated = function(result) {
    var self = this;
    if(result.status === 200) {
        self.listContainer.html('');
        result.data.forEach(function(item) {
            self.listContainer.append(self.genMessage(item));
        });
        if(self.unRead) {
            self.badgeTotal.html(this.unRead).show();
        }
        else {
            self.badgeTotal.hide();
        }
        if(result.data.length === 6){
            self.listContainer.append(self.footer());
        }
    }
};

UserMessage.prototype.updateMessage = function() {
    var self = this;
    Interval.set('UPDATE_MESSAGE', function() {
        self.lastestMessage();
    }, self.timeout);
};

var app = new Admin();

(function() {
    /**
     * Top menu user message
     */
    app.userMessage = new UserMessage();
    app.userMessage.lastestMessage();
    app.userMessage.updateMessage();
    
    /**
     * Lockscreen
     */
//    app.lockscreen = new LockScreen({
//        timeout:30000,
//        message:{
//            content: 'Boss is out for lunch',
//            class:'top center'
//        }
//    });
})();