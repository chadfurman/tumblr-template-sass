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
		define(['jquery', 'albumPhotoset'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($, albumPhotoset) {
	$.fn.tumblrPhotoset = function() {

		/**
		 * Tumblr Photoset
		 * Object responsible for building and outputting a photo album.
		 *
		 * @param {jQuery object} $photoset
		 *  photoset dom object.  i.e. $('.photoset') or $(this) inside of tumblrPhotoset extension
		 * @property {string} layout   Numeric representation of image to row mapping
		 *  i.e. if "321" were the layout, 3 would be the number of images on the first row,
		 *  2 on the second, and 1 image on the last row.means be 3 rows, 3 images in the first
		 *  row, 2 in the second, 1 in the third resulting in a total of 6 images
		 */
		albumPhotoset.init($(this));
    albumPhotoset.render();
	};
}));
