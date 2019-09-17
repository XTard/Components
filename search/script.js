function filterFunction(event) {
	let container, input, filter, li, input_val;
	container = $(this).closest(".searchable");
	input_val = $(this).val().toUpperCase();
	console.log(event);

	if (["ArrowUp", "ArrowDown", "Enter"].indexOf(event.key) != -1) {
		console.log("Asd");
		keyControl(event, container)
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

function keyControl(e, container) {
	if (e.key == "ArrowDown") {

		if (container.find("ul li").hasClass("selected")) {
			if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length) {
				container.find("ul li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
			}

		} else {
			container.find("ul li:first-child").addClass("selected");
		}

	} else if (e.key == "ArrowUp") {

		if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0) {
			container.find("ul li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
		}
	} else if (e.key == "Enter") {
		container.find("input").blur();
		console.log("asd");
		onSelect(container.find("ul li.selected").text())
	}

	console.log("asd");
	container.find("ul li.selected")[0].scrollIntoView({
		behavior: "smooth",
		block: "center"
	});
}

function onSelect(val) {
	console.log(val);
}

$(".searchable ul li").hover(function () {
	$(this).closest(".searchable").find("ul li.selected").removeClass("selected");
	$(this).addClass("selected");
	// console.log("hover");
});

$("#gosho").on('keyup', filterFunction);

// $(".searchable input").focus(function () {
// 	console.log("focused");
//     $(this).closest(".searchable").find("ul").show();
//     $(this).closest(".searchable").find("ul li").show();
// });

// $(".searchable input").blur(function () {
// 	console.log("blurred");
//     let that = this;
//     $(that).closest(".searchable").find("ul").hide();
// });
