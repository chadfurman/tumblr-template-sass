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
		// Round the corners on the top and bottom rows
		if( settings.rounded == 'corners' ) {

			var rows = $this.find('.row');

			if( rowCount == 1 ) {
				// only one row
				rows.find(settings.photoWrap + ':first-child ' + settings.photo).css({
					borderRadius: settings.borderRadius + ' 0 0 ' + settings.borderRadius
				});
				rows.find(settings.photoWrap + ':last-child ' + settings.photo).css({
					borderRadius: '0 '+ settings.borderRadius + ' ' + settings.borderRadius + ' 0'
				});
			} else {
				// more than one row
				for (var row = 0; row < rowCount; row++) {
					var count;
					if( row === 0 ) {
						// first row
						count = rows.eq(row).find(settings.photo).size();
						if( count == 1 ) {
							rows.eq(row).find(settings.photo).css({
								borderRadius: settings.borderRadius + ' ' + settings.borderRadius + ' 0 0'
							});
						} else {
							rows.eq(row).find(settings.photoWrap + ':first-child ' + settings.photo).css({
								borderRadius: settings.borderRadius + ' 0 0 0'
							});
							rows.eq(row).find(settings.photoWrap + ':last-child ' + settings.photo).css({
								borderRadius: '0 '+settings.borderRadius +' 0 0'
							});
						}
					}

					if( row == rowCount-1) {
						// we're on the last row
						count = rows.eq(row).find(settings.photo).size();
						if( count == 1 ) {
							rows.eq(row).find(settings.photo).css({
								borderRadius: '0 0 '+settings.borderRadius +' '+settings.borderRadius
							});
						} else {
							rows.eq(row).find(settings.photoWrap + ':first-child ' + settings.photo).css({
								borderRadius: '0 0 0 '+settings.borderRadius
							});
							rows.eq(row).find(settings.photoWrap + ':last-child ' + settings.photo).css({
								borderRadius: '0 0 '+settings.borderRadius +' 0'
							});
						}
					} // end last row

				} // end for loop

			} // end else

		} // end ROUNDED

		// Round the corners on the top and bottom rows
		if( settings.rounded == 'all' ) {

			$this.find(settings.photo).css({ borderRadius: settings.borderRadius });

		} // end ROUNDED

		// Round the corners on the top and bottom rows
		if( !settings.rounded ) {

			$this.find(settings.photo).css({ borderRadius: 0 });

		} // end ROUNDED

		// We're done! Add a 'processed' class so people can tie other processes into it
	}
})
