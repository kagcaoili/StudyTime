var data = require('../data.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
  var idex = req.params.id;
  var toBeInserted = (req.params.isNew === "true");
  var isRefreshingListView = false;

  var id = req.body.id;
  var name = req.body.name;
  var due_date = req.body.due_date;
  var class_name = req.body.class;

  //for reading new calendar data
  var dataCalendarInfo;
  if (req.body.dataCalInfo) {
    isRefreshingListView = true;
    dataCalendarInfo = req.body.dataCalInfo;
    console.log("Previous Calendar Info: ");
    console.log(data.calendarInfo);
    console.log("Received New Calendar Info: " + dataCalendarInfo + " has : " + dataCalendarInfo[name].calendarid);
    //data.calendarInfo[0].push(dataCalendarInfo);

    var keyObj = Object.keys(dataCalendarInfo)[0];
    data.calendarInfo[0][keyObj] = [dataCalendarInfo[keyObj]];


    console.log("complete information in calendar info: ");
    console.log(data.calendarInfo);
  } else {
    console.log("no new calendar info");
  }
  var dataAllCalendars;
  if (req.body.dataAllCal) {
    isRefreshingListView = true;
    dataAllCalendars = req.body.dataAllCal;
    console.log("Previous All Calendar: ");
    console.log(data.allCalendar[0].calendars);
    console.log("Received New All Calendar: " + dataAllCalendars + " has: " + dataAllCalendars[name]);
    (data.allCalendar[0].calendars).push(dataAllCalendars);
    console.log("complete information in all calendar: ");
    console.log(data.allCalendar[0].calendars);
  } else {
    console.log("no new all calendar");
  }
  
  //don't push to section arrays or into assignment if we are refreshing after pushing data into the calendar JSON arrays
  if (!isRefreshingListView) {
    var sections = data.sectionsInfo;

    if (sections.length == 0)
    {
      var section_array = autosplitSections(due_date);
    }

    else {


    var today = new Date();
    var todayDay = today.getDate();
    if (todayDay < 10)
      todayDay = "0" + todayDay;

    var todayMonth = today.getMonth()+1;
    if (todayMonth < 10)
      todayMonth = "0" + todayMonth;

    var dateToday = {
      day: parseInt(todayDay),
      month: parseInt(todayMonth),
      year: parseInt(today.getFullYear())
    }

    var todayDays = dateToNumber(dateToday);
    /*console.log("today Days: "+todayDays);


      console.log("sections: "+ sections);
      console.log("section name: " + sections[0].section_name);
      console.log(data.sectionsInfo);
  */
      var dateDif = dateDifference(due_date);
      //console.log("Date difference: " + dateDif);
      var num = 0;
      for (i = 0; i < sections.length; i++) {
         num++;
      }
     // console.log("number sections: " + num);
      var sectionDates = Math.floor(dateDif/num);
      var section_array = [];
      var section;
      var sectionNum = todayDays;
      var sectionDate;
      for (j = 0; j < sections.length - 1; j++) {
        sectionNum = sectionNum + sectionDates;
        section = numberToDate(sectionNum);

        section_array.push({section_name: sections[j].section_name, section_time: section});
   /*     console.log(section_array);
        console.log("length: "+section_array.length);
        console.log("first name: " + section_array[0].section_name);
        console.log("first time: " + section_array[0].section_time);
        */
      }
      section_array.push({section_name: sections[j].section_name, section_time: due_date});


      data.sectionsInfo = [];

    }

    var newAssignment = {
      "id": id,
      "name": name,
      "due_date": due_date,
      "class": class_name,
      "sections": section_array
    }

    data.assignments.push(newAssignment);
  }
  

  res.render('listview', {
    'id': id,
    'name': name,
    "due_date": due_date,
    "class": class_name,
    'section_name': section_array,
    'isnew' : toBeInserted,
    //'listOfCalKeys' : keys,
    //'listOfCalValues' : array,
    'dataAllCalendars': data.allCalendar[0].calendars,
    'dataCalendarInfo': data.calendarInfo[0]
  });
};

