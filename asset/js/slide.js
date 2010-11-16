$(function() {

var pages = $('.page');
pages.each(function(i) {
	var page_number = i + 1;
	$(this).attr('id', 'page' + page_number);
});

function get_page() {
	return parseInt(location.hash.replace(/^#page/, '')) || 1;
}

function set_page(page) {
	page = page || get_page();
	pages.not(':hidden').hide();
	pages.eq(page - 1).fadeIn();
}

function next() {
	var page = get_page();
	if (pages.size() <= page) {
		return;
	}
	page++;
	location.hash = 'page' + page;
}

function prev() {
	var page = get_page();
	if (page <= 1) {
		return;
	}
	page--;
	location.hash = 'page' + page;
}

$(window).bind('hashchange', function() {
	set_page();
});

$(document).click(next);

$(document).keydown(function(e) {
	switch (e.keyCode) {
		case 78: // n
		case 74: // j
		case 39: // ->
			next();
			break;
		case 80: // p
		case 75: // k
		case 37: // <-
			prev();
			break;
	}
});

// link open blank window
$('a').click(function(e) {
	e.preventDefault();
	window.open(this.href, '_blank');
});

// height adjust
function height_adjust() {
	$('body').height( $(window).height() );
}

$(window).resize( height_adjust );

// initialize
set_page();
height_adjust();

});
