function dispatch() {
	path = window.location.pathname;
	switch (true){
		case /\/logs.*/.test(path):
			logs();
			break;
		default:
			break;
	}
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
