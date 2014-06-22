/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 * Licensed under the MIT license
 */
var $ = require('jquery');
var albumPhotoset = require('tumblrPhotoset.albumPhotoset');

$.fn.tumblrPhotoset = function() {
  albumPhotoset.init($(this));
  albumPhotoset.render();
};
