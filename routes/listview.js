var data = require('../data.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
  var idex = req.params.id;

  console.log("body id: " + req.body.id);
  console.log("body name: " + req.body.name);
  console.log("body due date: " + req.body.due_date);
  console.log("body class: " + req.body.class);
  console.log("body sections: " + req.body.sections);
  console.log("body 1sectionname: " + req.body.sections[0].section_name);
  console.log("body 1sectionname: " + req.body.sections[0].section_time);

  //res.render('listview', data.assignments[idex]);
  //res.render('listview', req.body);

  var id = req.body.id;
  var name = req.body.name;
  var due_date = req.body.due_date;
  var class_name = req.body.class;
  var sections = req.body.sections;

  var newAssignment = {
    "id": id,
    "name": name,
    "due_date": due_date,
    "class": class_name,
    "sections": sections,
  }


  console.log("BEFORE: " + data.assignments[0].name);
  //data['assignments'].push({"id":req.body.id,"name":req.body.name,"due_date":req.body.due_date, "class":req.body.class, "sections":req.body.sections});
  data.assignments.push(newAssignment);
  console.log("AFTER: " + data.assignments[2].name);

  res.render('listview', {
    'id': id,
    'name': name,
    "due_date": due_date,
    "class": class_name,
    'section_name': sections
  });
};

exports.defaultAssignment = function (req, res) {
	console.log("rendering default assignment");
	var idex = req.params.id;

	/*
	console.log("dbody id: " + req.body.id);
  console.log("dbody name: " + req.body.name);
  console.log("dbody due date: " + req.body.due_date);
  console.log("dbody section name: " + req.body.section_name);
  */


	console.log("dthe id is: " + idex);
	res.render('listview', data.assignments[idex]);
}