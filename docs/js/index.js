let apiData = {};

// Main function
async function main() {
	// Initial storage
	initStorage();

	// Init layout, data, and navigation
	try {
		await Promise.all([initLayout(), initData(), initNavigation()]);
	} catch {
		failedInitReport();
		return;
	}

	// Load language
	changeLang("en");
}

// Initialize storage
function initStorage() {
	// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
}

// Layout initialization
async function initLayout() {
	async function loadLayout(element) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `html/layout/${element}.html`
			})
				.done(data => {
					$(element).html(data);
					resolve();
				})
				.fail(reject);
		});
	}

	await loadLayout("header");
	await loadLayout("footer");
}

// A message when layout fails
function failedInitReport() {
	alert("Please, check your internet connection.");
}

// Init language
async function initData() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: "api/data.json"
		})
			.done(data => {
				apiData = data;
				resolve();
			})
			.fail(reject);
	});
}

// Change language
function changeLang(lang) {
	for (let key in apiData) {
		$(`.api-data-${key}`).html(apiData[key][lang]);
	}
}

// Call main function
main();
