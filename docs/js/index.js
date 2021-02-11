let apiData = {};
let siteLang = "en";

// Main function
async function main() {
	// Initial storage
	initStorage();

	// Init layout, data, and navigation
	try {
		await Promise.all([initLayout(), initData(), initNavigation()]);

		// Load language
		loadMainLang();
	} catch {
		failedInitReport();
		return;
	}
}

// Initialize storage
function initStorage() {
	let lang = localStorage.getItem("siteLang");
	if (lang !== null) {
		siteLang = lang;
	}
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

// Init language and data
async function initData() {
	// Init language bits
	$(window).on("loadpagecomplete", () => {
		loadMainLang();
	});

	// Load the data
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
	localStorage.setItem("siteLang", lang);
	siteLang = lang;
	for (let key in apiData.layout) {
		$(`.api-data-${key}`).html(apiData.layout[key][lang]);
	}
	loadMainLang();
}

// Loads content
function loadMainLang() {
	for (let key in apiData.main) {
		$(`.api-data-${key}`).html(apiData.main[key][siteLang]);
	}
}

// Call main function
main();
