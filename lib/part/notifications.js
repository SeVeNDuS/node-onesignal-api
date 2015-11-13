/*
 * notifications.js: Client for One Signal Notifications API
 *
 * (C) 2015 Mondo Sports Ltd
 */

var Client = require('./client').Client,
    util = require('util');

var Notifications = exports.Notifications = function (options) {
    Client.call(this, options);
}; // Players

util.inherits(Notifications, Client);

// Server REST API get/notifications (View notifications)
// https://documentation.onesignal.com/docs/notifications-view-notifications
Notifications.prototype.viewall = function (appAuthKey, app_id, limit, offset, callback) {
    if (!appAuthKey) {
        return callback(new Error('OneSignal Error (appAuthKey parameter required)'));
    }  
    if (!app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    }
    this.request('GET', ['notifications'], appAuthKey, {
        app_id: app_id,
        limit: limit,
        offset: offset
    }, callback, function (res, result) { callback(null, result); });

}; // viewall

// Server REST API get/notifications/:id (View notification)
// View the details of a notification
// https://documentation.onesignal.com/docs/notificationsid-view-notification
Notifications.prototype.view = function (appAuthKey, notification_id, app_id, callback) {
    if (!appAuthKey) {
        return callback(new Error('OneSignal Error (appAuthKey parameter required)'));
    }
    if (!notification_id) {
        return callback(new Error('OneSignal Error (notification_id parameter required)'));
    } 
    if (!app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    } 
    this.request('GET', ['notifications', notification_id], appAuthKey, {
        app_id: app_id // string required
    }, callback, function (res, result) { callback(null, result); });

}; // view

// Server REST API put/notifications/:id (Track open)
// https://documentation.onesignal.com/docs/notificationsid-track-open
Notifications.prototype.track = function (notification_id, app_id, opened, callback) {
    if (!notification_id) {
        return callback(new Error('OneSignal Error (notification_id parameter required)'));
    } 
    if (!app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    } 
    if (typeof opened !== 'undefined') {
        return callback(new Error('OneSignal Error (opened parameter required)'));
    } 
    this.request('PUT', ['notifications', notification_id], undefined, {
        app_id: app_id, // string required
        opened: opened // boolean required
    }, callback, function (res, result) { callback(null, result); });
}; // track

// Server REST API post/notifications (Create Notification)
// https://documentation.onesignal.com/docs/notifications-create-notification
Notifications.prototype.create = function (restApiKey, params, callback) {
    if (!params.app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    } 
    if (!params.contents) {
        return callback(new Error('OneSignal Error (contents parameter required)'));
    } 
    if (util.isArray(params.included_segments) && params.included_segments.length && !restApiKey) {
        return callback(new Error('OneSignal Error (restApiKey parameter required)'));
    }
    if (util.isArray(params.tags) && params.tags.length && !restApiKey) {
        return callback(new Error('OneSignal Error (restApiKey parameter required)'));
    }
    this.request('POST', ['notifications'], restApiKey, params, callback, function (res, result) {
        callback(null, result);
    });
}; // create

// Server REST API delete/notifications/:id (Cancel notification)
// Stop a scheduled or currently outgoing notification.
// https://documentation.onesignal.com/docs/notificationsid-cancel-notification
Notifications.prototype.delete = function (appAuthKey, notification_id, app_id, callback) {
    if (!appAuthKey) {
        return callback(new Error('OneSignal Error (appAuthKey parameter required)'));
    }
    if (!notification_id) {
        return callback(new Error('OneSignal Error (notification_id parameter required)'));
    } 
    if (!app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    } 
    this.request('DELETE', ['notifications', notification_id], appAuthKey, {
        app_id: app_id // string required
    }, callback, function (res, result) { callback(null, result); });
}; // delete