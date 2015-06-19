"use strict";
var VERSION = "0.0.1",
	querystring = require("querystring"),
	request = require("request"),
	fs = require("fs");

var baseUrl = "https://onesignal.com/api/v1/";
var authUrl = "https://twitter.com/oauth/authenticate?oauth_token=";

var OneSignal = function (options) {
	if (!(this instanceof OneSignal)) {
		return new OneSignal(options);
	}

	this.authKey = options.authKey;
	this.callback = options.callback;

	return this;
};
OneSignal.VERSION = VERSION;

OneSignal.prototype.getRequestToken = function(callback) {
	this.oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
		if (error) {
			callback(error);
		} else {
			callback(null, oauthToken, oauthTokenSecret, results);
		}
	});
};

Twitter.prototype.getAuthUrl = function(requestToken) {
	return authUrl + requestToken;
};

Twitter.prototype.getAccessToken = function(requestToken, requestTokenSecret, oauth_verifier, callback) {
	this.oa.getOAuthAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
		if (error) {
			callback(error);
		} else {
			callback(null, oauthAccessToken, oauthAccessTokenSecret, results);
		}
	});
};

Twitter.prototype.verifyCredentials = function(accessToken, accessTokenSecret, callback) {
	this.oa.get(baseUrl + "account/verify_credentials.json", accessToken, accessTokenSecret, function(error, data, response) {
		if (error) {
			callback(error);
		} else {
			try {
				callback(null, JSON.parse(data));
			} catch (e) {
				callback(e, data);
			}
		}
	});
};

//Apps
OneSignal.prototype.getApps = function (callback) {
	var options = {
  		url: baseUrl + 'apps',
  		headers: {
    		'Authorization': 'Basic ' + this.authKey
  		}
	};

	request(options, callback);
};

OneSignal.prototype.getApp = function (appId, callback) {
	if (!appId) {
		callback(new Error('onesignal.getApp.error')):
	} else {
		var options = {
	  		url: baseUrl + 'apps/' + appId,
	  		headers: {
	    		'Authorization': 'Basic ' + this.authKey
	  		}
		};

		request(options, callback);
	}
};

OneSignal.prototype.createApp = function (name, apns_env, apns_p12, apns_p12_password, gcm_key, callback) {
	var options = {
		method: 'POST',
  		url: baseUrl + 'apps',
  		json: {
  			name: name,
  			apns_env: apns_env,
  			apns_p12: apns_p12,
  			apns_p12_password: apns_p12_password,
  			gcm_key: gcm_key
  		},
  		headers: {
    		'Authorization': 'Basic ' + this.authKey
  		}
	};

	request(options, callback);
};

OneSignal.prototype.updateApp = function (appId, name, apns_env, apns_p12, gcm_key, callback) {
	if (!appId) {
		callback(new Error('onesignal.updateApp.error')):
	} else {
		var options = {
			method: 'PUT',
	  		url: baseUrl + 'apps/' + appId,
	  		json: {
	  			name: name,
	  			apns_env: apns_env,
	  			apns_p12: apns_p12,
	  			gcm_key: gcm_key
	  		},
	  		headers: {
	    		'Authorization': 'Basic ' + this.authKey
	  		}
		};

		request(options, callback);
	}
};

//Players
OneSignal.prototype.getPlayers = function (appId, limit, offset, callback) {
	if (!appId) {
		callback(new Error('onesignal.getPlayers.error')):
	} else {
		var options = {
	  		url: baseUrl + 'players',
	  		qs: {
	  			app_id: appId,
	  			limit: limit,
	  			offset: offset
	  		},
	  		headers: {
	    		'Authorization': 'Basic ' + this.authKey
	  		}
		};

		request(options, callback);
	}
};

OneSignal.prototype.getPlayer = function (playerId, callback) {
	if (!playerId) {
		callback(new Error('onesignal.getPlayer.error')):
	} else {
		var options = {
	  		url: baseUrl + 'players/' + playerId,
	  		headers: {
	    		'Authorization': 'Basic ' + this.authKey
	  		}
		};

		request(options, callback);
	}
};

OneSignal.prototype.createPlayer = function (appId, deviceType, params, callback) {
	var options = {
		method: 'POST',
  		url: baseUrl + 'apps',
  		json: {
  			name: name,
  			apns_env: apns_env,
  			apns_p12: apns_p12,
  			apns_p12_password: apns_p12_password,
  			gcm_key: gcm_key
  		},
  		headers: {
    		'Authorization': 'Basic ' + this.authKey
  		}
	};

	request(options, callback);
};

OneSignal.prototype.updatePlayer = function (appId, name, apns_env, apns_p12, gcm_key, callback) {
	if (!appId) {
		callback(new Error('onesignal.updateApp.error')):
	} else {
		var options = {
			method: 'PUT',
	  		url: baseUrl + 'apps/' + appId,
	  		json: {
	  			name: name,
	  			apns_env: apns_env,
	  			apns_p12: apns_p12,
	  			gcm_key: gcm_key
	  		},
	  		headers: {
	    		'Authorization': 'Basic ' + this.authKey
	  		}
		};

		request(options, callback);
	}
};

module.exports = OneSignal;
