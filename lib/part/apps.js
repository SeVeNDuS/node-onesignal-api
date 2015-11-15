/*
 * apps.js: Client for One Signal Apps API
 *
 * (C) 2015 Mondo Sports Ltd
 */

var Client = require('./client').Client,
    util = require('util');

var Apps = exports.Apps = function (options) {
    Client.call(this, options);
}; // Apps

util.inherits(Apps, Client);

// Server REST API get/apps (View Apps)
// View the details of all of your current OneSignal apps
// https://documentation.onesignal.com/docs/apps-view-apps
Apps.prototype.viewall = function (userAuthKey, callback) {
    if (!userAuthKey) {
        return callback(new Error('OneSignal Error (userAuthKey parameter required)'));
    }
    this.request('GET', ['apps'], userAuthKey, {}, callback, function (res, result) { 
        callback(null, result); 
    });
}; // viewall

// Server REST API get/apps/:id (View an app)
// View the details of a single OneSignal app
// https://documentation.onesignal.com/docs/appsid
Apps.prototype.view = function (userAuthKey, app_id, callback) {
    if (!userAuthKey) {
        return callback(new Error('OneSignal Error (userAuthKey parameter required)'));
    }
    if (!app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    }
    this.request('GET', ['apps', app_id], userAuthKey, {}, callback, function (res, result) { callback(null, result); });

}; // viewall

// Server REST API post/apps (Create an app)
// Create a new OneSignal app
// https://documentation.onesignal.com/docs/apps-create-an-app
Apps.prototype.create = function (userAuthKey, apns_env, apns_p12, apns_p12_password, gcm_key, chrome_key, safari_apns_p12, safari_apns_p12_password, site_name, safari_site_origin, callback) {
    if (!userAuthKey) {
        return callback(new Error('OneSignal Error (userAuthKey parameter required)'));
    }
    this.request('POST', ['apps'], userAuthKey, { 
        apns_env : apns_env,
        apns_p12 : apns_p12, 
        apns_p12_password : apns_p12_password,
        gcm_key: gcm_key,
        chrome_key: chrome_key,
        safari_apns_p12: safari_apns_p12,
        safari_apns_p12_password: safari_apns_p12_password,
        site_name: site_name,
        safari_site_origin: safari_site_origin
    }, callback, function (res, result) {
        callback(null, result);
    });
}; // create

// Server REST API put/apps/:id (Update an app)
// https://documentation.onesignal.com/docs/appsid-update-an-app
Apps.prototype.edit = function (userAuthKey, app_id, name, apns_p12, apns_env, gcm_key, callback) {
    if (!userAuthKey) {
        return callback(new Error('OneSignal Error (userAuthKey parameter required)'));
    }
    if (!app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    }
    this.request('PUT', ['apps', app_id], userAuthKey, { 
        name : name,
        apns_p12 : apns_p12, 
        apns_env : apns_env,
        gcm_key: gcm_key
    }, callback, function (res, result) {
        callback(null, result);
    });
}; // edit