var data = require('../data.json');

exports.addSection = function (req, res) {
  console.log(req.body);
  var name = req.body.section_name;
  var time = req.body.section_time;

  newSection = {
  	"section_name": name,
  	"section_time": time
  }

  console.log(name);
  data.sectionsInfo.push(newSection);
  console.log(newSection);
  
  var array = [], len;
  for (assignment in data.assignments) {
    array.push(assignment);
  }
  len = array.length;
 // $.post('../createAssignment.handlebars', newSection);
  //$(".sections").append("test");
/* res.render('createAssignment', {
    'sections': data.sectionsInfo,
    'newIndex': len
  }); */

res.send(newSection);
}

