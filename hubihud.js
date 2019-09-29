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

	all = filters.children('li').filter(function() { return $(this).text().trim() === 'All' });

	filters.append(items);
	filters.prepend(all);
}

function sortBy(parent, childSelector, keySelector) {
	var items = parent.children(childSelector).sort(function(a, b) {
		var vA = $(keySelector, a).text();
		var vB = $(keySelector, b).text();
		return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
	});
	return items;
}


routes = [
	{ pattern: /\/logs.*/, handler: logs },
	{ pattern: /\/installedapp\/list/, handler: appList }
]

function dispatch() {
	path = window.location.pathname;
	for (i = 0; i < routes.length; i++) {
		route = routes[i];
		if (route.pattern.test(path)) (route.handler)();
	}
}

function isHubitat() {
	return $('script[src$="hubitat.min.js"]').length > 0;
}


if (isHubitat()) dispatch();
