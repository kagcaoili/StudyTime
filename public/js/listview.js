

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
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    //handleAuthClick();
    //insertEvent();
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
  
  console.log("Inserting a New Event");

  var summary = $("#GETTHISNAME").text(); //get the name of the assignment
  var dueDate = $("#specificDueDate").text(); //get the due date of the assignment
  var assignmentClass = $("#specificClass").text(); //get the name of the class the assignment is for
  //removejicforposting to json var sections = $("#specificSections").text();

  //retrieve the month, day, and year specifically for organizing the date into proper order
  var dueDateArrays = dueDate.split("/");
  var month = dueDateArrays[0];
  var day = dueDateArrays[1];
  var year = dueDateArrays[2];

  //set the variable to be year-month-day
  var startDate = year + "-" + month +"-" + day + "T13:00:00-07:00";
  var endDate = year + "-" + month +"-" + day + "T15:00:00-07:00";

  //make the event that will be inserted
  var newEvent = {
    'summary': summary,
    'start': {
      'dateTime': startDate,
    },
    'end': {
      'dateTime': endDate,
    }
  };

  var isNewCalendar = true;

  /*
  //Get list of calendar IDs
  var calendarList = $(".calendarIDList").text();
  console.log("calendarlist in js is: " + calendarList);

  //set it into an array so that it can be accessed individually
  var calendarArray = calendarList.split(",");

  var isNewCalendar = true; //detects whether the calendar is a previous calendar of it we need to make a new one
  var calIndex; //for getting the key if needed

  //loops through the array of calendars and checks if there is an existing calendar of the event
  for (var i = 0; i < calendarArray.length; i++) {
    if (summary === calendarArray[i]) {
      console.log(summary + " is equal to " + calendarArray[i]);
      isNewCalendar = false;
      calIndex = i;
    } else {
      console.log(summary + " is not equal to " + calendarArray[i]);
    }
  }
  */
  
  //begin checking if we need to make a new calendar
  var insertionCalendarID;

  if (isNewCalendar) { //if we need to make a new calendar
    console.log("Making new calendar");

    //created a new calendar event 
    var newCalendarEvent = {
      'summary': summary,
      'timeZone': 'America/Los_Angeles'
    };

    //insert the calendar
    var calRequest = gapi.client.calendar.calendars.insert({
    'resource': newCalendarEvent
    });

    calRequest.execute(function(event) { //execute the actual request for a new calendar

      insertionCalendarID = event.id; //save the insertionCalendarID
      console.log("the insertion id is: " + insertionCalendarID);

      //insert the new event into this calendar
      var request = gapi.client.calendar.events.insert({
        'calendarId': insertionCalendarID,
        'resource': newEvent
      });

      request.execute(function(event) { //executes the event insertion
      });

      //inserting all the sections belonging to the event
      var sectionsList = $(".sectionsToInsert").text();
      console.log("sectionsList to split apart!: " + sectionsList);

      //gets a list of the names and times for each section
      var listNames = $(".sectionNameInsert").text();
      var listTimes = $(".sectionTimeInsert").text();
      console.log("list name: " + listNames);
      console.log("list times: " + listTimes);

      //turns the list of names and times into array for each section
      var sectionNameArray = listNames.split(",");
      var sectionTimeArray = listTimes.split(",");

      //iterate through the array of sections, minus the blank name after the last comma
      for (var k = 0; k < sectionNameArray.length-1; k++) {
        console.log(sectionNameArray[k]);
        console.log(sectionTimeArray[k]);

        //retrieve the name of the section in this iteration
        var tempName = sectionNameArray[k];
        var tempTime = sectionTimeArray[k];

        //turn the date that the section is due into month, date, year for insertion
        var sectionDateArray = tempTime.split("/");
        var sectionmonth = sectionDateArray[0];
        var sectionday = sectionDateArray[1];
        var sectionyear = sectionDateArray[2];

        //save the start date and end date to be inserted with the event
        var sectionstartDate = sectionyear + "-" + sectionmonth +"-" + sectionday + "T13:00:00-07:00";
        var sectionendDate = sectionyear + "-" + sectionmonth +"-" + sectionday + "T15:00:00-07:00";

        console.log("sectionstart: " + sectionstartDate);
        console.log("sectionend:" + sectionendDate);

        //create the newSection variable to hold the details of the section
        var newSection = {
          'summary': tempName,
          'start': {
            'dateTime': sectionstartDate,
          },
          'end': {
            'dateTime': sectionendDate,
          }
        };

        //create the request to insert the section
        var sectionrequest = gapi.client.calendar.events.insert({
          'calendarId': insertionCalendarID,
          'resource': newSection
        });

        //insert the section in the calendar
        sectionrequest.execute(function(event) {
        });

      }

      //FINISHED INSERTING ALL THE SECTIONS INTO THE NEW CALENDAR
      //BEGIN PUSHING NEW DATA TO ALLCALENDAR AND CALENDARINFO JSON      
      console.log("readin new calendar id: " + event.id);
      console.log("the insertion id is: " + insertionCalendarID);

      
      var assignmentIndex = $(".assignmentID").text(); //gets the ID/index of the assignment selected
      //var dataAllCalendars = $(".dataAllCalendars").text(); //gets the data of all the calendars
      //var dataCalendarInfo = $(".dataCalendarInfo").text(); //gets the info of a specific calendar
      var sectionsArray = $(".assignmentSections").text(); //gets a list of sections 
      /*console.log("the data in listview js  all calendars is: " + dataAllCalendars);
      console.log("the data in listview js  calendar info is: " + dataCalendarInfo);
      console.log("assignment sections is: " + sectionsArray);

      console.log("the insertion id is: " + insertionCalendarID); */

      //creates the variable to push to the array of all the calendars
      var allCalendarPush = {};
      allCalendarPush[summary] = insertionCalendarID;

      console.log("all calendar push: " + allCalendarPush[summary]);

      //creates the variable to push to the array of calendar info
      var calendarInfoPush = {};
      calendarInfoPush[summary] = {
        'calendarid': insertionCalendarID
      };
      console.log("calendarinfo push: " + calendarInfoPush[summary].calendarid); 

      //post to the listview and add the new calendar information to the JSON
      $.post('../../listview/' + assignmentIndex + '/true', {id: assignmentIndex, name: summary, due_date: dueDate, class: assignmentClass, sections: sectionsArray, dataAllCal: allCalendarPush, dataCalInfo: calendarInfoPush}, listViewReload);
      
    });
    
  } /*else { //it is not a new calendar and you are editing it

    console.log("Getting old calendar");

    var valueList = $(".calendarValueList").text(); //gets the list of values in all calendar
    console.log("calendarlist in js is: " + valueList);

    var valueArray = valueList.split(","); //gets the array by splitting the list
    console.log("the key for this calendar is: " + valueArray[calIndex]);
    insertionCalendarID = valueArray[calIndex]; //gets the actual insertionCalendarID
 
    console.log("the insertion id is: " + insertionCalendarID);

    //prepares to insert into calendar 
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

    //begin inserting all the sections into the calendar
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
  }*/

  //END INSERTION OF EVENT INTO NEW CALENDAR OR OLD CALENDAR

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



