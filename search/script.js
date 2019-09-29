let container = $("#searchBar");

function filterDropdown () {
	let li, input_val;
	input_val = $("[name='search']").val().toLowerCase();
	li = container.find("ul li");

	li.each(function () {
		if ($(this).text().toLowerCase().indexOf(input_val) > -1) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
	// container.find("ul li.highlighted").removeAttr('class');
}
function highlight (e) {
	if ($(e.target).is("li")) {
		$(container).find("ul li.highlighted").removeAttr('class');
		$(e.target).addClass("highlighted");
	}
}
function select (e) {
	// Code when selected/added goes here
}
function eventControl (e) {
	if (e.type == "input") {
		filterDropdown();
	} else if (e.type == "mouseover") {
		highlight(e);
	} else if (e.type == "click") {
		select(e);
	}
}

$("#searchBar").on("input mouseover click", eventControl);
