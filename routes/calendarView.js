var data = require('../data.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
  var id = req.params.id;
  res.render('calendarView', data.assignments[id]);
  console.log(data.assignments[id]);
};