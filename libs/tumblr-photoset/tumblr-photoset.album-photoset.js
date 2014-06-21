/**
 * Tumblr Photoset (jQuery)
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 * Module template from: https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
 * Licensed under the MIT license
 */

// Uses AMD or browser globals to create a jQuery plugin.
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
  var albumPhotoset = {
    init: function ($photoset) {
      this.layout = JSON.stringify($photoset.data('layout')).split('');
      this.photosetImages = $photoset.find('img.photo');
      this.$photoset = $photoset;
    },

    // imagePositionPointer determines where we start in the array of images for each row
    render: function() {
      var imagePositionPointer = 0;
      for (var rowCounter = 0; rowCounter < this.layout.length; rowCounter++) { // each row

        // numImagesInRow is the current row's image count
        var numImagesInRow = parseInt(this.layout[rowCounter]);

        // row is the jcreate the row dom
        var $row = $('<ul class="medium-block-grid-' + numImagesInRow + '"></ul>');


        // build out and append to our row each image item
        for (var rowImageCounter = imagePositionPointer;
             rowImageCounter < (numImagesInRow + imagePositionPointer);
             rowImageCounter++
          ) { // each row image
          $image = $('<li></li>');
          $image.append(this.photosetImages[rowImageCounter]);

          // @todo implement hover
          // .on("mouseenter", function() { $(this).find('.rollover').css("visibility", "visible"); } )
          // .on("mouseleave", function() { $(this).find('.rollover').css("visibility", "hidden"); } );
          // if hover enabled, every other image is the onMouseOver for the image prior
          // if no hover, simply add each image to the row dom
          $row.append($image);
        }

        // determine where we start in the array of images for the next row
        imagePositionPointer += numImagesInRow;
        this.$photoset.append($row);
      } // end row loop
    } // end render()
  };

  return albumPhotoset;
}));