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

Players.prototype.viewall = function (app_id, limit, offset, callback) {
    this.request('GET', ['players'], {
        app_id: app_id,
        limit: limit,
        offset: offset
    }, callback, function (res, result) { callback(null, result); });

}; // viewall

Players.prototype.view = function (player_id, callback) {
    this.request('GET', ['players', player_id], {
    }, callback, function (res, result) { callback(null, result); });

}; // viewall

Players.prototype.create = function (app_id, device_type, identifier, language, timezone, game_version, device_model, device_os, ad_id, sdk, session_count, tags, amount_spent, created_at, playtime, badge_count, last_active, callback) {
    this.request('POST', ['players'], { 
        app_id : app_id, // string required
        device_type : device_type, // integet required
        identifier : identifier, // string recommended
        language : language, // string recommended
        timezone : timezone, // integer recommended
        game_version : game_version, // string recommended
        device_model : device_model, // string recommended
        device_os : device_os, // string recommended
        ad_id : ad_id, // string recommended
        sdk : sdk, // string recommended
        session_count: session_count, // integer optional
        tags: tags,  // hash optional
        amount_spent: amount_spent,  // string optional
        created_at: created_at, // integer optional optional
        playtime: playtime,  // integer optional
        badge_count: badge_count,  // integer optional
        last_active: last_active  // integer optional
    }, callback, function (res, result) {
        callback(null, result);
    });
}; // create

Players.prototype.edit = function (player_id, identifier, language, timezone, game_version, device_model, device_os, ad_id, sdk, session_count, tags, amount_spent, created_at, playtime, badge_count, last_active, callback) {
    this.request('PUT', ['players', player_id], { 
        identifier : identifier, // string optional
        language : language, // string optional
        timezone : timezone, // integer optional
        device_model : device_model, // string optional
        device_os : device_os, // string optional
        game_version : game_version, // string optional
        ad_id : ad_id, // string optional
        session_count: session_count, // integer optional
        tags: tags,  // hash optional
        amount_spent: amount_spent,  // string optional
        created_at: created_at, // integer optional optional
        last_active: last_active,  // integer optional
        badge_count: badge_count,  // integer optional
        playtime: playtime,  // integer optional
        sdk: sdk  // string optional
    }, callback, function (res, result) {
        callback(null, result);
    });
}; // edit

Players.prototype.on_session = function (player_id, identifier, language, timezone, game_version, device_model, ad_id, sdk, callback) {
    this.request('POST', ['players', player_id, 'on_session'], { 
        identifier : identifier, // string recommended
        language : language, // string recommended
        timezone : timezone, // integer recommended
        game_version : game_version, // string recommended
        device_model : device_model, // string recommended
        ad_id : ad_id, // string recommended
        sdk: sdk  // string recommended
    }, callback, function (res, result) {
        callback(null, result);
    });
}; // on_session

Players.prototype.on_purchase = function (player_id, purchases, existing, callback) {
    // each purchase should have
    // sku -> string required
    // amount -> double required
    // iso -> string required (currency code 3-letter ISO 4127)
    this.request('POST', ['players', player_id, 'on_purchase'], { 
        purchases : purchases, // array required        
        existing: existing  // boolean optional
    }, callback, function (res, result) {
        callback(null, result);
    });
}; // on_purchase

Players.prototype.on_focus = function (player_id, state, active_time, callback) {
    // each purchase should have
    // sku -> string required
    // amount -> double required
    // iso -> string required (currency code 3-letter ISO 4127)
    this.request('POST', ['players', player_id, 'on_focus'], { 
        state : state, // string required        
        active_time: active_time  // integer required
    }, callback, function (res, result) {
        callback(null, result);
    });
}; // on_purchase