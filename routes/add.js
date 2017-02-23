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
  //console.log(newSection);
  data.sectionsInfo.push(newSection);
  res.render('createAssignment.handlebars', data);
}

