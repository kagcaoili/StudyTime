var data = require('../data.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
  var id = req.params.id;
  //res.render('calendarView', data.assignments[id]);
  //console.log(data.assignments[id]);

  var specificAssignment = data.assignments[id];

  var calendarName = specificAssignment.class;
  //var calendarID = data.calendarInfo[0][calendarName].calendarid;
  //console.log("the id for calendar: " + calendarName + " is: " + calendarID);

  //console.log("the section first is: " + specificAssignment.section_array);

  //var calendarID = data.calendarInfo[specificAssignment.class].calendarid;
  //console.log("the id for calendar: " + specificAssignment.class + " is: " + calendarID);

  res.render('calendarView', {
  	'id': specificAssignment.id,
  	'name': specificAssignment.name,
  	'sections': specificAssignment.sections//,
  	//'calendarid': calendarID
  });
};