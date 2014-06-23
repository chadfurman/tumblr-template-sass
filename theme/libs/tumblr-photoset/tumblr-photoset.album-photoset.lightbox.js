/**
 * Tumblr Album Photoset Lightbox (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */

var $ = require('jquery');
var albumPhotoset = require('tumblrPhotoset.albumPhotoset');

albumPhotoset.registerEventHandler('post-init', function(albumPhotosetInstance) {
  var count = 1;
  albumPhotosetInstance.lightboxImageArray = [];

  albumPhotosetInstance.$photosetImages.each(function() {
    $this = $(this);

    // extract properties for tumblr lightbox
    var imageWidth = $this.data('width');
    var imageHeight = $this.data('height');
    var imageLowRes = $this.attr('src');
    var imageHighRes = $this.data('highres');

    // add image properties to lightbox array
    albumPhotosetInstance.lightboxImageArray.push({
      width    : imageWidth,
      height   : imageHeight,
      low_res  : imageLowRes,
      high_res : imageHighRes
    });

    $this.on('click', function() {
      Tumblr.Lightbox.init(albumPhotosetInstance.lightboxImageArray, count++);
    })
  })
});
