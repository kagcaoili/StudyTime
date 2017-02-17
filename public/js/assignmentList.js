'use strict';

//Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

//Function that is called when the document is ready
function initializePage() {
	$("#hide_show").click(function(e)) {
		toggleClick(e);
	});
}  

function toggleClick(e) {
	e.preventDefault();

	var elem = document.getElementById("hide_show");
	if (elem.value=="Hide Completed Assignments") {
		elem.value = "Show Completed Assignments";
	}
	else {
		elem.value = "Hide Completed Assignments";
	}

}