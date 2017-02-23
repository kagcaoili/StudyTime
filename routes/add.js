var data = require('../data.json');

exports.addSection = function (req, res) {
  //console.log(req.query);
  var name = req.query.section_name;
  var time = req.query.section_time;
  //console.log(name);
  //console.log(time);
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

  res.render('createAssignment', {
    'sections': data.sectionsInfo,
    'newIndex': len
  });
}

