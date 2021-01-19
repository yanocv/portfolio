const notFound = "not_found";

// Full redirection
async function gotoPage(page) {
	let url = new URL(window.location);
	url.hash = page;
	window.history.pushState({}, "", url);
	await loadPage(page);
}

// Initialize navigation
async function initNavigation() {
	let url = new URL(window.location);
	// Initial index redirection; Both GHP and LiveServer redirect to slash, so it is always there
	let isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
	let redirectTo = isLocalhost ? "index.html" : "index";
	let pathname = url.pathname;
	let landingPage = pathname.split("/").pop();
	if (landingPage !== redirectTo) {
		window.history.replaceState({}, "", `${pathname.substring(pathname.length - landingPage.length)}${redirectTo}`);
	}

	// Working with hash
	let hash = url.hash.substring(1);
	if (hash.length > 0) {
		await loadPage(hash);
	} else {
		await gotoPage("intro");
	}
	$(window).on("hashchange", () => {
		// New URL to get a fresh hash each time
		loadPage(new URL(window.location).hash.substring(1));
	});
}

// Navigation
async function loadPage(page) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `html/page/${page}.html`
		})
			.done(data => {
				$("main").html(data);
				resolve();
			})
			.fail(() => {
				if (page === notFound) {
					reject();
				} else {
					gotoPage(notFound)
						.then(() => resolve())
						.catch(() => reject());
				}
			});
	});
}
