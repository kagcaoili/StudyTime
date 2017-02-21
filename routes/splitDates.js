var dates = require('./routes/dates');
var data = require('../data.json');

exports.splitDate = function(req, res) {
	var datesDif = dates.dateDifference();

	if (datesDif > 29)
		var sectionDates = Math.floor(datesDif/4);

	else if (datesDif < 9)
		var sectionDates = Math.floor(datesDif/2);

	else
		var sectionDates = Math.floor(datesDif/3);

	res.json(splitDate);
}  
