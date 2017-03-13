var data = require('../data.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
  var id = req.params.id;

  var specificAssignment = data.assignments[id];

  var calendarName = specificAssignment.name;
  console.log("calendar name is: " + calendarName);

  console.log("the information in calendar info is: ");
  console.log(data.calendarInfo);

  var calendarID = data.calendarInfo[0][calendarName][0].calendarid;
  console.log("the id for calendar: " + calendarName + " is: " + calendarID);


  res.render('calendarView', {
  	'id': specificAssignment.id,
  	'name': specificAssignment.name,
  	'sections': specificAssignment.sections,
  	'calendarid': calendarID
  });
};