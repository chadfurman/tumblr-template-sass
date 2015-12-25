/**
 * Tumblr Photoset
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */
var albumPhotoset = require('tumblrPhotoset.albumPhotoset');
//require('tumblrPhotoset.albumPhotoset.highres');
require('tumblrPhotoset.albumPhotoset.lightbox');
require('tumblrPhotoset.albumPhotoset.rollover');

/**
 * Turn a div containing photos into a photo set
 *
 * @param container Element node containing img tags
 */
module.exports = function (photoset) {
	albumPhotoset.init(photoset);
};
