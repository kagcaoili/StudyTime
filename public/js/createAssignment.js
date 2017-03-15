'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	//initializePage();
	console.log("Javascript on CreateAssignment connected!");
	$('.createTimeline .button').click(getNewAssignment);

	$('#addSectionForm').submit(function(e) {
		e.preventDefault();


		var sectionName = $('#section_name').val();
		var sectionTime = $('#section_time').val();

		$.post('add', { section_name: sectionName, section_time: sectionTime} , postCallback);
	});
});

function postCallback(res) {
	// res {
	// 	section_name: "...",
	// 	section_time: "..."
	// }
	$('.sections').append('<li>' + res.section_name + "<br>" + "Estimated Time: "+ res.section_time+ '</li>');

	$('#section_name').val('');
	$('#section_time').val('');
}

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
	console.log("The assignment index is: " + assignmentIndex);

	var name = document.getElementById("name").value;
    var due_date = document.getElementById("due_date").value;
    var assignment_class = document.getElementById("class").value;
    var section_name = document.getElementById("section_name").value;
    var section_time = document.getElementById("section_time").value;
    
    console.log("name is: " + name);
    console.log("due date is: " + due_date);
    console.log("assignment class: " + assignment_class);
    console.log("section name is: " + section_name);
    console.log("section_time is " + section_time);

    var section_array = [{section_name: section_name, section_time: section_time}];

	//$.post('listview/' + assignmentIndex, {id: assignmentIndex, name: name, due_date: due_date, class: assignment_class, sections: [ "1":  [section_name: section_name, section_time: section_time]]}, addAssignment);
    $.post('listview/' + assignmentIndex + '/true', {id: assignmentIndex, name: name, due_date: due_date, class: assignment_class, sections: section_array}, addAssignment);



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


var CLIENT_ID = '109310418708-u9pbu42qpmbke340qscbs9e69jcbhns6.apps.googleusercontent.com';
// var CLIENT_ID = '9b419356804c88acf0b53d4b5dde50750182c269';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

