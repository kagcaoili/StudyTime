var data = require('../data.json');


/*
 * GET home page.
 */

exports.view = function(req, res){

  //how to get the length of json array in jquery?
  //http://stackoverflow.com/questions/20811318/json-array-get-length-using-jquery-or-javascript
  var array = [], len;
  for (assignment in data.assignments) {
  	array.push(assignment);
  }
  len = array.length;

  res.render('createAssignment', {
    'sections': data.sectionsInfo,
    'newIndex': len
  });
};