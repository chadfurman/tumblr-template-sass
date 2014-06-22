var $ = require('jquery');
require('foundation');
require('foundation.magellan');
require('tumblrPhotoset');

$(document).foundation();

$(document).ready(function() {
  $('.photo-slideshow').each(function() {
    $(this).tumblrPhotoset();
  });
});