exports.defaultAssignment = function (req, res) {
  //var isNew = 0;
  var toBeInserted = (req.params.isNew === "true") ;
	var idex = req.params.id;
  

  var id = data.assignments[idex].id;
  var name = data.assignments[idex].name;
  var due_date = data.assignments[idex].due_date;
  var class_name = data.assignments[idex].class;
  var section_array = data.assignments[idex].sections;

  //res.render( 'listview', data.assignments[idex]);

  /*
  var keys = Object.keys(data.allCalendar[0].calendars);
  var array = [];
  for (var i = 0; i < keys.length; i++) {
    array.push(data.allCalendar[0].calendars[keys[i]]);
  }*/

	res.render('listview', {
    //'data': data.assignments[idex],
    'id': id,
    'name': name,
    "due_date": due_date,
    "class": class_name,
    'sections': section_array,
    'isnew' : toBeInserted,
    //'listOfCalKeys' : keys,
    //'listOfCalValues' : array,
    'dataAllCalendars': data.allCalendar[0].calendars,
    'dataCalendarInfo': data.calendarInfo[0]
  });

};

//exports.dateDifferences = function (req, res) {
function autosplitSections(due_date) {

  var today = new Date();
  var todayDay = today.getDate();
  if (todayDay < 10)
    todayDay = "0" + todayDay;

  var todayMonth = today.getMonth()+1;
  if (todayMonth < 10)
    todayMonth = "0" + todayMonth;

  /* Create a struct for today's date elements */
  var dateToday = {
    day: parseInt(todayDay),
    month: parseInt(todayMonth),
    year: parseInt(today.getFullYear())
  }
/*  console.log("todays day: " + dateToday.day);
  console.log("todays month: " + dateToday.month);
  console.log("todays year: " + dateToday.year);
*/
  //get due date from data.json and split elements
  due = due_date;
  var dateElements = due.split('/');

  /* Create a struct for due date's elements */
  var dueDate = {
    day: parseInt(dateElements[1]),
    month: parseInt(dateElements[0]),
    year: parseInt(dateElements[2])
  }
/*
  console.log("due day: " + dueDate.day);
  console.log("due month: " + dueDate.month);
  console.log("due year: " + dueDate.year);
*/

  var dueDays = dateToNumber(dueDate);
  var todayDays = dateToNumber(dateToday);

  var dateDifference = dueDays - todayDays;
/*  console.log("dueDays is " + dueDays);
  console.log("todayDays is " + todayDays);
  console.log("Dates difference is " + dateDifference);
*/
  var start = todayDays;


  if (dateDifference > 29)
  {
    //console.log("over a month section");
    var sectionDates = Math.floor(dateDifference/4);

    var firstNum = start+sectionDates;
    var first = numberToDate(firstNum);
    var secondNum = firstNum+sectionDates;
    var second = numberToDate(secondNum);
    var thirdNum = secondNum+sectionDates;
    var third = numberToDate(thirdNum);

    var section_array = [{section_name: "Finish 1/4", section_time: first}, {section_name: "Finish 1/2", section_time: second}, {section_name: "Finish 3/4", section_time: third}, {section_name: "Finish Assignment", section_time: due_date}];
  }

  if (dateDifference < 9)
  {
    var sectionDates = Math.floor(dateDifference/2);
    var first = start+sectionDates;
    first = numberToDate(first);
    var section_array = [{section_name: "Finish 1/2", section_time: first}, {section_name: "Finish Assignment", section_time: due_date}];
  }

  if (dateDifference > 8 && dateDifference <30)
  {
    //console.log("middle section");
    var sectionDates = Math.floor(dateDifference/3);

    var firstNum = start+sectionDates;
    var first = numberToDate(firstNum);
    var secondNum = firstNum+sectionDates;
    var second = numberToDate(secondNum);

    var section_array = [{section_name: "Finish 1/3", section_time: first}, {section_name: "Finish 2/3", section_time: second}, {section_name: "Finish Assignment", section_time: due_date}];
  }
  
  //console.log("Section dates are: " + sectionDates);
  return section_array;

 // return dateDifference;
 // res.json(dateDifference);
}

