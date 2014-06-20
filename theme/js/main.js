require( ["jquery", "foundation", "foundation.magellan", "tumblrPhotoset", "albumPhotoset"],
	function($, foundation) {
		$(document).foundation();

		$(document).ready(function() {
			$('.photo-slideshow').each(function() {
				$(this).tumblrPhotoset();
			});
		});
	}
);
