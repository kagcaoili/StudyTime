var data = require('../data.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('calendarView', data.assignments[0]);
};