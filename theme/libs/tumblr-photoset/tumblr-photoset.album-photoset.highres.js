/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */

var albumPhotoset = require('tumblrPhotoset.albumPhotoset');

albumPhotoset.registerEventHandler('pre-render', function (albumPhotoset) {
	var images = albumPhotoset.photosetImages,
		highRes;
	for (var i = 0; i < images.length; i++) {
		if (highRes = images[i].getAttribute('data-highres')) {
			images[i].setAttribute('src', highRes);
		}
	}
});
