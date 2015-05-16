/**
 * Tumblr Album Photoset Lightbox (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */

var $ = require('jquery');
var albumPhotoset = require('tumblrPhotoset.albumPhotoset');

albumPhotoset.registerEventHandler('row-ready', function (albumPhotosetInstance, row) {
	$row = $(row[0]);
	baseImages = $row.find('img:even');
	rolloverImages = $row.find('img:odd');

	baseImages.each(function (index) {
		if (rolloverImage = rolloverImages[index]) {
			var baseImage = baseImages[index];
			var $baseImage = $(baseImage);
			var baseImageSrc = baseImage.src;
			var rolloverImage = rolloverImages[index];
			var $rolloverImage = $(rolloverImage);
			var rolloverImageSrc = rolloverImages[index].src;

			$baseImage
				.on('mouseover', function () {
					this.src = rolloverImageSrc;
				})
				.on('mouseout', function () {
					this.src = baseImageSrc;
				});

			$rolloverImage.parent().remove();
			$rolloverImage.remove();
		}
	});
	$row.attr('class', 'medium-block-grid-' + baseImages.length);
});
