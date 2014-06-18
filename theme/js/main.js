require.config({
	baseUrl: "/libs",
	paths: {
		"jquery": "bower_components/jquery/jquery.js"
	},
	waitSeconds: 15
});
require( ["jquery"],
	function($) {
		console.log('thank god!  it worked.');
		$(document).foundation();

		$(document).ready(function() {
			console.log($('.photo-slideshow').tumblrPhotoset({
				'ligthbox'  : true, // uses the default Tumblr lightbox, change to false to use your own
				'highRes'   : true, // will use high res images
				'rounded'   : 'corners', // corners, all or false
				'exif'      : true, // display EXIF data if available (tooltip)
				'captions'  : true, // display individual captions on photos (tooltip)
				'gutter'    : '10px', // spacing between the images
				'photoset'  : '.photo-slideshow', // photoset wrapper
				'photoWrap' : '.photo-data', // photo data wrapper (includes photo, icons + exif)
				'photo'     : '.pxu-photo' // photo wrap (includes photo only)
			}));
		});
	}
);
