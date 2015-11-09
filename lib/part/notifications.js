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

Notifications.prototype.viewall = function (app_id, limit, offset, callback) {
    this.request('GET', ['notifications'], {
        app_id: app_id,
        limit: limit,
        offset: offset
    }, callback, function (res, result) { callback(null, result); });

}; // viewall

Notifications.prototype.view = function (notification_id, app_id, callback) {
    this.request('GET', ['notifications', notification_id], {
        app_id: app_id // string required
    }, callback, function (res, result) { callback(null, result); });

}; // view

Notifications.prototype.track = function (notification_id, app_id, opened, callback) {
    this.request('PUT', ['notifications', notification_id], {
        app_id: app_id, // string required
        opended: opended // boolean required
    }, callback, function (res, result) { callback(null, result); });
}; // track

Notifications.prototype.create = function (app_id, contents, headings, isIos, isAndroid, isWP, isAdm, isChrome, isChromeWeb, isSafari, isAnyWeb, included_segments, excluded_segments, include_player_ids, include_ios_tokens, include_android_reg_ids, include_wp_uris, include_wp_wns_uris, include_amazon_reg_ids, include_chrome_reg_ids, include_chrome_web_reg_ids, app_ids, tags, ios_badgeType, ios_badgeCount, ios_sound, android_sound, adm_sound, wp_sound, wp_wns_sound, data, buttons, small_icon, large_icon, big_picture, adm_small_icon, adm_large_icon, adm_big_picture, chrome_icon, chrome_big_picture, chrome_web_icon, url, send_after, delayed_option, delivery_time_of_day, android_led_color, android_accent_color, android_visibility, content_available, android_background_data, amazon_background_data, template_id, android_group, android_group_message, adm_group, adm_group_message, callback) {
    this.request('POST', ['notifications'], { 
        app_id : app_id, // string required
        contents: contents,
        headings: headings,
        isIos: isIos,
        isAndroid: isAndroid,
        isWP: isWP,
        isAdm: isAdm,
        isChrome: isChrome,
        isChromeWeb: isChromeWeb,
        isSafari: isSafari,
        isAnyWeb: isAnyWeb,
        included_segments: included_segments,
        excluded_segments: excluded_segments,
        include_player_ids: include_player_ids,
        include_ios_tokens: include_ios_tokens,
        include_android_reg_ids: include_android_reg_ids,
        include_wp_uris: include_wp_uris,
        include_wp_wns_uris: include_wp_wns_uris,
        include_amazon_reg_ids: include_amazon_reg_ids,
        include_chrome_reg_ids: include_chrome_reg_ids,
        include_chrome_web_reg_ids: include_chrome_web_reg_ids,
        app_ids: app_ids,
        tags: tags,
        ios_badgeType: ios_badgeType,
        ios_badgeCount: ios_badgeCount,
        ios_sound: ios_sound,
        android_sound: android_sound,
        adm_sound: adm_sound,
        wp_sound: wp_sound,
        wp_wns_sound: wp_wns_sound,
        data: data,
        buttons: buttons,
        small_icon: small_icon,
        large_icon: large_icon,
        big_picture: big_picture,
        adm_small_icon: adm_small_icon,
        adm_large_icon: adm_large_icon,
        adm_big_picture: adm_big_picture,
        chrome_icon: chrome_icon,
        chrome_big_picture: chrome_big_picture,
        chrome_web_icon: chrome_web_icon,
        url: url,
        send_after: send_after,
        delayed_option: delayed_option,
        delivery_time_of_day: delivery_time_of_day,
        android_led_color: android_led_color,
        android_accent_color: android_accent_color,
        android_visibility: android_visibility,
        content_available: content_available,
        android_background_data: android_background_data,
        amazon_background_data: amazon_background_data,
        template_id: template_id,
        android_group: android_group,
        android_group_message: android_group_message,
        adm_group: adm_group,
        adm_group_message: adm_group_message
    }, callback, function (res, result) {
        callback(null, result);
    });
}; // create

Notifications.prototype.delete = function (notification_id, app_id, callback) {
    this.request('DELETE', ['notifications', notification_id], {
        app_id: app_id // string required
    }, callback, function (res, result) { callback(null, result); });
}; // delete