// Main function
async function main() {
	gotoPage("intro");
}

async function gotoPage(page) {
	await $.ajax({
		url: `html/${page}.html`
	}).done(function (data) {
		$("body").html(data);
	});
}

// Call main function
main();
