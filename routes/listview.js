var data = require('../data.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
  var idex = req.params.id;
/*
  console.log("body id: " + req.body.id);
  console.log("body name: " + req.body.name);
  console.log("body due date: " + req.body.due_date);
  console.log("body class: " + req.body.class);
  console.log("body sections: " + req.body.sections);
  console.log("body 1sectionname: " + req.body.sections[0].section_name);
  console.log("body 1sectionname: " + req.body.sections[0].section_time);
*/
  //res.render('listview', data.assignments[idex]);
  //res.render('listview', req.body);

  var id = req.body.id;
  var name = req.body.name;
  var due_date = req.body.due_date;
  var class_name = req.body.class;
  var sections = req.body.sections;

  var section_array = dateDifferences(due_date);
  //var sectionDates = splitDates(due_date, totalDays);

  var newAssignment = {
    "id": id,
    "name": name,
    "due_date": due_date,
    "class": class_name,
    "sections": section_array
  }


  console.log("BEFORE: " + data.assignments[0].name);
  //data['assignments'].push({"id":req.body.id,"name":req.body.name,"due_date":req.body.due_date, "class":req.body.class, "sections":req.body.sections});
  data.assignments.push(newAssignment);
  console.log("AFTER: " + data.assignments[2].name);

  res.render('listview', {
    'id': id,
    'name': name,
    "due_date": due_date,
    "class": class_name,
    'section_name': section_array
  });
};

exports.defaultAssignment = function (req, res) {
	console.log("rendering default assignment");
	var idex = req.params.id;

	/*
	console.log("dbody id: " + req.body.id);
  console.log("dbody name: " + req.body.name);
  console.log("dbody due date: " + req.body.due_date);
  console.log("dbody section name: " + req.body.section_name);
  */


	console.log("dthe id is: " + idex);
	res.render('listview', data.assignments[idex]);
}

//exports.dateDifferences = function (req, res) {
function dateDifferences(due_date) {
  console.log("in dateDifferences funciton");
  //store number of days in all months from Jan-Dec
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var today = new Date();
  var todayDay = today.getDate();
  if (todayDay < 10)
    todayDay = "0" + todayDay;

  var todayMonth = today.getMonth()+1;
  if (todayMonth < 10)
    todayMonth = "0" + todayMonth;

  /* Create a struct for today's date elements */
  var dateToday = {
    day: todayDay,
    month: todayMonth,
    year: today.getFullYear()
  }
  console.log("todays day: " + dateToday.day);
  console.log("todays month: " + dateToday.month);
  console.log("todays year: " + dateToday.year);
  //get due date from data.json and split elements
  due = due_date;
  var dateElements = due.split('/');

  /* Create a struct for due date's elements */
  var dueDate = {
    day: dateElements[1],
    month: dateElements[0],
    year: dateElements[2]
  }
  
  console.log("due day: " + dueDate.day);
  console.log("due month: " + dueDate.month);
  console.log("due year: " + dueDate.year);


  var dueDays = dateToNumber(dueDate);
  var todayDays = dateToNumber(dateToday);

  var dateDifference = dueDays - todayDays;
  console.log("todayDays is " + todayDays);
  console.log("dueDays is " + dueDays);
  console.log("Dates difference is " + dateDifference);
  var start = todayDays;

  if (dateDifference > 29)
  {
    var sectionDates = Math.floor(dateDifference/4);
    
    var section_array = [{section_name: "Finish 1/4", section_time: "no"}];
  }

  if (dateDifference < 9)
  {
    var sectionDates = Math.floor(dateDifference/2);
    var first = start+sectionDates;
    first = numberToDate(first);
    console.log(first);
    var section_array = [{section_name: "Finish 1/2", section_time: "no"}, {section_name: "Finish Assignment", section_time: "yes"}];
  }

  if (dateDifference > 8 && dateDifference <30)
  {
    var sectionDates = Math.floor(dateDifference/3);
  }
  
  console.log("Section dates are" + sectionDates);
  return section_array;

 // return dateDifference;
 // res.json(dateDifference);
}

function dateToNumber(date) {
  m = (date.month + 9)%12;
  y = date.year - date.month/10;
  return y*365 + y/4 - y/100 + y/400 + (m*306+5)/10 + (date.day - 1);
}

function numberToDate(num) {
  var y = (10000*num + 14780)/3652425;
  var ddd = num - (y*365 + y/4 - y/100 + y/400);
  if (ddd < 0)
  {
    y = y-1;
    ddd = num-(y*365 + y/4 - y/100 +y/400);
  }
  var mi = (52 + 100*ddd)/3060;

  var date = {
    date: ddd - (mi*306 +5)/10+1,
    month: (mi+2)%12+1,
    year: y + (mi +2)/12
  }

  return date;
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