
/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 * Licensed under the MIT license
 */

var $ = require('jquery');
var albumPhotoset = require('tumblrPhotoset.albumPhotoset');

albumPhotoset.registerEventHandler('pre-render', function(albumPhotoset) {
  albumPhotoset.$photosetImages.each(function() {
    $this = $(this);
    if (highRes = $this.data('highres')) {
      $this.attr('src', highRes);
    }
  })
})
