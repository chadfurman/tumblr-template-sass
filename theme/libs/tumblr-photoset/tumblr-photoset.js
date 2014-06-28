/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */
var $ = require('jquery');
var albumPhotoset = require('tumblrPhotoset.albumPhotoset');
require('tumblrPhotoset.albumPhotoset.highres');
require('tumblrPhotoset.albumPhotoset.lightbox');
require('tumblrPhotoset.albumPhotoset.rollover');

$.fn.tumblrPhotoset = function() {
  albumPhotoset.init($(this));
  albumPhotoset.render();
};
