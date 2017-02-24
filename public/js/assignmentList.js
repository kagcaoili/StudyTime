'use strict';

//Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

//Function that is called when the document is ready
function initializePage() {
/*	$("#hide_show").click(function(e) {
		toggleClick(e);
	});
*/
/*
	$("#hide_show").click(function(e) {
		
	});
*/
		//toggleClick(e);
}  

function toggle(button) {
	if(document.getElementById("hide_show").value=="Hide Completed Assignments") {
		//console.log("in if");
		document.getElementById("hide_show").value="Show Completed Assignments";
		$.each($("input[name='cb']:checked"), function() {
			$(this).parent().hide();
		});
	} else {
		document.getElementById("hide_show").value="Hide Completed Assignments";
		//console.log("in else");
		$.each($("input[name='cb']:checked"), function() {
			$(this).parent().show();
		});
	}
}

function toggleClick(e) {
	e.preventDefault();
/*
	{{#each checkbox}}
		if (document.getElementById())


	{{/each}}
	$("#hide_show").toggle("Show Completed Assignments");
*/


/*
	var elem = document.getElementById("hide_show");
	if (elem.value=="Hide Completed Assignments") {
		elem.value = "Show Completed Assignments";
	}
	else {
		elem.value = "Hide Completed Assignments";
	}
*/
}