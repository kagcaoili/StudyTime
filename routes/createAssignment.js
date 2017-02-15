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

  /*
  var id = (data.assignments[len-1].id - -1);
  var name = "Lab 3";
  var due_date = "02/14/2017";
  var class_name = "CSE 165";
  var sections = [1, 2, 3];

  data['assignments'].push({"id":id,"name":name,"due_date":due_date,"class":class_name, "sections":sections});
  console.log(data);
*/
  res.render('createAssignment');
};