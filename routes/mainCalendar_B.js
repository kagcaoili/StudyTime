   
//get assignment data
var data = require('../data.json');
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('mainCalendar_B', data);
};