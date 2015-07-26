/**
 * Album Photoset
 * Object responsible for building and outputting a photo album.
 *
 * @property {string} layout   Numeric representation of image to row mapping
 *  i.e. if "321" were the layout, 3 would be the number of images on the first row,
 *  2 on the second, and 1 image on the last row.means be 3 rows, 3 images in the first
 *  row, 2 in the second, 1 in the third resulting in a total of 6 images
 *
 * Inspired by: https://github.com/PixelUnion/Extended-Tumblr-Photoset
 */
var albumPhotoset = {
	/**
	 * Callbacks
	 * every property is a list of methods, property names being the events that trigger the methods
	 */
	callbacks: {},

	/**
	 * Init
	 * Setup our album photoset
	 * @param $photoset
	 */
	init: function (photoset) {
		this.triggerEvent('pre-init');
		this.layout = JSON.stringify(photoset.getAttribute('data-layout')).split('');
		this.layout.splice(0,1);
		var photos = photoset.getElementsByClassName('photo');
		this.photosetImages = Array.prototype.filter.call(photos, function (photo) {
			return photo.nodeName === 'IMG';
		});
		this.photoset = photoset;
		this.photosetTags = photoset.getAttribute('data-tags').split(' ');
		this.triggerEvent('post-init');
		this.render();
	},

	/**
	 * Register Event Handler
	 * Assign a callback to an event
	 * @param callback
	 */
	registerEventHandler: function (event, callback) {
		if (this.callbacks.hasOwnProperty(event)) {
			this.callbacks[event].push(callback);
		} else {
			this.callbacks[event] = [callback];
		}
	},

	/**
	 * Trigger Event
	 * Execute callbacks for a given event
	 * @param string event
	 */
	triggerEvent: function (event) {
		if (!this.callbacks.hasOwnProperty(event)) {
			return;
		}

		var callbacks = this.callbacks[event];
		for (var callbackCounter = 0; callbackCounter < callbacks.length; callbackCounter++) {
			var callback = callbacks[callbackCounter];
			callback(this, Array.prototype.slice.call(arguments, 1)); // pass array of event arguments to callback
		}
	},

	/**
	 * Render
	 * builds out the rows and columns of our album photoset based on the photoset's data-layout property
	 */
	render: function () {
		// imagePositionPointer determines where we start in the array of images for each row
		var imagePositionPointer = 0;

		this.triggerEvent('pre-render');
		for (var rowCounter = 0; rowCounter < this.layout.length; rowCounter++) {
			// numImagesInRow is the current row's image count
			var numImagesInRow = parseInt(this.layout[rowCounter]),
				row = document.createElement('UL'),
				rowItem = null,
				image = null;

			if (! numImagesInRow) {
				continue;
			}

			// build out and append to our row each image item
			var rowImagesSlice = this.photosetImages.slice(imagePositionPointer, numImagesInRow + imagePositionPointer);
			for (var rowImageCounter = 0;
				 rowImageCounter < numImagesInRow;
				 rowImageCounter++
			) { // each row image
				rowItem = document.createElement('LI');
				image = rowImagesSlice[rowImageCounter];
				image.style.width = 100 / numImagesInRow;
				image.style.height = image.getAttribute('data-height');
				rowItem.appendChild(image);
				row.appendChild(rowItem);
			}

			document.getElementById(this.photoset.getAttribute('id')).appendChild(row);

			this.triggerEvent('row-ready', row);

			// determine where we start in the array of images for the next row
			imagePositionPointer += numImagesInRow;
		} // end row loop
		this.triggerEvent('post-render', this.photoset);
	} // end render()
};
module.exports = albumPhotoset;
