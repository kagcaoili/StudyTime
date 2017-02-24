

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
    //authorizeButton.onclick = handleAuthClick;
    //signoutButton.onclick = handleSignoutClick;
    handleAuthClick();
  });
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    //listUpcomingEvents();
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
  'summary': 'Prototype Event',
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
  
  /*
  var sectionnames = [];
  $("#Assignment1").each(function(){ sectionnames.push($("#Assignment1").text()); });
  //appendPre("section names: " + sectionnames[0]);
  //appendPre("section names 1: " + $("#Assignment1").text());
  appendPre("section names 2: " + $("#Assignment1")[0].text());
  */


  var request = gapi.client.calendar.events.insert({
    'calendarId': 'sk3u2tr3dhradfgd7t4j4ie690@group.calendar.google.com',
    'resource': newEvent
  });

  request.execute(function(event) {
    appendPre('Event Created: ' + event.htmlLink);
    appendPre('Event is: ' + event.summary);
  });

  appendPre("Currently Inserting");
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