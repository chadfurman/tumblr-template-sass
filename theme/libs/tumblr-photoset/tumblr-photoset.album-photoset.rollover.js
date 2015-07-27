/**
 *
 * Tumblr Album Photoset Lightbox
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */

var albumPhotoset = require('tumblrPhotoset.albumPhotoset');

albumPhotoset.registerEventHandler('pre-render', function (albumPhotosetInstance) {
	var images = albumPhotosetInstance.photosetImages.slice(),
		baseImages = Array.prototype.slice.call(images),
		rowCounter = 0,
		captionFound = false;

	for (var imageCounter = 1; imageCounter < baseImages.length; imageCounter++ ) {
		var image = baseImages[imageCounter],
			caption = '';

		if (imageCounter > albumPhotosetInstance.layout[rowCounter]) rowCounter++;

		caption = image.getAttribute('data-caption');
		if (caption && caption.match(/#rollover/)) {
			albumPhotosetInstance.tagRollover = false;
			captionFound = true;

			var baseImage = baseImages[imageCounter - 1],
				rolloverImageSrc = image.getAttribute('src'),
				baseImageSrc = baseImage.getAttribute('src');

			baseImage.addEventListener('mouseover', function () { this.src = rolloverImageSrc; });
			baseImage.addEventListener('mouseout', function () { this.src = baseImageSrc; });

			baseImages.splice(imageCounter, 1);
			image.parentElement.removeChild(image);
			imageCounter--;
			albumPhotosetInstance.layout[rowCounter]--;
		}
	}

	if (captionFound) {
		albumPhotosetInstance.photosetImages = baseImages;
	}
});

albumPhotoset.registerEventHandler('row-ready', function (albumPhotosetInstance, row) {
	if (albumPhotosetInstance.tagRollover == false || albumPhotosetInstance.photosetTags.indexOf('#rollover') === -1) {
		albumPhotosetInstance.tagRollover == false
		return;
	}

	row = row[0];
	var baseImages = Array.prototype.slice.call(row.getElementsByTagName('IMG')),
		rowCounter = 0;

	for (var imageCounter = 1; imageCounter < baseImages.length; imageCounter += 2 ) {
		if (imageCounter > albumPhotosetInstance.layout[rowCounter]) rowCounter++;

		var baseImage = baseImages[imageCounter - 1],
			rolloverImage = baseImages[imageCounter],
			rolloverImageSrc = rolloverImage.getAttribute('src'),
			baseImageSrc = baseImage.getAttribute('src');

		baseImage.addEventListener('mouseover', function () { this.src = rolloverImageSrc; });
		baseImage.addEventListener('mouseout', function () { this.src = baseImageSrc; });

		baseImages.splice(imageCounter, 1);
		rolloverImage.parentElement.removeChild(rolloverImage);
		imageCounter--;
		albumPhotosetInstance.layout[rowCounter]--;
	}
});
console.log('rollover registered');
