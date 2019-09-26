var container = jQuery("#searchBar");
var lastY = 0;

function filterDropdown () {
	var input, li, input_val;
	input_val = container.children("input").val().toLowerCase();

	li = container.find("ul li");
	li.each(function (i, obj) {
		if ($(this).text().toLowerCase().indexOf(input_val) > -1) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});

	container.find("ul li.selected").removeAttr("selected");
}
function customScroll (e, direction) {
	e.preventDefault();
	if (container.find("ul li:visible").hasClass("selected") === true) {
		if (direction == "up") {
			container.find("ul li.selected").removeAttr("class").prevAll("li").not('[style*="display: none"]').first().addClass("selected");
		} else if (direction == "down") {
			container.find("ul li.selected").removeAttr("class").nextAll("li").not('[style*="display: none"]').first().addClass("selected");
		}
	} else if (container.find("ul li:visible").hasClass("selected") === false) {
		container.find("ul li:visible").first().addClass("selected");
	}
}
function eventControl (e) {
	// console.log(e.type);
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	if (e.type == "input" || e.type == "keydown") {
		// console.log("key " + e.key + " which " + e.which);
		// switch (e.key) {
		// 	case "ArrowUp":
		// 		e.preventDefault();
		// 		console.log("au");
		// 		break;
		// 	case "ArrowDown":
		// 		e.preventDefault();
		// 		console.log("ad");
		// 		break;
		// 	// case "ArrowLeft":
		// 	// 	e.preventDefault();
		// 	// 	console.log("al");
		// 	// 	break;
		// 	// case "ArrowRight":
		// 	// 	e.preventDefault();
		// 	// 	console.log("ar");
		// 	// 	break;
		// 	case "Enter":
		// 		console.log("enter");
		// 		break;
		// 	default:
				filterDropdown();
		// }

		// if (e.key == "ArrowDown") {
		// 	if (container.find("ul li").hasClass("selected")) {
		// 		if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length)
		// 			container.find("ul li.selected").removeClass("selected").nextAll("li").not('[style*="display: none"]').first().addClass("selected");
		// 	} else {
		// 		container.find("ul li:first-child").addClass("selected");
		// 	}
		// } else if (e.key == "ArrowUp") {
		// 	if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0)
		// 		container.find("ul li.selected").removeClass("selected").prevAll("li").not('[style*="display: none"]').first().addClass("selected");
		// } else if (e.key == "Enter") {
		// 	// container.find("input").blur();
		// 	// container.find("ul").focus();
		// 	container.find("ul li:visible").first().addClass("selected");
		// 	onSelect(container.find("ul li.selected").text())
		// }
	}
	else if (e.type == "wheel") {
		e.preventDefault();
		let deltaY = e.originalEvent.deltaY,
			detail = e.originalEvent.detail;

		console.log("detail " + e.originalEvent.detail + " Y - " + e.originalEvent.deltaY);
		// DOWN ++
		// UP --
		if (typeof deltaY === 'number') {
			if (deltaY > 0) {
				customScroll(e, "down");
				console.log("down");
			} else if (deltaY < 0) {
				customScroll(e, "up");
				console.log("up");
			}
		} else if (typeof detail === 'number' && detail !== 0) {
			if (deltaY > 0) {
				customScroll(e, "down");
				console.log("down");
			} else if (deltaY < 0) {
				customScroll(e, "up");
				console.log("up");
			}
		}
		// if (typeof e.originalEvent.wheelDelta == 'number') {
		// 	console.log("asd");
		// 	if (e.originalEvent.wheelDelta > 0) { // UP
		// 		if (container.find("li:visible").index(container.find(".selected")) > 0)
		// 			container.find("li.selected").removeClass("selected").prevAll("li").not('[style*="display: none"]').first().addClass("selected");
		// 	} else if (e.originalEvent.wheelDelta < 0) { // DOWN
		// 		if (container.find("ul li").hasClass("selected")) {
		// 			if (container.find("li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length)
		// 				container.find("li.selected").removeClass("selected").nextAll("li").not('[style*="display: none"]').first().addClass("selected");
		// 		} else {
		// 			container.find("ul li:first-child").addClass("selected");
		// 		}
		// 	}
		// }
		// else if (typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
		// 	console.log("qwe");
		// 	if (e.originalEvent.detail > 0) { // DOWN
		// 		if (container.find("ul li").hasClass("selected")) {
		// 			if (container.find("li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length)
		// 				container.find("li.selected").removeClass("selected").nextAll("li").not('[style*="display: none"]').first().addClass("selected");
		// 		} else {
		// 			container.find("ul li:first-child").addClass("selected");
		// 		}
		// 	} else if (e.originalEvent.detail < 0) { // UP
		// 		if (container.find("li:visible").index(container.find(".selected")) > 0)
		// 			container.find("li.selected").removeClass("selected").prevAll("li").not('[style*="display: none"]').first().addClass("selected");
		// 	}
		// }
	}
	else if (e.type == "touchmove") {
		e.preventDefault();
			let currentY = e.originalEvent.touches[0].clientY;
			$("#qwe").text(e.originalEvent.touches[0].clientY);
		     if (currentY > lastY) {
			 	$("#kek").text("down");
		         // moved down
		     } else if(currentY < lastY){
		         // moved up
				 $("#kek").text("up");
		     }
		     lastY = currentY;
			 /* console.log(e.originalEvent.touches[0].clientY); */
	}
	// container.find("ul li.selected")[0].scrollIntoView({
	// 	behavior: "smooth",
	// 	block: "center"
	// });
}

function onSelect(val) {
	console.log(val);
}

$("#searchBar").on("input keydown wheel touchmove", eventControl);

$("ul").focus(function (){
	$("input").focus();
});

// $("*").on("scroll", function (e) {
// 	// e.stopImmediatePropagation();
// 	console.log("aaa");
// });

// $(".searchable ul li").hover(function () {
// 	$(this).closest(".searchable").find("ul li.selected").removeClass("selected");
// 	$(this).addClass("selected");
// 	// console.log("hover");
// });

// $("#searchBar input").on('input', filterFunction);
// $("ul").on('scroll', function () {
// 	console.log("scroll");
// });
// $("ul").on('wheel', function (e) {
// 	// console.log("wheel");
// 	let container, input, filter, li, input_val;
	// container = $(this);
	// // input_val = $(this).children("input").val().toUpperCase();
	// if (typeof e.originalEvent.wheelDelta == 'number') {
	// 	if (e.originalEvent.wheelDelta > 0) { // UP
	// 		// console.log("up");
	// 		if (container.find("li:visible").index(container.find(".selected")) > 0)
	// 			container.find("li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
	// 	} else if (e.originalEvent.wheelDelta < 0) { // DOWN
	// 		// console.log("down");
	// 		if (container.find("ul li").hasClass("selected")) {
	// 			if (container.find("li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length)
	// 				container.find("li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
	// 		} else {
	// 			container.find("ul li:first-child").addClass("selected");
	// 		}
	// 	}
	// 	container.find("li.selected")[0].scrollIntoView({
	// 		behavior: "smooth",
	// 		block: "center"
	// 	});
	// }
		// else if (typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
		// 	if (e.originalEvent.detail > 0) { // DOWN
		// 		console.log("down");
		// 		if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length) {
		// 			container.find("ul li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
		// 		}
		// 	} else if (e.originalEvent.detail < 0) { // UP
		// 		console.log("up");
		// 		if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0) {
		// 			container.find("ul li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
		// 		}
		// 	}
		// }
// });
