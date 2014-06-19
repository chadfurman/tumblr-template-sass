
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
		define(['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	init();
	function init() {
		// Roll through HighRes data and replace the images
		if( settings.highRes ) {
			$this.find(settings.photoWrap).each(function() {
				var thisImage = $(this).find(settings.photo + " img");
				var bigOne    = thisImage.data('highres');

				thisImage.attr('src', bigOne);
			});
		}
	}
})