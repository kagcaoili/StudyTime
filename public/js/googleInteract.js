

var CLIENT_ID = '109310418708-u9pbu42qpmbke340qscbs9e69jcbhns6.apps.googleusercontent.com';
// var CLIENT_ID = '9b419356804c88acf0b53d4b5dde50750182c269';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
		clientId: CLIENT_ID,
		scope: SCOPES
	}).then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		authorizeButton.onclick = handleAuthClick;
		signoutButton.onclick = handleSignoutClick;
	});
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		authorizeButton.style.display = 'none';
		signoutButton.style.display = 'block';
		//listUpcomingEvents();
		insertEvent();
	} else {
		authorizeButton.style.display = 'block';
		signoutButton.style.display = 'none';
	}
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}

/**
* Append a pre element to the body containing the given message
* as its text node. Used to display the results of the API call.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {
	var pre = document.getElementById('content');
	var textContent = document.createTextNode(message + '\n');
	pre.appendChild(textContent);
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents() {
	gapi.client.calendar.events.list({
		'calendarId': 'sk3u2tr3dhradfgd7t4j4ie690@group.calendar.google.com',
		'timeMin': (new Date()).toISOString(),
		'showDeleted': false,
		'singleEvents': true,
		'maxResults': 10,
		'orderBy': 'startTime'
	}).then(function(response) {
		var events = response.result.items;
		appendPre('Upcoming events:');

		if (events.length > 0) {
		for (i = 0; i < events.length; i++) {
		  var event = events[i];
		  var when = event.start.dateTime;
		  if (!when) {
		    when = event.start.date;
		  }
		  appendPre(event.summary + ' (' + when + ')')
		}
		} else {
			appendPre('No upcoming events found.');
		}
	});
}

var newEvent = {
	'summary': 'Google I/O 2015',
	'location': '800 Howard St., San Francisco, CA 94103',
	'description': 'A chance to hear more about Google\'s developer products.',
	'start': {
		'dateTime': '2017-02-25T09:00:00-07:00',
		'timeZone': 'America/Los_Angeles'
	},
	'end': {
		'dateTime': '2017-02-25T17:00:00-07:00',
		'timeZone': 'America/Los_Angeles'
	}
};

function insertEvent() {
	
	var request = gapi.client.calendar.events.insert({
	  'calendarId': 'sk3u2tr3dhradfgd7t4j4ie690@group.calendar.google.com',
	  'resource': newEvent
	});

	request.execute(function(event) {
	  appendPre('Event created: ' + event.htmlLink);
	  appendPre('event is: ' + event.summary);
	});

	appendPre("insereting");
/*
	gapi.client.calendar.events.insert({
      'calendarId': 'sk3u2tr3dhradfgd7t4j4ie690@group.calendar.google.com',
      'resource': newEvent
    }).then(function(response) {
      appendPre("response: " + response);
      var events = response.result.items;
      appendPre("the events is: " + events + "\n");
      appendPre('Upcoming events:');

      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        appendPre('No upcoming events found.');
      }
    }); */
}















// Google api console clientID and apiKey 

/*
var clientId = '109310418708-u9pbu42qpmbke340qscbs9e69jcbhns6.apps.googleusercontent.com';
var apiKey = 'AIzaSyBlKfsXerNxl0ZcyhGVoG7ehv-Hy5p2thc';

// enter the scope of current project (this API must be turned on in the Google console)
var scopes = 'https://www.googleapis.com/auth/calendar';


$(document).ready(function() {
	initializePage();
})

function initializePage() {
	console.log("Javascript connected in google interact!");
	
	//handleClientLoad();
	//checkAuth();
	//makeApiCall();
}

$.getJSON('https://www.googleapis.com/calendar/v3/calendars/sk3u2tr3dhradfgd7t4j4ie690@group.calendar.google.com/events?key=AIzaSyBlKfsXerNxl0ZcyhGVoG7ehv-Hy5p2thc', function(data) {
    console.log("Data: " + data.items[0].summary);
});
*/

/*
// OAuth2 functions
function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
	gapi.client.set
	window.setTimeout(checkAuth, 1);
}

//To authenticate
function checkAuth() {
	gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
}

// This is the resource we will pass while calling api function
var resource = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};

function start() {
	gapi.client.init({
		'apiKey': 'AIzaSyBlKfsXerNxl0ZcyhGVoG7ehv-Hy5p2thc',
		'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
		'clientId': '109310418708-u9pbu42qpmbke340qscbs9e69jcbhns6.apps.googleusercontent.com',
		'scope': 'https://www.googleapis.com/auth/calendar',
	}).then(function() {
		console.log("then insert");
		return gapi.client.calendar.events.insert({
			'calendarId': 'sk3u2tr3dhradfgd7t4j4ie690@group.calendar.google.com', 
			// calendar ID which id of Google Calendar where you are creating events. this can be copied from your Google Calendar user view.
	        "resource": resource 	// above resource will be passed here
		});
	}).then(function(response) {
		console.log("then check response");
		console.log(response.result);
	}, function(reason) {
		console.log('Error');
	});
};

function start2() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': 'AIzaSyBlKfsXerNxl0ZcyhGVoG7ehv-Hy5p2thc',
    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': '109310418708-u9pbu42qpmbke340qscbs9e69jcbhns6.apps.googleusercontent.com',
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.people.people.get({
      resourceName: 'people/me'
    });
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};

function makeApiCall(){
	console.log("making api call");
	
	gapi.client.load('calendar', 'v3', function () { // load the calendar api (version 3)
	    var request = gapi.client.calendar.events.insert
	    ({
	        'calendarId': 'sk3u2tr3dhradfgd7t4j4ie690@group.calendar.google.com', 
			// calendar ID which id of Google Calendar where you are creating events. this can be copied from your Google Calendar user view.
	        "resource": resource 	// above resource will be passed here
	    });                
	});

	//gapi.load('client', start);

}
*/