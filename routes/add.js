var data = require('../data.json');

exports.addSection = function (req, res) {
  var name = req.query.section_name;
  var time = req.query.section_time;
  newSection = {
  	"section_name": name,
  	"section_time": time
  }
  console.log(newSection);

  res.render('createAssignment.handlebars', data);
}

