var data = require('../data.json');

exports.addSection = function (req, res) {
  var name = req.query.section_name;
  var time = req.query.section_time;

  newSection = {
  	"section_name": name,
  	"section_time": time
  }

  data.sectionsInfo.push(newSection);
  
  
  var array = [], len;
  for (assignment in data.assignments) {
    array.push(assignment);
  }
  len = array.length;
 // $.post('../createAssignment.handlebars', newSection);
  //$(".sections").append("test");
 res.render('createAssignment', {
    'sections': data.sectionsInfo,
    'newIndex': len
  }); 
}

