/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */
var $ = require('jquery');
var albumPhotoset = require('tumblrPhotoset.albumPhotoset');
require('tumblrPhotoset.albumPhotoset.highres');

$.fn.tumblrPhotoset = function() {
  albumPhotoset.init($(this));
  albumPhotoset.render();
};
