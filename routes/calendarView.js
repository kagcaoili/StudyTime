var data = require('../data.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
  var id = req.params.id;

  var specificAssignment = data.assignments[id];

  var calendarName = specificAssignment.class;
  //var calendarID = data.calendarInfo[0][calendarName].calendarid;
  //console.log("the id for calendar: " + calendarName + " is: " + calendarID);


  res.render('calendarView', {
  	'id': specificAssignment.id,
  	'name': specificAssignment.name,
  	'sections': specificAssignment.sections//,
  	//'calendarid': calendarID
  });
};