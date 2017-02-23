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

	//e.preventDefault();

	console.log("detect new assignment");
	var assignmentIndex = $('.createTimeline .button').attr('id');
//	console.log("The assignment index is: " + assignmentIndex);

	var name = document.getElementById("name").value;
    var due_date = document.getElementById("due_date").value;
    var assignment_class = document.getElementById("class").value;
    var section_name = document.getElementById("section_name").value;
    var section_time = document.getElementById("section_time").value;
    
 /*   console.log("name is: " + name);
    console.log("due date is: " + due_date);
    console.log("assignment class: " + assignment_class);
    console.log("section name is: " + section_name);
    console.log("section_time is " + section_time);
*/
    var section_array = [{section_name: section_name, section_time: section_time}];

	//$.post('listview/' + assignmentIndex, {id: assignmentIndex, name: name, due_date: due_date, class: assignment_class, sections: [ "1":  [section_name: section_name, section_time: section_time]]}, addAssignment);
    $.post('listview/' + assignmentIndex, {id: assignmentIndex, name: name, due_date: due_date, class: assignment_class, sections: section_array}, addAssignment);



    /*
	posting.done(function(data) {
        var content = $(data).find('.testingfoo');
        $(".testingfoo").append("helo");
    });
*/

    //$.get("listview/0", addAssignment);
    //$.get("createAssignment", addAssignment);
}

function addAssignment(result) {
	console.log("foo:");



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
