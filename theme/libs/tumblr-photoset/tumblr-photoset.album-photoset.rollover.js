/**
 *
 * Tumblr Album Photoset Lightbox
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */

var albumPhotoset = require('tumblrPhotoset.albumPhotoset');

albumPhotoset.registerEventHandler('row-ready', function (albumPhotosetInstance, row) {
	row = row[0];
	var baseImages = row.getElementsByTagName('IMG'),
		rolloverImages = [];

	console.log('baseImages:', baseImages);
	for (var imageCounter = 0; imageCounter < baseImages.length; imageCounter++ ) {
		var image = baseImages[imageCounter];
		console.log('image:', image, image.getAttribute('data-caption'));
		if (image.getAttribute('data-caption').match(/#rollover/)) {
			var baseImage = baseImages[imageCounter - 1],
				rolloverImageSrc = image.getAttribute('src'),
				baseImageSrc = image.getAttribute('src');
			console.log('rolloverSrc', rolloverImageSrc);
			console.log('baseSrc', baseImageSrc);

			baseImage.addEventListener('mouseover', function () { this.src = rolloverImageSrc; });
			baseImage.addEventListener('mouseout', function () { this.src = baseImageSrc; });

			baseImages.splice(imageCounter, 1);
			imageCounter--;
		}
	}
	console.log('rollovers:', rolloverImages); // TODO: mod even
	console.log('bases:', baseImages); // TODO: mod even
});
console.log('rollover registered');
