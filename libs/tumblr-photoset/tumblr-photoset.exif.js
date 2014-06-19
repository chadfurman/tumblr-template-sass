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
		// EXIF data and CAPTIONS enabled
		if( settings.exif && settings.captions ) {

			$this.find(settings.photoWrap).each(function() {

				var thisImage = $(this).find('img');

				var exifData;
				var pxuCaption;

				if( thisImage.hasClass('exif-yes') ) {

					var exifCamera   = thisImage.data('camera')   || '-';
					var exifISO      = thisImage.data('iso')      || '-';
					var exifAperture = thisImage.data('aperture') || '-';
					var exifExposure = thisImage.data('exposure') || '-';
					var exifFocal    = thisImage.data('focal')    || '-';

					exifData = '<table class="exif"><tr><td colspan="2"><span class="label">Camera</span><br>'+exifCamera+'</td></tr><tr><td><span class="label">ISO</span><br>'+exifISO+'</td><td><span class="label">Aperture</span><br>'+exifAperture+'</td></tr><tr><td><span class="label">Exposure</span><br>'+exifExposure+'</td><td><span class="label">Focal Length</span><br>'+exifFocal+'</td></tr></table>';
				} else {
					exifData = '';
				}

				if( thisImage.hasClass('caption-yes') ) {
					var getCaption = thisImage.data('caption');
					pxuCaption = '<p class="pxu-caption">'+getCaption+'</p>';
				} else {
					pxuCaption = '';
				}

				if( pxuCaption !== '' || exifData !== '' ) {
					$(this).find('.info').append('<div class="pxu-data">'+pxuCaption+exifData+'<span class="arrow-down"></span></div>');

					if( exifData === '' ) {
						$(this).find('.pxu-data').addClass('caption-only');
					}

					$(this).find('span.info').css('display','block');
				}

			});

		}

		// Roll through EXIF data ONLY
		else if( settings.exif ) {

			$this.find(settings.photoWrap).each(function() {
				var thisImage = $(this).find('img');

				if( thisImage.hasClass('exif-yes') ) {
					// exif data avialable

					var exifCamera   = thisImage.data('camera')   || '-';
					var exifISO      = thisImage.data('iso')      || '-';
					var exifAperture = thisImage.data('aperture') || '-';
					var exifExposure = thisImage.data('exposure') || '-';
					var exifFocal    = thisImage.data('focal')    || '-';

					var exifData = '<table class="exif"><tr><td colspan="2"><span class="label">Camera</span><br>'+exifCamera+'</td></tr><tr><td><span class="label">ISO</span><br>'+exifISO+'</td><td><span class="label">Aperture</span><br>'+exifAperture+'</td></tr><tr><td><span class="label">Exposure</span><br>'+exifExposure+'</td><td><span class="label">Focal Length</span><br>'+exifFocal+'</td></tr></table><span class="arrow-down"></span>';

					$(this).find('.info').append('<div class="pxu-data">'+exifData+'</div>');

					$(this).find('span.info').css('display','block');
				}

			});

		} // end EXIF
	}
})
