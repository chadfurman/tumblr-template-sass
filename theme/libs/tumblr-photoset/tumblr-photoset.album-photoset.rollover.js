/**
 *
 * Tumblr Album Photoset Lightbox
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */

var albumPhotoset = require('tumblrPhotoset.albumPhotoset');

albumPhotoset.registerEventHandler('pre-render', function (photoset) {
	var baseImages = photoset.photosetImages;

	photoset.imageIterator(function (imageCounter, rowCounter) {
		if (imageCounter == photoset.getStartOfRow(rowCounter)) {
			return; // skip the first image in the row
		}

		var image = baseImages[imageCounter],
			caption = image.getAttribute('data-caption');

		// check the image for a caption
		if (caption && caption.match(/rollover/)) {
			// if a caption matches, disable tag-based rollover
			photoset.tagRollover = false;

			applyRolloverToImageNumberInPhotoset(imageCounter, photoset);
			return true;
		}
	});
});

albumPhotoset.registerEventHandler('pre-render', function (photoset) {
	// check for tag, also check to see if tagRollover has been disabled
	if (photoset.tagRollover == false || photoset.photosetTags.indexOf('#rollover') === -1) {
		return;
	}

	photoset.imageIterator(function (imageCounter, rowCounter) {
		var startOfRow = photoset.getStartOfRow(rowCounter);
		var positionInRow = imageCounter - startOfRow;

		if (positionInRow % 2) {
			applyRolloverToImageNumberInPhotoset(imageCounter, photoset);
			return true;
		}
	});
});

function applyRolloverToImageNumberInPhotoset(imageCounter, albumPhotosetInstance) {
	// extract images
	var baseImages = albumPhotosetInstance.photosetImages,
		baseImage = baseImages[imageCounter - 1],
		baseSrc = baseImage.getAttribute('src'),
		rolloverImage = baseImages[imageCounter],
		rolloverSrc = rolloverImage.getAttribute('src');

	var removeBaseHeight = function() {
		this.removeAttribute('height');
	};

	var setBaseHeight = function() {
		this.height = baseImage.height;
	};

	// register rollover
	baseImage.addEventListener('mouseenter', function () {
		this.src = rolloverSrc;
		setBaseHeight();
		this.removeEventListener('load', removeBaseHeight);
		this.addEventListener('load', setBaseHeight)
	});
	baseImage.addEventListener('mouseleave', function () {
		this.src = baseSrc;
		this.addEventListener('load', removeBaseHeight);
		this.removeEventListener('load', setBaseHeight);
	});
}
