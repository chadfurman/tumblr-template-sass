/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 * Licensed under the MIT license
 */
var $ = require('jquery');
require('tumblrPhotoset.albumPhotoset');

$.fn.tumblrPhotoset = function() {

  var photoset = new albumPhotoset;
  photoset.init($(this));
  photoset.render();
};
