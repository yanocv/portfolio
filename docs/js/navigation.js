const notFound = "not_found";

// Full redirection
async function gotoPage(page) {
	let url = new URL(window.location);
	url.hash = page;
	window.history.pushState({}, "", url);
	await loadPage(page);
}

// Initialize navigation
function initNavigation() {
	let hash = new URL(window.location).hash.substring(1);
	if (hash.length > 0) {
		gotoPage(hash);
	} else {
		gotoPage("intro");
	}
	$(window).on("hashchange", () => {
		loadPage(new URL(window.location).hash.substring(1));
	});
}

// Navigation
async function loadPage(page) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `html/${page}.html`
		})
			.done(data => {
				$("main").html(data);
			})
			.fail(() => {
				if (page === notFound) {
					console.err("Could not display 404");
				} else {
					gotoPage(notFound)
						.then(() => resolve())
						.catch(() => reject());
				}
			});
	});
}
