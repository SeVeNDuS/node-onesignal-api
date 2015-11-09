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

Apps.prototype.viewall = function (callback) {
    this.request('GET', ['apps'], {
    }, callback, function (res, result) { callback(null, result); });

}; // viewall

Apps.prototype.view = function (app_id, callback) {
    this.request('GET', ['apps', app_id], {
    }, callback, function (res, result) { callback(null, result); });

}; // viewall

Apps.prototype.create = function (apns_env, apns_p12, apns_p12_password, gcm_key, chrome_key, safari_apns_p12, safari_apns_p12_password, site_name, safari_site_origin, callback) {
    this.request('POST', ['apps'], { 
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

Apps.prototype.edit = function (app_id, name, apns_p12, apns_env, gcm_key, callback) {
    this.request('PUT', ['apps', app_id], { 
        name : name,
        apns_p12 : apns_p12, 
        apns_env : apns_env,
        gcm_key: gcm_key
    }, callback, function (res, result) {
        callback(null, result);
    });
}; // edit