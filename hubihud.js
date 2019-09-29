function dispatch() {
	path = window.location.pathname;
	switch (true){
		case /\/logs.*/.test(path):
			logs();
			break;
		case /\/installedapp\/list/.test(path):
			appList();
			break;
		default:
			break;
	}
}

function appList() {
	sortGroupsAndScenes();
}

function sortGroupsAndScenes() {
	namesContainer = $('#app-table td[data-order="Groups and Scenes"]');
	versionsContainer = namesContainer.next();

	names = namesContainer.children('div');
	versions = versionsContainer.children('div');

	pairs = [];
	// Start at 1 to skip the headers
	for (i = 1; i < names.length; i++) {
		pairs.push([names[i], versions[i]]);
	}

	pairs.sort(function(a, b) {
		aVersion = $(a[1]).text();
		bVersion = $(b[1]).text();
		return (aVersion < bVersion) ? -1 : (aVersion > bVersion) ? 1 : 0;
	});

	names = [];
	versions = [];

	for (i = 0; i < pairs.length; i++) {
		names.push(pairs[i][0]);
		versions.push(pairs[i][1]);
	}

	namesContainer.append(names);
	versionsContainer.append(versions);
}

function isHubitat() {
	return $('script[src$="hubitat.min.js"]').length > 0;
}

function logs() {
	watchLogHeaders();
}

function watchLogHeaders() {
	sorting = false;
	$('#filters').on('DOMNodeInserted', function() {
		if (!sorting) {
			sorting = true;
			sortLogHeaders();
			sorting = false;
		}
	});
}
function sortLogHeaders() {
	filters = $('#filters');
	items = sortBy(filters, 'li', 'a');
	filters.append(items);
}

function sortBy(parent, childSelector, keySelector) {
	var items = parent.children(childSelector).sort(function(a, b) {
		var vA = $(keySelector, a).text();
		var vB = $(keySelector, b).text();
		return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
	});
	return items;
}

if (isHubitat()) dispatch();
