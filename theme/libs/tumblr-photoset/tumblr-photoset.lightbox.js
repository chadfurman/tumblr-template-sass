/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 * Module template from: https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
 * Licensed under the MIT license
 */

// Uses AMD or browser globals to create a jQuery plugin.
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['../../.'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	init();
	function init() {
		if (settings.lightbox) {
			// init Tumblr Lightbox
			$('.tumblr-box').on('click', function (e) {
				e.preventDefault();

				var clicked = $(this);
				var photoSlideshow = clicked.parents(settings.photoset).attr('id');
				tumblrLightbox(clicked, photoSlideshow);

			});

			// add a count number to each image so that we know where
			// to start the lightbox when we init
			for(i = 0; i < allImages.length; i++) {
				// @todo figure out how to pass allImages into the extension...
				var image = allImages.eq(i);
				image.attr('data-count', i + 1);
			}

			var tumblrLightbox = function (current,photoset) {

				// figure out which image was clicked
				// we'll make sure that's where we start our lightbox
				var openWith = current.parents(settings.photoWrap).find(settings.photo+' img').data('count');

				// setup array of images
				var photosetArray = [];
				$('#'+photoset).find(settings.photoWrap).each(function () {
					var thisImage = $(this).find(settings.photo+' img');
					var imageWidth = thisImage.data('width');
					var imageHeight = thisImage.data('height');
					var imageLowRes = thisImage.attr('src');
					var imageHighRes = thisImage.data('highres');

					// formatting is specific to how Tumblr has things set up
					var thisPhotoPackage = {
						width    : imageWidth,
						height   : imageHeight,
						low_res  : imageLowRes,
						high_res : imageHighRes
					};
					photosetArray.push(thisPhotoPackage);
				});

				Tumblr.Lightbox.init(photosetArray, openWith);

			}; // end tumblrLightbox()

		}
	}
})
