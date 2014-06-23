/**
 * Tumblr Album Photoset Lightbox (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */

var $ = require('jquery');
var albumPhotoset = require('tumblrPhotoset.albumPhotoset');
albumPhotoset.lightboxImageArray = {};

albumPhotoset.registerEventHandler('post-init', function(albumPhotosetInstance) {
  var photosetId = albumPhotosetInstance.$photoset.attr('id');
  albumPhotosetInstance.lightboxImageArray[photosetId] = [];

  var imageCounter = 0;
  albumPhotosetInstance.$photosetImages.each(function() {
    $this = $(this);
    $this.data('position', ++imageCounter);

    // extract properties for tumblr lightbox
    var imageWidth = $this.data('width');
    var imageHeight = $this.data('height');
    var imageLowRes = $this.attr('src');
    var imageHighRes = $this.data('highres');

    // add image properties to lightbox array
    albumPhotosetInstance.lightboxImageArray[photosetId].push({
      width    : imageWidth,
      height   : imageHeight,
      low_res  : imageLowRes,
      high_res : imageHighRes
    });

    $this.on('click', function() {
      Tumblr.Lightbox.init(albumPhotosetInstance.lightboxImageArray[photosetId], $(this).data('position'));
    });
  })
});
