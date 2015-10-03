/**
 * Tumblr Album Photoset Lightbox (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 *
 * define these attributes on the IMG tag:

 <img class="photo"
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
console.log('Tumblr Photoset Lightbox');

albumPhotoset.registerEventHandler('post-init', function (albumPhotosetInstance) {
	var photosetId = albumPhotosetInstance.photoset.id;
	var photosetImages = albumPhotosetInstance.photosetImages;
	albumPhotosetInstance.lightboxImageArray[photosetId] = [];

	for (var imageCounter = 0; imageCounter < photosetImages.length; imageCounter++) {
		console.log('attaching lightbox to photoset ' + photosetId + ' image ' + imageCounter);
		var image = photosetImages[imageCounter];
		image.setAttribute('data-position', imageCounter);

		// extract properties for tumblr lightbox
		var imageWidth = image.getAttribute('data-highres-width');
		var imageHeight = image.getAttribute('data-highres-height');
		var imageLowRes = image.getAttribute('data-lowres');
		var imageHighRes = image.getAttribute('data-highres');

		// add image properties to lightbox array
		albumPhotosetInstance.lightboxImageArray[photosetId].push({
			width: imageWidth,
			height: imageHeight,
			low_res: imageLowRes,
			high_res: imageHighRes
		});


		console.log('binding click event to image: ', image);
		image.addEventListener('click', function () {
			var imageArray = albumPhotosetInstance.lightboxImageArray[photosetId];
			Tumblr.Lightbox.init(imageArray, imageArray.length);
		});
	}
});
