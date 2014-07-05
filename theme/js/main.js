var $ = require('jquery');
require('foundation');
require('foundation.magellan');
require('tumblrPhotoset');
require('infiniteScroll');


$(document).ready(function() {
  $(document).foundation();
  $('.photo-slideshow').each(function() {
    $(this).tumblrPhotoset();
  });

  $('.posts').infinitescroll({
    navSelector  : ".pagination",
    nextSelector : ".next-page",
    itemSelector : ".post",
    bufferPx     : 400
  }, function (newElementsArray) {
    $('.photo-slideshow', newElementsArray).each(function() {
      $(this).tumblrPhotoset();
    });
  });
});
