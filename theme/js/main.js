require( ["jquery", "foundation", "foundation.magellan", "tumblrPhotoset"],
	function($, foundation, foundationMagellan, tumblrPhotoset) {
		$(document).foundation();

		$(document).ready(function() {
			$('.photo-slideshow').each(function() {
				$(this).tumblrPhotoset();
			});
		});
	}
);
