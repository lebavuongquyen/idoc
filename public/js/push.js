/* global OneSignal */
var OneSignal = window.OneSignal || [];
//OneSignal = window.OneSignal || [];
OneSignal.push(
    [
        "init",
        {
            appId: "6467968f-aee5-43fa-86a0-2a4066a02bb8",
            autoRegister: true, /* Set to true to automatically prompt visitors */
            httpPermissionRequest: {
                enable: true
            },
            /* Your other init options here */
            notifyButton: {
                enable: true, /* Required to use the notify button */
                size: 'large', /* One of 'small', 'medium', or 'large' */
                theme: 'default', /* One of 'default' (red-white) or 'inverse" (white-red) */
                position: 'bottom-right', /* Either 'bottom-left' or 'bottom-right' */
                offset: {
                    bottom: '10px',
                    left: '10px', /* Only applied if bottom-left */
                    right: '10px' /* Only applied if bottom-right */
                },
                prenotify: true, /* Show an icon with 1 unread message for first-time site visitors */
                showCredit: false, /* Hide the OneSignal logo */
                text: {
                    'tip.state.unsubscribed': 'Subscribe to notifications',
                    'tip.state.subscribed': "You're subscribed to notifications",
                    'tip.state.blocked': "You've blocked notifications",
                    'message.prenotify': 'Click to subscribe to notifications',
                    'message.action.subscribed': "Thanks for subscribing!",
                    'message.action.resubscribed': "You're subscribed to notifications",
                    'message.action.unsubscribed': "You won't receive notifications again",
                    'dialog.main.title': 'MRMS Notifications',
                    'dialog.main.button.subscribe': 'SUBSCRIBE',
                    'dialog.main.button.unsubscribe': 'UNSUBSCRIBE',
                    'dialog.blocked.title': 'Unblock Notifications',
                    'dialog.blocked.message': "Follow these instructions to allow notifications:"
                }
            },
            // Your other init options here
            promptOptions: {
                /* These prompt options values configure both the HTTP prompt and the HTTP popup. */
                /* actionMessage limited to 90 characters */
                actionMessage: "We'd like to show you notifications for the latest news and updates.",
                /* acceptButtonText limited to 15 characters */
                acceptButtonText: "ALLOW",
                /* cancelButtonText limited to 15 characters */
                cancelButtonText: "NO THANKS"
            }
        }
    ]
    );
OneSignal.push(function() {
    /* These examples are all valid */
    OneSignal.setDefaultNotificationUrl("http://74.203.162.93/apiv2/mrmsnew");
    OneSignal.setDefaultTitle("MRMS Notifications");
//    OneSignal.registerForPushNotifications({
//        modalPrompt: true
//    });
    OneSignal.setSubscription(true);
//    OneSignal.registerForPushNotifications();
//        OneSignal.showHttpPrompt();
//        OneSignal.showHttpPermissionRequest();
});
//OneSignal.push(["getNotificationPermission", function(permission) {
//        console.log("Site Notification Permission:", permission);
//        // (Output) Site Notification Permission: default
//    }]);
OneSignal.push(function() {
    /* These examples are all valid */
    OneSignal.sendTag('hello', 'test');
});

OneSignal.push(function() {
    OneSignal.sendSelfNotification(
        /* Title (defaults if unset) */
        'Hello',
        /* Message (defaults if unset) */
        'Test',
        /* URL (defaults if unset) */
//        $opt.url,
        /* Icon */
//        $opt.icon,
        {
            /* Additional data hash */
//            notificationType: $opt.type
        },
//        $opt.buttons
//        [{/* Buttons */
//                /* Choose any unique identifier for your button. The ID of the clicked button is passed to you so you can identify which button is clicked */
//                id: 'like-button',
//                /* The text the button should display. Supports emojis. */
//                text: 'Like',
//                /* A valid publicly reachable URL to an icon. Keep this small because it's downloaded on each notification display. */
//                icon: 'http://i.imgur.com/N8SN8ZS.png',
//                /* The URL to open when this action button is clicked. See the sections below for special URLs that prevent opening any window. */
//                url: 'https://example.com/?_osp=do_not_open'
//            },
//            {
//                id: 'read-more-button',
//                text: 'Read more',
//                icon: 'http://i.imgur.com/MIxJp1L.png',
//                url: 'https://example.com/?_osp=do_not_open'
//            }]
        );
});

var Push = {
    send: function($opt) {
        OneSignal.push(function() {
            OneSignal.sendSelfNotification(
                /* Title (defaults if unset) */
                $opt.title,
                /* Message (defaults if unset) */
                $opt.message,
                /* URL (defaults if unset) */
                $opt.url,
                /* Icon */
                $opt.icon,
                {
                    /* Additional data hash */
                    notificationType: $opt.type
                },
                $opt.buttons
//        [{/* Buttons */
//                /* Choose any unique identifier for your button. The ID of the clicked button is passed to you so you can identify which button is clicked */
//                id: 'like-button',
//                /* The text the button should display. Supports emojis. */
//                text: 'Like',
//                /* A valid publicly reachable URL to an icon. Keep this small because it's downloaded on each notification display. */
//                icon: 'http://i.imgur.com/N8SN8ZS.png',
//                /* The URL to open when this action button is clicked. See the sections below for special URLs that prevent opening any window. */
//                url: 'https://example.com/?_osp=do_not_open'
//            },
//            {
//                id: 'read-more-button',
//                text: 'Read more',
//                icon: 'http://i.imgur.com/MIxJp1L.png',
//                url: 'https://example.com/?_osp=do_not_open'
//            }]
                );
        });
    }
};