// Main function
async function main() {
	// Initial storage
	initStorage();

	// Initial layout
	initLayout();

	// Initial navigation, external file
	initNavigation();
}

// Initialize storage
function initStorage() {
	// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
}

// Layout initialization
function initLayout() {
	function loadLayout(element) {
		$.ajax({
			url: `html/layout/${element}.html`
		})
			.done(data => $(element).html(data))
			.fail(layoutFail);
	}

	loadLayout("header");
	loadLayout("footer");
}

// A meesage when layout fails
function layoutFail() {
	alert("Please, check your internet connection.");
}

// Call main function
main();
