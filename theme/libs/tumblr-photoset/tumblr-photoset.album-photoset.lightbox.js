/**
 * Tumblr Album Photoset Lightbox (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 *
 * define these attributes on the IMG tag:

 <img class="primary-photo"
 src="{PhotoURL-HighRes}"
 alt="{PhotoAlt}"
 data-width="{PhotoWidth-HighRes}"
 data-height="{PhotoHeight-HighRes}"
 data-lowres="{PhotoURL-256}"
 data-highres="{PhotoURL-HighRes}"
 />
 */

var albumPhotoset = require('tumblrPhotoset.albumPhotoset');
albumPhotoset.lightboxImageArray = {};

albumPhotoset.registerEventHandler('post-init', function (albumPhotosetInstance) {
	var photosetId = albumPhotosetInstance.photoset.id;
	var photosetImages = albumPhotosetInstance.photosetImages;
	albumPhotosetInstance.lightboxImageArray[photosetId] = [];

	for (var imageCounter = 0; imageCounter < photosetImages.length; imageCounter++) {
		var image = photosetImages[imageCounter];
		image.setAttribute('data-position', imageCounter);

		// extract properties for tumblr lightbox
		var imageWidth = image.getAttribute('data-width');
		var imageHeight = image.getAttribute('data-height');
		var imageLowRes = image.getAttribute('data-src');
		var imageHighRes = image.getAttribute('data-highres');

		// add image properties to lightbox array
		albumPhotosetInstance.lightboxImageArray[photosetId].push({
			width: imageWidth,
			height: imageHeight,
			low_res: imageLowRes,
			high_res: imageHighRes
		});

		image.addEventListener('click', function () {
			Tumblr.Lightbox.init(albumPhotosetInstance.lightboxImageArray[photosetId], image.getAttribute('data-position'));
		});
	}
});
console.log('Tumblr Photoset Lightbox registered');
