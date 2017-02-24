'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript on CreateAssignment connected!");
	$('.createTimeline .button').click(getNewAssignment);
	$('.createTimeline .button').click(handleAuthClick);
}

function getNewAssignment(e) {

	//e.preventDefault();

	console.log("detect new assignment");
	var assignmentIndex = $('.createTimeline .button').attr('id');
//	console.log("The assignment index is: " + assignmentIndex);

	var name = document.getElementById("name").value;
    var due_date = document.getElementById("due_date").value;
    var assignment_class = document.getElementById("class").value;
  //  var section_name = document.getElementById("section_name").value;
    //var section_time = document.getElementById("section_time").value;
    
 /*   console.log("name is: " + name);
    console.log("due date is: " + due_date);
    console.log("assignment class: " + assignment_class);
    console.log("section name is: " + section_name);
    console.log("section_time is " + section_time);
*/
   var section_array2=[];
   // var section_array = [{section_name: section_name, section_time: section_time}];

	//$.post('listview/' + assignmentIndex, {id: assignmentIndex, name: name, due_date: due_date, class: assignment_class, sections: [ "1":  [section_name: section_name, section_time: section_time]]}, addAssignment);
    $.post('listview/' + assignmentIndex, {id: assignmentIndex, name: name, due_date: due_date, class: assignment_class, sections: section_array2}, addAssignment);



    /*
	posting.done(function(data) {
        var content = $(data).find('.testingfoo');
        $(".testingfoo").append("helo");
    });
*/

    //$.get("listview/0", addAssignment);
    //$.get("createAssignment", addAssignment);
}

function addAssignment(result) {
	console.log("foo:");

}

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

/*
function getName(index) {
	var year = $('.calnav-year').text();
	console.log("the year is: " + year);
	if (index === -1) {
		console.log("It is December");
		year = year - 1;
		$('.calnav-year').text(year);
		return "December";
	}
	else if (index === 0) {
		console.log("It is January");
		return "January";
	}
	else if (index === 1) {
		console.log("It is February");
		return "February";
	}
	else if (index === 2) {
		console.log("It is March");
		return "March";
	}
	else if (index === 3) {
		console.log("It is April");
		return "April";
	}
	else if (index === 4) {
		console.log("It is May");
		return "May";
	}
	else if (index === 5) {
		console.log("It is June");
		return "June";
	}
	else if (index === 6) {
		console.log("It is July");
		return "July";
	}
	else if (index === 7) {
		console.log("It is August");
		return "August";
	}
	else if (index === 8) {
		console.log("It is September");
		return "September";
	}
	else if (index === 9) {
		console.log("It is October");
		return "October";
	}
	else if (index === 10) {
		console.log("It is November");
		return "November";
	}
	else if (index === 11) {
		console.log("It is December");
		return "December";
	}
	else if (index === 12) {
		console.log("It is January");
		year = +year+1; //act like an integer
		$('.calnav-year').text(year);
		return "January";
	}
}

function getNewName(index) {

	console.log("Receiving change: " + index);

	var currIndex = getIndex();

	console.log("Current Month Index is: " + currIndex);
	var newIndex = currIndex + index;

	console.log("New Month Index is: " + newIndex);
	var theNewName = getName(newIndex);

	console.log("New Name Month is: " + theNewName);
	return theNewName;

}
*/
