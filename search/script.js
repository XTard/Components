let container = $("#searchBar");
let lastY = $(window).height();

function filterDropdown () {
	let input, li, input_val;
	input_val = container.children("input").first().val().toLowerCase();
	li = container.find("ul li");

	li.each(function() {
		if ($(this).text().toLowerCase().indexOf(input_val) > -1) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});

	container.find("ul li.selected").removeAttr("selected");
}
function highlight (e, action, target) {
	e.preventDefault();
	e.stopImmediatePropagation();
	if (container.find("ul li:visible").hasClass("selected") === false)
		container.find("ul li:visible").first().addClass("selected");
	else {
		if (action == "hover") {
			container.find("ul li.selected").removeAttr("class");
			$(target).addClass("selected");
		}
		else if (action == "up") {
			if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0)
				container.find("ul li.selected").removeAttr("class").prevAll("li").not('[style*="display: none"]').first().addClass("selected");
		} else if (action == "down") {
			if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length)
				container.find("ul li.selected").removeAttr("class").nextAll("li").not('[style*="display: none"]').first().addClass("selected");
		}
	}
	container.find("li.selected")[0].scrollIntoView(true);
}
function addItem (e) {
	console.log(container.find("li.selected").text());
}
function eventControl (e) {
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	if (e.type == "keydown" || e.type == "input") {
		// console.log("key " + e.key + " which " + e.which);

		let key = (typeof e.key === "string") ? e.key : e.which;
		// console.log(key);

		switch (key) {
			case "ArrowUp":
			case 38:
				highlight(e, "up");
				break;
			case "ArrowDown":
			case 40:
				highlight(e, "down");
				break;
			// case "ArrowLeft":
			// 	break;
			// case "ArrowRight":
			// 	break;
			case "Enter":
				addItem(e);
				break;
			default:
				filterDropdown();
		}
	}
	else if (e.type == "wheel" || e.type == "mousewheel" || e.type == "DOMMouseScroll") {
		let deltaY = e.originalEvent.deltaY,
			detail = e.originalEvent.detail;

		if (typeof deltaY === 'number') {
			if (deltaY > 0) {
				// DOWN ++
				highlight(e, "down");
			} else if (deltaY < 0) {
				// UP --
				highlight(e, "up");
			}
		} else if (typeof detail === 'number' && detail !== 0) {
			if (detail > 0) {
				highlight(e, "down");
				console.log("down");
			} else if (detail < 0) {
				highlight(e, "up");
				console.log("up");
			}
		}
	}
	else if (e.type == "mouseover") {
		highlight(e, "hover", e.target);
	}
	else if (e.type == "click") {
		addItem(e);
	}
	// else if (e.type == "touchmove") {
	// 	let currentY = e.originalEvent.touches[0].clientY;
	// 	e.preventDefault();
	// 	console.log(`currentY - ${currentY}; changed - ${lastY}`);
	// 	// $("#qwe").text(e.originalEvent.touches[0].clientY);
	// 	if ((lastY - currentY) > 2) {
	// 	    if (currentY > lastY) {
	// 			 highlight(e, "down");
	// 		 	$("#kek").text("down");
	// 	         // moved down
	// 	    } else if (currentY < lastY){
	// 	         // moved up
	// 			 highlight(e, "up");
	// 			 $("#kek").text("up");
	// 	    }
	// 		lastY = currentY;
	// 	}
	// 	 /* console.log(e.originalEvent.touches[0].clientY); */
	// }
}

function onSelect(val) {
	console.log(val);
}

$("#searchBar").on("keydown input wheel mousewheel DOMMouseScroll touchmove mouseover click", eventControl);

$("#searchBar").focus(function (){
	$("[name='search']").focus();
});
