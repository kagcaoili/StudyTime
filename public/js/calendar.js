'use strict';

var days_in_week_list = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days_in_month_list = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var current_date = new Date();

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function depressedButtonPrev(e) {
	$('.calnav-month').text(getNewName(-1));
	makeCalendar(current_date.getMonth(), current_date.getFullYear());

}

function depressedButtonNext(e) {
	$('.calnav-month').text(getNewName(1));
}



/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	$(".calnav-prev").click(depressedButtonPrev);
	$(".calnav-next").click(depressedButtonNext);
	$('.EventList .assignment li').click(detectAssignmentClick);
	$('.EventList_B .assignment li').click(detectAssignmentClick);
	setClassColors();

	makeCalendar(current_date.getMonth(), current_date.getFullYear());
}

function detectAssignmentClick(e) {
	//ga('create', 'UA-92514823-2', 'auto');
	ga('send', 'event', 'assignment', 'click');
}



function makeCalendar(month, year) {

	var current_month = month;
	var current_year = year;

	var firstDay = new Date(current_year, current_month, 1);
	var startingDay = firstDay.getDay();

	//console.log("starting day: " + startingDay);
	//console.log("days in week is: " + days_in_week_list[startingDay]);

	var monthLength = days_in_month_list[current_month];

	//Handle leap years
	if (current_month == 1) {
		if ((current_year % 4 == 0 && current_year % 100 != 0) || current_year % 400 == 0) {
			monthLength = 29;
		}
	}

	var monthName = months_list[current_month];
	$('.calnav-month').text(monthName);
	$('.calnav-year').text(current_year);

	
	var html = '';
	var isBeginning = false;
	var dayCount = 0;
	for (var i = 1; i <= monthLength; i++) {
		//handle new row

		if (!isBeginning) { //still on the first row looking for the start date
			html += '<tr>';
			for (var j = 0; j < 7; j++) {
				if (j == startingDay) {
					//console.log(dayCount + ": found start day at " + j + "\n");
					isBeginning = true;
					/*
					html += '<td>';
					html += 1;
					html += '</td>';
					*/
					break;
				} else {
					//console.log(dayCount + ": empty\n");
					html += '<td></td>';
				}
				dayCount++;
			}
		} else {

			if (dayCount % 7 == 0) {
				html += '</tr>';
				html += '<tr>';
				//console.log(dayCount + ": make new row\n");
			} 

			html += '<td>';
			html += i;
			html += '</td>';
			dayCount++;
			//console.log(dayCount + ": added data for " + i + "\n");
		}

		
	}
	html += '</tr>';

	//console.log("html is: " + html);

	$('.daysincal').append(html);
	

}











/*
 * Function that sets the colors of the events in the eventlist to
 * unique colors
 */
function setClassColors() {
	$('.EventList .assignment li').each(function(index) {
		var classname = $(this).attr('id');
		var newcolor = "#" + inttoRGB(hashCode(classname));
		$(this).css('background', newcolor);
		var color3 = $(this).css('background-color');
	});

	$('.EventList_B .assignment li').each(function(index) {
		var classname = $(this).attr('id');
		var newcolor = "#" + inttoRGB(hashCode(classname));
		$(this).css('background', newcolor);
		var color3 = $(this).css('background-color');
	});
}

//http://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function hashCode(str) {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
}

function inttoRGB(i) {
	var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
	return "00000".substring(0, 6 - c.length) + c;
}

function getIndex() {
	if ($('.calnav-month').text().trim() == "January") {
		return 0;
	}
	else if ($('.calnav-month').text().trim() == "February") {
		return 1;
	}
	else if ($('.calnav-month').text().trim() === "March") {
		return 2;
	}
	else if ($('.calnav-month').text().trim() === "April") {
		return 3;
	}
	else if ($('.calnav-month').text().trim() === "May") {
		return 4;
	}
	else if ($('.calnav-month').text().trim() === "June") {
		return 5;
	}
	else if ($('.calnav-month').text().trim() === "July") {
		return 6;
	}
	else if ($('.calnav-month').text().trim() === "August") {
		return 7;
	}
	else if ($('.calnav-month').text().trim() === "September") {
		return 8;
	}
	else if ($('.calnav-month').text().trim() === "October") {
		return 9;
	}
	else if ($('.calnav-month').text().trim() === "November") {
		return 10;
	}
	else if ($('.calnav-month').text().trim() === "December") {
		return 11;
	}
}

function getName(index) {
	var year = $('.calnav-year').text();
	if (index === -1) {
		year = year - 1;
		$('.calnav-year').text(year);
		return "December";
	}
	else if (index === 0) {
		return "January";
	}
	else if (index === 1) {
		return "February";
	}
	else if (index === 2) {
		return "March";
	}
	else if (index === 3) {
		return "April";
	}
	else if (index === 4) {
		return "May";
	}
	else if (index === 5) {
		return "June";
	}
	else if (index === 6) {
		return "July";
	}
	else if (index === 7) {
		return "August";
	}
	else if (index === 8) {
		return "September";
	}
	else if (index === 9) {
		return "October";
	}
	else if (index === 10) {
		return "November";
	}
	else if (index === 11) {
		return "December";
	}
	else if (index === 12) {
		year = +year+1; //act like an integer
		$('.calnav-year').text(year);
		return "January";
	}
}

function getNewName(index) {

	var currIndex = getIndex();
	var newIndex = currIndex + index;
	var theNewName = getName(newIndex);
	return theNewName;

}