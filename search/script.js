function filterFunction(event) {
	let container, input, filter, li, input_val;
	container = $(this);
	input_val = $(this).children("input").val().toUpperCase();

	if (["Enter", "ArrowUp", "ArrowDown"].indexOf(event.key) > -1) {
		eventControl(event, container)
	} else {
		li = container.find("ul li");
		li.each(function (i, obj) {
			if ($(this).text().toUpperCase().indexOf(input_val) > -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});

		container.find("ul li").removeClass("selected");
		container.find("ul li:visible").first().addClass("selected");
	}
}

function eventControl(ev, container) {
	if (ev.key == "ArrowDown") {
		if (container.find("ul li").hasClass("selected")) {
			if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length) {
				container.find("ul li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
			}
		} else {
			container.find("ul li:first-child").addClass("selected");
			// container.find("input").blur();
			// container.find("ul").focus();
		}
	} else if (ev.key == "ArrowUp") {
		if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0) {
			container.find("ul li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
		}
	} else if (ev.key == "Enter") {
		container.find("input").blur();
		container.find("ul").focus();
		onSelect(container.find("ul li.selected").text())
	}
	container.find("ul li.selected")[0].scrollIntoView({
		behavior: "smooth",
		block: "center"
	});
}

function onSelect(val) {
	console.log(val);
}

// $(".searchable ul li").hover(function () {
// 	$(this).closest(".searchable").find("ul li.selected").removeClass("selected");
// 	$(this).addClass("selected");
// 	// console.log("hover");
// });

$(".searchable").on('keyup', filterFunction);
$("ul").on('scroll', function () {
	console.log("scroll");
});
$("ul").on('wheeel', function (e) {
	// console.log("wheel");
	let container, input, filter, li, input_val;
	container = $(this);
	// input_val = $(this).children("input").val().toUpperCase();
	if (typeof e.originalEvent.wheelDelta == 'number') {
		if (e.originalEvent.wheelDelta > 0) { // UP
			// console.log("up");
			if (container.find("li:visible").index(container.find(".selected")) > 0)
				container.find("li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
		} else if (e.originalEvent.wheelDelta < 0) { // DOWN
			// console.log("down");
			if (container.find("ul li").hasClass("selected")) {
				if (container.find("li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length)
					container.find("li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
			} else {
				container.find("ul li:first-child").addClass("selected");
			}
		}
		container.find("li.selected")[0].scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	}
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
	//   }
	// }
});


// $(".searchable input").blur(function () {
// 	console.log("blurred");
// });
//
// $(".searchable ul").focus(function () {
// 	console.log("focused ul");
//     // $(this).closest(".searchable").find("ul").show();
//     // $(this).closest(".searchable").find("ul li").show();
// });
