
/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 * Licensed under the MIT license
 */

var albumPhotoset = require('albumPhotoset');
console.log('binding pre-render event');
albumPhotoset.registerEventHandler('pre-render', function(albumPhotoset) {
  albumPhotoset.$photosetImages.each(function() {
    if (highRes = this.data('highres')) {
      this.attr('src', highRes);
    }
  })
})
