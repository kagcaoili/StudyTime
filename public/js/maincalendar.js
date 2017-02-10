'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function depressedButtonPrev(e) {
	console.log("depress");
	console.log($(this));
	//$('.calnav-prev').addClass('depressed');
	$(this).addClass('depressed');
	console.log("the name is: " + $('.calnav-month').text());
	$('.calnav-month').text(getNewName(-1));
}

function depressedButtonNext(e) {
	console.log("depress");
	console.log($(this));
	//$('.calnav-prev').addClass('depressed');
	$(this).addClass('depressed');
	console.log("the name is: " + $('.calnav-month').text());
	$('.calnav-month').text(getNewName(1));
}


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	$(".calnav-prev").click(depressedButtonPrev);
	$(".calnav-next").click(depressedButtonNext);
}

function getIndex() {
	console.log("Getting Index for " + $('.calnav-month').text());
	if ($('.calnav-month').text().trim() == "January") {
		console.log("It is January");
		return 0;
	}
	else if ($('.calnav-month').text().trim() == "February") {
		console.log("It is February");
		return 1;
	}
	else if ($('.calnav-month').text() === "March") {
		console.log("It is March");
		return 2;
	}
	else if ($('.calnav-month').text() === "April") {
		console.log("It is April");
		return 3;
	}
	else if ($('.calnav-month').text() === "May") {
		console.log("It is May");
		return 4;
	}
	else if ($('.calnav-month').text() === "June") {
		console.log("It is June");
		return 5;
	}
	else if ($('.calnav-month').text() === "July") {
		console.log("It is July");
		return 6;
	}
	else if ($('.calnav-month').text() === "August") {
		console.log("It is August");
		return 7;
	}
	else if ($('.calnav-month').text() === "September") {
		console.log("It is September");
		return 8;
	}
	else if ($('.calnav-month').text() === "October") {
		console.log("It is October");
		return 9;
	}
	else if ($('.calnav-month').text() === "November") {
		console.log("It is November");
		return 10;
	}
	else if ($('.calnav-month').text() === "December") {
		console.log("It is December");
		return 11;
	}
}

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