/* Pass in date struct to convert to number version */
function dateToNumber(date) {
  //date.month = parseInt(date.month);
  //console.log("date.month: " + date.month);
  //var merp =date.month+9;
  //console.log("date.month+9: " + merp);
  //console.log("date.month: " + date.month);
  m = ((date.month + 9)%12);
  //console.log("m: " + m);
  //console.log("date.year: " + date.year);
  y = (date.year - Math.round(m/10));
  //console.log("y: " + y);
  return Math.ceil(y*365 + y/4 - y/100 + y/400 + (m*306+5)/10 + (date.day - 1));
}

/* Pass in number of days to convert to date */
function numberToDate(d) {
  var y = Math.floor((10000*d + 14780)/3652425);
  var ddd = d - (y*365 + y/4 - y/100 + y/400);
  if (ddd < 0)
  {
    y = y-1;
    ddd = d-(y*365 + y/4 - y/100 +y/400);
  }
  var mi = Math.floor((52 + 100*ddd)/3060);

  var date = {
    date: Math.floor(ddd - (mi*306 +5)/10+1),
    month: Math.floor((mi+2)%12+1),
    year: Math.floor(y + (mi +2)/12)
  }

  if (date.date < 10)
  {
    date.date = "0" + date.date;
  }

  if (date.month < 10)
  {
    date.month = "0" + date.month;
  }

  var fullDate = date.month + "/" + date.date + "/" + date.year;

  return fullDate;
}

function dateDifference(due_date) {
  var today = new Date();
  var todayDay = today.getDate();
  if (todayDay < 10)
    todayDay = "0" + todayDay;

  var todayMonth = today.getMonth()+1;
  if (todayMonth < 10)
    todayMonth = "0" + todayMonth;

  /* Create a struct for today's date elements */
  var dateToday = {
    day: parseInt(todayDay),
    month: parseInt(todayMonth),
    year: parseInt(today.getFullYear())
  }

  due = due_date;
  var dateElements = due.split('/');

  /* Create a struct for due date's elements */
  var dueDate = {
    day: parseInt(dateElements[1]),
    month: parseInt(dateElements[0]),
    year: parseInt(dateElements[2])
  }

  var dueDays = dateToNumber(dueDate);
  var todayDays = dateToNumber(dateToday);

  var dateDifference = dueDays - todayDays;

  return dateDifference;
}




/*
//exports.splitDate = function(req, res) {
function splitDate(due_date, dates) {
//  var datesDif = dateDifference(date);

  if (dates > 29)
    var sectionDates = Math.floor(datesDif/4);
    var date1 = due_date
    var section_array = [{section_name: "Finish 1/4", section_time: section_time}];

  else if (dates < 9)
    var sectionDates = Math.floor(datesDif/2);

  else
    var sectionDates = Math.floor(datesDif/3);
  
  return 
  //res.json(splitDate);
}  
*/


  /* Count total number of days before current date*/
/*
  //initialize count using years and day
  n1 = dateToday.year*365 + dateToday.day;
  //add days for months in given date
  for (i=0; i<dateToday.month - 1; i++)
    n1 += monthDays[i];
*/
  /* Now count total number for days before due date */
/*
  n2 = dueDate.year*365 + dueDate.day;
  for (j=0; j<dueDate.month-1; j++)
    n2 += monthDays[j];

  var dateDifference = n2 - n1;
*/
/*
  var m = (dateToday.month + 9) % 12;
  var y = dateToday.year - (dateToday.month/12);
  var todayDays = 365*y + y/4 - y/100 + y/400 + (m*306 + 5)/10 + (dateToday.day - 1);

  var dueM = (dueDate.month + 9) % 12;
  var dueY = dueDate.year - (dueDate.month/12);
  var dueDays = 365*dueY + dueY/4 - dueY/100 + dueY/400 + (dueM*306 +5)/10 + (dueDate.day - 1);
*/