//get assignment data
var data = require('../data.json');
/*
 * GET home page.
 */

exports.view = function(req, res){
  data["B"] = false;

  var calendarsString = "";

  var keys = Object.keys(data.allCalendar[0].calendars);
  for (var i = 0; i < keys.length; i++) {
    //console.log("Class in Calendar: " + data.allCalendar[0].calendars[keys[i]]);
    calendarsString = calendarsString + "src=" + data.allCalendar[0].calendars[keys[i]];
    if (i == 0) {
      calendarsString = calendarsString + "&color=%23182C57&";
    } else {
      calendarsString = calendarsString + "&color=%232F6309&"
    }
  }
  console.log("String is: " + calendarsString);

  data["calendarsString"] = calendarsString;

/*
  //grab all the classes
  var array = [], len;
  for (assignment in data.assignments) {
  	array.push(assignment.className);
  	console.log("Reading: " + assignment.className + " into array.");
  }
  len = array.length;

*/



/*
  var id = data.assignments[idex].id;
  var name = data.assignments[idex].name;
  var due_date = data.assignments[idex].due_date;
  var class_name = data.assignments[idex].class;
  var section_array = data.assignments[idex].sections;*/
  //var calendarList = data.allCalendar[calendars];
  //for (var i = 0; i < calendarList.Length; i++) {
  //	console.log("try: " + calendarList[i]);
  //}

  var dataInfo = data;
/*
for (assignment in data.assignments) {
  	array.push(assignment);
  }
  console.log("calendarList: " + calendarList);
  console.log("datainfo: " + dataInfo);

*/
  res.render('mainCalendar', data);
  /*
  res.render('listview', {
    'id': id,
    'name': name,
    "due_date": due_date,
    "class": class_name,
    'section_name': section_array,
    'isnew' : toBeInserted
  });
  */
};

exports.viewB = function(req, res) {
	data["B"] = true;
	res.render('mainCalendar', data);
};