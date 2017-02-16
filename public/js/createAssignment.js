'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript on CreateAssignment connected!");
	$('.createTimeline .button').click(getNewAssignment);
}

function getNewAssignment(e) {
	console.log("detect new assignment");
	var assignmentIndex = $(this).closest(".button").attr('id');
	console.log("The assignment index is: " + assignmentIndex);
	$.get("listview/0", addAssignment);
}

function addAssignment(result) {
	console.log(result);

}

/*
function getName(index) {
	var year = $('.calnav-year').text();
	console.log("the year is: " + year);
	if (index === -1) {
		console.log("It is December");
		year = year - 1;
		$('.calnav-year').text(year);
		return "December";
	}
	else if (index === 0) {
		console.log("It is January");
		return "January";
	}
	else if (index === 1) {
		console.log("It is February");
		return "February";
	}
	else if (index === 2) {
		console.log("It is March");
		return "March";
	}
	else if (index === 3) {
		console.log("It is April");
		return "April";
	}
	else if (index === 4) {
		console.log("It is May");
		return "May";
	}
	else if (index === 5) {
		console.log("It is June");
		return "June";
	}
	else if (index === 6) {
		console.log("It is July");
		return "July";
	}
	else if (index === 7) {
		console.log("It is August");
		return "August";
	}
	else if (index === 8) {
		console.log("It is September");
		return "September";
	}
	else if (index === 9) {
		console.log("It is October");
		return "October";
	}
	else if (index === 10) {
		console.log("It is November");
		return "November";
	}
	else if (index === 11) {
		console.log("It is December");
		return "December";
	}
	else if (index === 12) {
		console.log("It is January");
		year = +year+1; //act like an integer
		$('.calnav-year').text(year);
		return "January";
	}
}

function getNewName(index) {

	console.log("Receiving change: " + index);

	var currIndex = getIndex();

	console.log("Current Month Index is: " + currIndex);
	var newIndex = currIndex + index;

	console.log("New Month Index is: " + newIndex);
	var theNewName = getName(newIndex);

	console.log("New Name Month is: " + theNewName);
	return theNewName;

}
*/
