/*
 * players.js: Client for One Signal Players API
 *
 * (C) 2015 Mondo Sports Ltd
 */

var Client = require('./client').Client,
    util = require('util');

var Players = exports.Players = function (options) {
    Client.call(this, options);
}; // Players

util.inherits(Players, Client);

// Server REST API get/players (View devices)
// https://documentation.onesignal.com/docs/players-view-devices
Players.prototype.viewall = function (appAuthKey, params, callback) {
    if (!appAuthKey) {
        return callback(new Error('OneSignal Error (appAuthKey parameter required)'));
    }  
    if (!params.app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    }
    this.request('GET', ['players'], appAuthKey, params, callback, function (res, result) { 
        callback(null, result); 
    });
}; // viewall

// Server REST API get/players/:id (View device)
// https://documentation.onesignal.com/docs/playersid
Players.prototype.view = function (player_id, callback) {
    if (!player_id) {
        return callback(new Error('OneSignal Error (player_id parameter required)'));
    }
    this.request('GET', ['players', player_id], undefined, {}, callback, function (res, result) { 
        callback(null, result); 
    });
}; // viewall

// Server REST API post/players (Add a device)
// https://documentation.onesignal.com/docs/players-add-a-device
Players.prototype.create = function (params, callback) {
    if (!params.app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    }
    if (!params.device_type) {
        return callback(new Error('OneSignal Error (device_type parameter required)'));
    }
    this.request('POST', ['players'], undefined, params, callback, function (res, result) { 
        callback(null, result); 
    });
}; // create

// Server REST API put/players/:id (Edit device)
// Edit an existing device in OneSignal.
// https://documentation.onesignal.com/docs/playersidon_session
Players.prototype.edit = function (player_id, params, callback) {
    if (!player_id) {
        return callback(new Error('OneSignal Error (player_id parameter required)'));
    }
    this.request('PUT', ['players', player_id], undefined, params, callback, function (res, result) { 
        callback(null, result); 
    });
}; // edit

// Server REST API post/players/:id/on_session
// Call on new device session in your app
// https://documentation.onesignal.com/docs/playersidon_session
Players.prototype.on_session = function (player_id, params, callback) {
    if (!player_id) {
        return callback(new Error('OneSignal Error (player_id parameter required)'));
    }
    this.request('POST', ['players', player_id, 'on_session'], undefined, params, callback, function (res, result) { 
        callback(null, result); 
    });
}; // on_session

// Server REST API post/players/:id/on_purchase
// Track a new purchase
// https://documentation.onesignal.com/docs/on_purchase
Players.prototype.on_purchase = function (player_id, params, callback) {
    if (!player_id) {
        return callback(new Error('OneSignal Error (player_id parameter required)'));
    }
    if (!params.purchases) {
        return callback(new Error('OneSignal Error (purchases parameter required)'));
    }
    if (!utils.isArray(params.purchases)) {
        return callback(new Error('OneSignal Error (purchases should be an array)'));
    }
    var validPurchases = true;
    params.purchases.forEach(function (purchase) {
        if (!purchase.sku) {
            validPurchases = false;
        }
        if (!purchase.amount) {
            validPurchases = false;
        }
        if (!purchase.iso) {
            validPurchases = false;
        } else if (purchase.iso.length !== 3) {
            validPurchases = false;
        }
    });
    if (!validPurchases) {
        return callback(new Error('OneSignal Error (purchases should contains sku, amount and iso currency code)'));
    }
    this.request('POST', ['players', player_id, 'on_purchase'], undefined, params, callback, function (res, result) {
        callback(null, result);
    });
}; // on_purchase

// Server REST API post/players/:id/on_focus
// Increment the device's total session length
// https://documentation.onesignal.com/docs/playersidon_focus
Players.prototype.on_focus = function (player_id, params, callback) {
    if (!player_id) {
        return callback(new Error('OneSignal Error (player_id parameter required)'));
    }
    if (!params.state) {
        return callback(new Error('OneSignal Error (state parameter required)'));
    }
    if (!params.active_time) {
        return callback(new Error('OneSignal Error (active_time parameter required)'));
    }
    this.request('POST', ['players', player_id, 'on_focus'], undefined, params, callback, function (res, result) {
        callback(null, result);
    });
}; // on_purchase

// Server REST API post/players/csv_export
// https://documentation.onesignal.com/docs/players_csv_export
Players.prototype.csv_export = function (appAuthKey, app_id, callback) {
    if (!appAuthKey) {
        return callback(new Error('OneSignal Error (appAuthKey parameter required)'));
    }  
    if (!app_id) {
        return callback(new Error('OneSignal Error (app_id parameter required)'));
    }
    this.request('POST', ['players', 'csv_export', '?app_id=' + app_id], appAuthKey, {}, callback, function (res, result) {
        callback(null, result);
    });
}; // csv_export