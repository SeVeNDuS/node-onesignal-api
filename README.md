# OneSignal API client for node.js

OneSignal's unofficial [node.js][node] client library for using
OneSignal Rest API.

### Alpha

This library is in Alpha. We will make an effort to support the library, but we reserve the right to make incompatible changes when necessary.

### Supported APIs

The full list of supported APIs can be found [here][onesignal-api-doc]. The API endpoints are automatically generated, so if the API is not in the list, it is currently not supported by this API client library. 

### Questions/problems?

* If you've found an bug/issue, please [file it on GitHub][bugs].

## Installation

This library is distributed on `npm`. In order to add it as a dependency,
run the following command:

``` sh
$ npm install node-opensignal-api --save
```

## Usage

Example: View all apps you have on onesignal:

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var userAuthKey = 'YOUR_USER_AUTH_KEY';
onesignal_client.apps.viewall(userAuthKey, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

## Apis

### Apps

#### View all
Server REST API get/apps (View Apps)
View the details of all of your current OneSignal apps

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var userAuthKey = 'YOUR_USER_AUTH_KEY';
onesignal_client.apps.viewall(userAuthKey, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### View an app
Server REST API get/apps/:id (View an app)
View the details of a single OneSignal app

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var userAuthKey = 'YOUR_USER_AUTH_KEY';
var app_id = 'YOUR_APP_ID'
onesignal_client.apps.view(userAuthKey, app_id, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### Create an app
Server REST API post/apps (Create an app)
Create a new OneSignal app

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var userAuthKey = 'YOUR_USER_AUTH_KEY';
var apns_env,
	apns_p2,
	apns_p2_password,
	gcm_key,
	chrome_key,
	safari_apns_p2,
	safari_apns_p12_password,
	site_name,
	safari_site_origin;
onesignal_client.apps.create(userAuthKey, apns_env, apns_p12, apns_p12_password, gcm_key, chrome_key, safari_apns_p12, safari_apns_p12_password, site_name, safari_site_origin, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### Edit an app
Server REST API put/apps/:id (Update an app)

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var userAuthKey = 'YOUR_USER_AUTH_KEY';
var app_id = 'YOUR_APP_ID'
var name,
	apns_env,
	apns_p2,
	gcm_key;
onesignal_client.apps.create(userAuthKey, app_id, name, apns_p12, apns_env, gcm_key, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

### Players

#### View all
Server REST API get/players (View devices)

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var appAuthKey = 'YOUR_APP_AUTH_KEY';
var params = {
	app_id: 'YOUR_APP_ID'	
};
onesignal_client.players.viewall(appAuthKey, params, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### View a player
Server REST API get/players/:id (View device)

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

onesignal_client.players.view(player_id, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### Create a player
Server REST API post/players (Add a device)

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var params = {
	app_id: 'YOUR_APP_ID',
	device_type: 'ONESIGNAL_DEVICE_TYPE'
};
onesignal_client.players.create(params, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### Edit a player
Server REST API put/players/:id (Edit device)
Edit an existing device in OneSignal.

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var player_id = 'YOUR_ONESIGNAL_PLAYER_ID';
var params = {};
onesignal_client.players.edit(player_id, params, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### On Session
Server REST API post/players/:id/on_session
Call on new device session in your app

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var player_id = 'YOUR_ONESIGNAL_PLAYER_ID';
var params = {};
onesignal_client.players.on_session(player_id, params, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### On Purchase
Server REST API post/players/:id/on_purchase
Track a new purchase

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var player_id = 'YOUR_ONESIGNAL_PLAYER_ID';
var params = {
	purchases: [{
		sku: 'SKU',
		amount: '10.00',
		'iso': 'EUR'
	}]
};
onesignal_client.players.on_purchase(player_id, params, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### On Focus
Server REST API post/players/:id/on_focus
Increment the device's total session length

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var player_id = 'YOUR_ONESIGNAL_PLAYER_ID';
var params = {
	state: 'ping',
	active_time: 60
};
onesignal_client.players.on_focus(player_id, params, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### CSV Export
Server REST API post/players/csv_export

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var appAuthKey = 'YOUR_APP_AUTH_KEY';
var app_id = 'YOUR_APP_ID';

onesignal_client.players.csv_export(appAuthKey, app_id, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

### Notifications

#### View all
Server REST API get/notifications (View notifications)

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var appAuthKey = 'YOUR_APP_AUTH_KEY';
var app_id = 'YOUR_APP_ID';
var limit = 50;
var offset = 0;
onesignal_client.notifications.viewall(appAuthKey, app_id, limit, offset, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### View a notification
Server REST API get/notifications/:id (View notification)
View the details of a notification

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var appAuthKey = 'YOUR_APP_AUTH_KEY';
var notification_id = 'YOUR_ONESIGNAL_NOTIFICATION_ID';
var app_id = 'YOUR_APP_ID';
onesignal_client.notifications.view(appAuthKey, notification_id, app_id, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### Track a notification
Server REST API put/notifications/:id (Track open)

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var notification_id = 'YOUR_ONESIGNAL_NOTIFICATION_ID';
var app_id = 'YOUR_APP_ID';
var opened = true;
onesignal_client.notifications.track(notification_id, app_id, opened, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### Create a notification
Server REST API post/notifications (Create Notification)

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var restApiKey = 'YOUR_APP_REST_API_KEY';
var params = {
	app_id: 'YOUR_APP_ID',
	contents: {
		'en': 'Notification body',
		'es': 'Cuerpo de la notificación'
	},
	tags: [{ "key": "custom_tag", "relation": "=", "value": "custom_value"}]
};
onesignal_client.notifications.create(restApiKey, params, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

#### Delete a notification
Server REST API delete/notifications/:id (Cancel notification)
Stop a scheduled or currently outgoing notification.

``` js
var onesignal = require('./lib/client');
var onesignal_client = onesignal.createClient();

var appAuthKey = 'YOUR_APP_AUTH_KEY';
var notification_id = 'YOUR_ONESIGNAL_NOTIFICATION_ID';
var app_id = 'YOUR_APP_ID';
onesignal_client.notifications.delete(appAuthKey, notification_id, app_id, function (err, response) {
	if (err) {
    	console.log('Encountered error', err);
  	} else {
    	console.log(response);
  	}
});
```

## License

This library is licensed under MIT. Full license text is available in [LICENSE][license].

## Contributing

See [CONTRIBUTING][contributing].

[onesignal-api-doc]: https://documentation.onesignal.com/docs/server-api-overview
[bugs]: https://github.com/SeVeNDuS/node-onesignal-api/issues
[node]: http://nodejs.org/
[contributing]: https://github.com/SeVeNDuS/node-onesignal-api/tree/master/CONTRIBUTING.md
[license]: https://github.com/SeVeNDuS/node-onesignal-api/tree/master/LICENSE
[request]: https://github.com/mikeal/request