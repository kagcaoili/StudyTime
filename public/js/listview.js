

var CLIENT_ID = '109310418708-u9pbu42qpmbke340qscbs9e69jcbhns6.apps.googleusercontent.com';
// var CLIENT_ID = '9b419356804c88acf0b53d4b5dde50750182c269';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
  console.log("running");
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
    //gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    //updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    //handleAuthClick();
    insertEvent();
  });
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    insertEvent();
  } else {
  }
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

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

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
      }
    } 
  });
}




var newEvent = {
  'summary': 'HELLO WORLD',
  'start': {
    'dateTime': '2017-03-03T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2017-03-03T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  }
};

function insertEvent() {
  
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'sk3u2tr3dhradfgd7t4j4ie690@group.calendar.google.com',
    'resource': newEvent
  });

  request.execute(function(event) {
  });

}

/*This one save only the first checkbox*/
function save(){
  var checkbox = document.getElementById('stepsCheckboxes');
  localStorage.setItem('stepsCheckboxes', checkbox.checked);
}

function load(){
  var checked = JSON.parse(localStorage.getItem('stepsCheckboxes'));
  document.getElementById("stepsCheckboxes").checked = checked;
}

load();

/*function save(){
    var checkbox = document.getElementById('stepsCheckboxes');
    if(document.getElementById('stepsCheckboxes').checked) {
        localStorage.setItem('stepsCheckboxes', true);
    }
}

function load(){    
    var checked = localStorage.getItem('stepsCheckboxes');
    if (checked == "true") {
        document.getElementById("stepsCheckboxes").setAttribute('checked','checked');
    }
}
function wis(){
    location.reload();
    localStorage.clear()

}

load();*/
