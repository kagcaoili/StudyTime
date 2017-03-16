//get assignment data
var data = require('../data.json');
/*
 * GET home page.
 */

exports.view = function(req, res){
  data["B"] = false;

  var calendarsString = "";

  var lengthOfCalendars = data.allCalendar[0].calendars.length;
  for (var i = 0; i < lengthOfCalendars; i++) {
    var key = Object.keys(data.allCalendar[0].calendars[i]);
    calendarsString = calendarsString + "src=" + data.allCalendar[0].calendars[i][key] + "&color=%23182C57&";
  }

  data["calendarsString"] = calendarsString;

  res.render('mainCalendar', data);

};

exports.viewB = function(req, res) {
	data["B"] = true;

  var calendarsString = "";

  var lengthOfCalendars = data.allCalendar[0].calendars.length;
  for (var i = 0; i < lengthOfCalendars; i++) {
    var key = Object.keys(data.allCalendar[0].calendars[i]);
    calendarsString = calendarsString + "src=" + data.allCalendar[0].calendars[i][key] + "&color=%23182C57&";
  }

  data["calendarsString"] = calendarsString;
  
	res.render('mainCalendar', data);
};