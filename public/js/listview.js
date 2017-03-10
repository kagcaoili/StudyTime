

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




/*
var newEvent = {
  'summary': 'HELLO WORLD',
  'start': {
    'dateTime': '2017-03-08T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2017-03-08T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  }
};
*/
/*
var newEvent = {
  'summary': 'HELLO WORLD',
  'start': {
    'dateTime': '2017-03-08T13:00:00-07:00',
  },
  'end': {
    'dateTime': '2017-03-08T15:00:00-07:00',
  }
}; */

function listViewReload(res) {
  console.log("Calling Post and Reload");
}

function insertEvent() {
  

  var summary = $("#GETTHISNAME").text();
  var dueDate = $("#specificDueDate").text();
  var assignmentClass = $("#specificClass").text();
  //removejicforposting to json var sections = $("#specificSections").text();

  var dueDateArrays = dueDate.split("/");
  var month = dueDateArrays[0];
  var day = dueDateArrays[1];
  var year = dueDateArrays[2];

  var startDate = year + "-" + month +"-" + day + "T13:00:00-07:00";
  var endDate = year + "-" + month +"-" + day + "T15:00:00-07:00";

  var newEvent = {
    'summary': summary,
    'start': {
      'dateTime': startDate,
    },
    'end': {
      'dateTime': endDate,
    }
  };

  //Get list of calendar IDs
  var calendarList = $(".calendarIDList").text();
  console.log("calendarlist in js is: " + calendarList);

  var calendarArray = calendarList.split(",");

  var isNewCalendar = true;
  var calIndex; //for getting the key if needed

  for (var i = 0; i < calendarArray.length; i++) {
    if (summary === calendarArray[i]) {
      console.log(summary + " is equal to " + calendarArray[i]);
      isNewCalendar = false;
      calIndex = i;
    } else {
      console.log(summary + " is not equal to " + calendarArray[i]);
    }
  }

  var insertionCalendarID;

  if (isNewCalendar) {
    //make a new calendar
    console.log("Making new calendar");
    var newCalendarEvent = {
      'summary': summary,
      'timeZone': 'America/Los_Angeles'
    };
    var calRequest = gapi.client.calendar.calendars.insert({
    'resource': newCalendarEvent
    });
    calRequest.execute(function(event) {

      insertionCalendarID = event.id;
      console.log("the insertion id is: " + insertionCalendarID);

var request = gapi.client.calendar.events.insert({
    'calendarId': insertionCalendarID,
    'resource': newEvent
      });

      request.execute(function(event) {
      });

  //inserting all the sections
  var sectionsList = $(".sectionsToInsert").text();
  console.log("sectionsList to split apart!: " + sectionsList);


  var listNames = $(".sectionNameInsert").text();
  var listTimes = $(".sectionTimeInsert").text();
  console.log("list name: " + listNames);
  console.log("list times: " + listTimes);
  var sectionNameArray = listNames.split(",");
  var sectionTimeArray = listTimes.split(",");
  for (var k = 0; k < sectionNameArray.length-1; k++) {
    console.log(sectionNameArray[k]);
    console.log(sectionTimeArray[k]);

    var tempName = sectionNameArray[k];
    var tempTime = sectionTimeArray[k];

    var sectionDateArray = tempTime.split("/");
    var sectionmonth = sectionDateArray[0];
    var sectionday = sectionDateArray[1];
    var sectionyear = sectionDateArray[2];

    var sectionstartDate = sectionyear + "-" + sectionmonth +"-" + sectionday + "T13:00:00-07:00";
    var sectionendDate = sectionyear + "-" + sectionmonth +"-" + sectionday + "T15:00:00-07:00";

    console.log("sectionstart: " + sectionstartDate);
    console.log("sectionend:" + sectionendDate);

    var newSection = {
      'summary': tempName,
      'start': {
        'dateTime': sectionstartDate,
      },
      'end': {
        'dateTime': sectionendDate,
      }
    };

    var sectionrequest = gapi.client.calendar.events.insert({
    'calendarId': insertionCalendarID,
    'resource': newSection
    });

    sectionrequest.execute(function(event) {
    });

  }












      
      //attempt to push to the JSON allCalendar and calendarInfo data failed
      /*

      console.log("readin new calendar id: " + event.id);
      insertionCalendarID = event.id;
      console.log("the insertion id is: " + insertionCalendarID);

      var assignmentIndex = $(".assignmentID").text();
      var dataAllCalendars = $(".dataAllCalendars").text();
      var dataCalendarInfo = $(".dataCalendarInfo").text();
      var sectionsArray = $(".assignmentSections").text();
      console.log("the data in listview js  all calendars is: " + dataAllCalendars);
      console.log("the data in listview js  calendar info is: " + dataCalendarInfo);
      console.log("assignment sections is: " + sectionsArray);

      console.log("the insertion id is: " + insertionCalendarID);

      var allCalendarPush = {
        summary: insertionCalendarID
      };
      console.log("all calendar push: " + allCalendarPush.summary);
      var calendarInfoPush = {
        summary: {
          'calendarid': insertionCalendarID
        }
      };
      console.log("calendarinfo push: " + calendarInfoPush.summary.calendarid); 
      $.post('../../listview/' + assignmentIndex + '/true', {id: assignmentIndex, name: summary, due_date: dueDate, class: assignmentClass, sections: sectionsArray, dataAllCal: allCalendarPush, dataCalInfo: calendarInfoPush}, listViewReload);
      */
    });

        
  } else {
    console.log("Getting old calendar");
    var valueList = $(".calendarValueList").text();
    console.log("calendarlist in js is: " + valueList);

    var valueArray = valueList.split(",");
    console.log("the key for this calendar is: " + valueArray[calIndex]);
    insertionCalendarID = valueArray[calIndex];

    console.log("the insertion id is: " + insertionCalendarID);

  var request = gapi.client.calendar.events.insert({
    'calendarId': insertionCalendarID,
    'resource': newEvent
      });

      request.execute(function(event) {
      });

  //inserting all the sections
  var sectionsList = $(".sectionsToInsert").text();
  console.log("sectionsList to split apart!: " + sectionsList);


  var listNames = $(".sectionNameInsert").text();
  var listTimes = $(".sectionTimeInsert").text();
  console.log("list name: " + listNames);
  console.log("list times: " + listTimes);
  var sectionNameArray = listNames.split(",");
  var sectionTimeArray = listTimes.split(",");
  for (var k = 0; k < sectionNameArray.length-1; k++) {
    console.log(sectionNameArray[k]);
    console.log(sectionTimeArray[k]);

    var tempName = sectionNameArray[k];
    var tempTime = sectionTimeArray[k];

    var sectionDateArray = tempTime.split("/");
    var sectionmonth = sectionDateArray[0];
    var sectionday = sectionDateArray[1];
    var sectionyear = sectionDateArray[2];

    var sectionstartDate = sectionyear + "-" + sectionmonth +"-" + sectionday + "T13:00:00-07:00";
    var sectionendDate = sectionyear + "-" + sectionmonth +"-" + sectionday + "T15:00:00-07:00";

    console.log("sectionstart: " + sectionstartDate);
    console.log("sectionend:" + sectionendDate);

    var newSection = {
      'summary': tempName,
      'start': {
        'dateTime': sectionstartDate,
      },
      'end': {
        'dateTime': sectionendDate,
      }
    };

    var sectionrequest = gapi.client.calendar.events.insert({
    'calendarId': insertionCalendarID,
    'resource': newSection
    });

    sectionrequest.execute(function(event) {
    });

  }
  }

  /*
  console.log("22the insertion id is: " + insertionCalendarID);
  var request = gapi.client.calendar.events.insert({
    'calendarId': insertionCalendarID,
    'resource': newEvent
      });

      request.execute(function(event) {
      });

  //inserting all the sections
  var sectionsList = $(".sectionsToInsert").text();
  console.log("sectionsList to split apart!: " + sectionsList);


  var listNames = $(".sectionNameInsert").text();
  var listTimes = $(".sectionTimeInsert").text();
  console.log("list name: " + listNames);
  console.log("list times: " + listTimes);
  var sectionNameArray = listNames.split(",");
  var sectionTimeArray = listTimes.split(",");
  for (var k = 0; k < sectionNameArray.length-1; k++) {
    console.log(sectionNameArray[k]);
    console.log(sectionTimeArray[k]);

    var tempName = sectionNameArray[k];
    var tempTime = sectionTimeArray[k];

    var sectionDateArray = tempTime.split("/");
    var sectionmonth = sectionDateArray[0];
    var sectionday = sectionDateArray[1];
    var sectionyear = sectionDateArray[2];

    var sectionstartDate = sectionyear + "-" + sectionmonth +"-" + sectionday + "T13:00:00-07:00";
    var sectionendDate = sectionyear + "-" + sectionmonth +"-" + sectionday + "T15:00:00-07:00";

    console.log("sectionstart: " + sectionstartDate);
    console.log("sectionend:" + sectionendDate);

    var newSection = {
      'summary': tempName,
      'start': {
        'dateTime': sectionstartDate,
      },
      'end': {
        'dateTime': sectionendDate,
      }
    };

    var sectionrequest = gapi.client.calendar.events.insert({
    'calendarId': insertionCalendarID,
    'resource': newSection
    });

    sectionrequest.execute(function(event) {
    });

  }
  */




}

$(document).ready(function() {
/*This one save only the first checkbox*/
function save(){
  $('.stepsCheckboxes').each(function(index) {
    console.log(index);

    var checkbox = document.getElementById($('.stepsCheckboxes').get(index).id);
    localStorage.setItem($('.stepsCheckboxes').get(index).id, checkbox.checked);
  });
}
$("#SaveSubmitButton").click(save);

function load(){
  $('.stepsCheckboxes').each(function(index) {
  var checked = JSON.parse(localStorage.getItem($('.stepsCheckboxes').get(index).id));
  console.log(index);
  console.log($('.stepsCheckboxes').get(index).id);
  console.log(document.getElementById($('.stepsCheckboxes').get(index).id))
  document.getElementById($('.stepsCheckboxes').get(index).id).checked = checked;
  });
}




load();

});



