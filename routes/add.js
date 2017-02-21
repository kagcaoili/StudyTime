/*var data = require("../data.json");

exports.addAssignment = function(req, res) {
	var name = req.query.name;
	var due_date = req.query.due_date;
	var className = req.query.class;

	newAssignment = {
		"id": 1,
		"name" : name,
		"due_date": due_date,
		"class": className,	
	}
	console.log(data);
	data.assignments.push(newAssignment);
	res.render('listView.handlebars', data);
}

*/
var data = require('../data.json');

exports.add = function (req, res) {
	console.log("Date funciton called");

	//store number of days in all months from Jan-Dec
	var monthDays = new Array[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	var today = new Date();
	/* Create a struct for today's date elements */
	var dateToday = {
		day: today.getDate(),
		month: today.getMonth()+1,
		year: today.getFullYear()
	}

	//get due date from data.json and split elements
	due = req.params.due_date;
	var dateElements = due.split('/');

	/* Create a struct for due date's elements */
	var dueDate = {
		day: dateElements[1],
		month: dateElements[0],
		year: dateElements[2]
	}

	/* Count total number of days before current date*/

	//initialize count using years and day
	n1 = dateToday.year*365 + dateToday.day;
	//add days for months in given date
	for (int i=0; i<dateToday.month - 1; i++)
		n1 += monthDays[i];

	/* Now count total number for days before due date */
	n2 = dueDate.year*365 + dueDate.day;
	for (int j=0; j<duedate.month-1; j++)
		n2 += monthDays[j];

	var dateDifference = n2 - n1;
	console.log(dateDifference);

	res.json(dateDifference);
}

