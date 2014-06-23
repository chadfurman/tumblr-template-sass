/**
 * Tumblr Album Photoset Lightbox (jQuery)
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
});

/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 * Licensed under the MIT license
 */

var $ = require('jquery');

// init Tumblr Lightbox
$('.tumblr-box').on('click', function (e) {
  e.preventDefault();

  var clicked = $(this);
  var photoSlideshow = clicked.parents(settings.photoset).attr('id');
  tumblrLightbox(clicked, photoSlideshow);

});

// add a count number to each image so that we know where to start the lightbox when we init
for(i = 0; i < allImages.length; i++) {
  // @todo figure out how to pass allImages into the extension...
  var image = allImages.eq(i);
  image.attr('data-count', i + 1);
}

// figure out which image was clicked
// we'll make sure that's where we start our lightbox
var openWith = current.parents(settings.photoWrap).find(settings.photo+' img').data('count');

  var imageWidth = thisImage.data('width');
  var imageHeight = thisImage.data('height');
  var imageLowRes = thisImage.attr('src');
  var imageHighRes = thisImage.data('highres');

  // formatting is specific to how Tumblr has things set up
  var thisPhotoPackage = {
    width    : imageWidth,
    height   : imageHeight,
    low_res  : imageLowRes,
    high_res : imageHighRes
  };
  photosetArray.push(thisPhotoPackage);

Tumblr.Lightbox.init(photosetArray, openWith);
