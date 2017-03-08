//get assignment data
var data = require('../data.json');
/*
 * GET home page.
 */

exports.view = function(req, res){
  data["B"] = false;
  res.render('mainCalendar', data);
};

exports.viewB = function(req, res) {
	data["B"] = true;
	res.render('mainCalendar', data);
};