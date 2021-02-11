// Handles the submit event of the form
document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

// Event handler message
function saveIssue(e) {
	let issueDesc = document.getElementById("issueDescInputTitle").value;
	let issueDescText = document.getElementById("issueDescInputText").value;
	let issueSeverity = document.getElementById("issueSeverityInput").value;
	let issueAssignedTo = document.getElementById("issueAssignedToInput").value;
	// Makes issueId a global unique identifier
	let issueId = chance.guid();
	let issueStatus = "Open";
	let issueObject = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus,
		descriptionText: issueDescText
	};

	// Checks if there is any data in local storage
	if (localStorage.getItem("issues") == null) {
		let issuesArray = [];
		issuesArray.push(issueObject);
		// Sends data to local storage
		localStorage.setItem("issues", JSON.stringify(issuesArray));
	} else {
		let issuesArray = JSON.parse(localStorage.getItem("issues"));
		issuesArray.push(issueObject);
		localStorage.setItem("issues", JSON.stringify(issuesArray));
	}

	// Resets input elements
	document.getElementById("issueInputForm").reset();

	// Call because we have new element in local storage, so the list output is regenerated and the new element is included in the list output aswell
	fetchIssues();

	// Prevents from submiting
	e.preventDefault();
}

// The function that closes an issue
function setStatusClosed(id) {
	let issues = JSON.parse(localStorage.getItem("issues"));
	for (let i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues[i].status = "Closed";
		}
	}
	localStorage.setItem("issues", JSON.stringify(issues));
	fetchIssues();
}

// The function that deletes an issue
function deleteIssue(id) {
	let issues = JSON.parse(localStorage.getItem("issues"));
	for (let i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues.splice(i, 1);
		}
	}
	localStorage.setItem("issues", JSON.stringify(issues));

	fetchIssues();
}

// Main function that gets the issues from html form
function fetchIssues() {
	let issues = JSON.parse(localStorage.getItem("issues"));
	let issuesList = document.getElementById("issuesList");
	// Initialize content
	issuesList.innerHTML = "";

	// Generates dynamic output
	for (let i = 0; i < issues.length; i++) {
		let id = issues[i].id;
		let desc = issues[i].description;
		let severity = issues[i].severity;
		let assignedTo = issues[i].assignedTo;
		let status = issues[i].status;
		let descText = issues[i].descriptionText;

		// Generates the output for html
		issuesList.innerHTML +=
			'<div class="bg-light p-5 rounded" style="margin-bottom: 10px;">' +
			"<h6>Issue ID: " +
			id +
			"</h6>" +
			'<p><span class="badge badge-' +
			(status == "Closed" ? "primary" : "secondary") +
			'" >' +
			status +
			"</span>" +
			' <span class="badge badge-' +
			(severity == "High" ? "danger" : severity == "Low" ? "info" : "warning") +
			'"><i class="fa fa-clock-o"></i> ' +
			severity +
			' </span> <span class="fa fa-user"></span> ' +
			assignedTo +
			"</p>" +
			"<h3>" +
			desc +
			"</h3>" +
			"<p>" +
			descText +
			"</p>" +
			'<a class="btn btn-warning" onClick ="setStatusClosed(\'' +
			id +
			'\') "class="btn btn-warning">Close</a> ' +
			'<class="btn btn-warning" onClick ="deleteIssue(\'' +
			id +
			'\')" class="btn btn-danger">Delete</a>' +
			"</div>";
	}
}
