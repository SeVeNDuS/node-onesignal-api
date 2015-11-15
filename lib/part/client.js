/*
 * client.js
 *
 * (C) 2015 Mondo Sports Ltd
 */

var fs = require('fs'),
    request = require( 'request' );

var failCodes = {
    400 : 'Bad Request',
    401 : 'Not Authorized',
    403 : 'Forbidden',
    404 : 'Item Not Found',
    405 : 'Method Not Allowed',
    409 : 'Conflict',
    500 : 'Internal Server Error'
}; // failCodes

var defaultOptions = {
    remoteUri: 'https://onesignal.com/api/v1'
};

var Client = exports.Client = function (options) {
    this.options = options || defaultOptions;
    if (!this.options.remoteUri) {
        this.options.remoteUri = defaultOptions.remoteUri;
    }
    this._request = request;

    if (typeof this.options.get !== 'function') {    
        this.options.get = function (key) {
            return this[key];
        } // this.options.get
    } // if ( typeof this.options.get !== 'function' )
}; // Client

//
// ### @private function request ( method, uri, [body], success, callback )
// #### @method {string} HTTP method to use
// #### @uri {Array} Locator for the Remote Resource
// #### @authKey {string} **optional** authKey if needed
// #### @body {Object} **optional** JSON Request Body
// #### @callback {function} Continuation to call if errors occur
// #### @success {function} Continuation to call upon successful transactions
// Makes a request to `this.remoteUri + uri` using `method` and any `body`
// (JSON-only) if supplied. Short circuits to `callback` if the response code
//
Client.prototype.request = function (method, uri, authKey /* variable arguments */ ) {  
    var args = Array.prototype.slice.call(arguments),
        success = args.pop();
        callback = args.pop();
        body = typeof args[args.length - 1] === 'object' && ! Array.isArray(args[args.length - 1]) && args.pop(),
        proxy = this.options.get('proxy');        

    var options = {
        method : method || 'GET',
        uri : this.options.get('remoteUri') + '/' + uri.join('/'),
        headers : {
            'Content-Type' : 'application/json'
        }
    }; // options
    if (authKey) {
        options.headers['Authorization'] = 'Basic ' + authKey;
    }

    if (body) {
        options.body = JSON.stringify(body);
    } else if (method !== 'GET') {
        options.body = '{}';
    }

    if (proxy) {
        options.proxy = proxy;
    }

    this._request(options, function (error, response, body) {
        // pretty format for connection refused error
        if (error && error.errno === 'ECONNREFUSED') {
            error.message = 'Unable to connect to ' + options.uri.magenta;
            error.message += ' (Connection Refused)'.red;
            delete error.stack;
        }
    
        if (error) {
            return callback && callback(error); // done
        }

        var statusCode, result, err;

        try {
            statusCode = response.statusCode.toString();
            result = JSON.parse(body);
        }
        catch (ex) {
            // ignore errors
        }

        if (Object.keys(failCodes).indexOf(statusCode) !== -1) {      
            err = new Error('OneSignal Error (' + statusCode + '): ' + failCodes[statusCode]);
            err.statusCode = statusCode;
            err.result = result;
            return callback && callback(err); // done
        } // if ( Object.keys( failCodes ).indexOf( statusCode ) !== -1 )

        success(response, result);
    }); // this._request
}; // request