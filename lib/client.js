/*
 * client.js: One Signal API client
 *
* (C) 2015 Mondo Sports Ltd
 */

var parts = ['Apps', 'Players', 'Notifications'];

parts.forEach(function (part) {
    exports[part] = require('./part/' + part.toLowerCase())[part];
});

exports.createClient = function (options) {

    var client = {};

    parts.forEach(function (part) {
        client[part.toLowerCase()] = new exports[part](options);
    });

    return client;

}; // createClient