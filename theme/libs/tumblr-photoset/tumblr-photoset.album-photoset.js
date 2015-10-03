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
	rowStart: [],

	/**
	 * Init
	 * Setup our album photoset
	 * @param $photoset
	 */
	init: function (photoset) {
		this.triggerEvent('pre-init');

		var tags = photoset.getAttribute('data-tags');
		this.photosetTags = (tags) ? tags.split(' ') : [];

		this.layout = [];
		var layoutArray = JSON.stringify(photoset.getAttribute('data-layout')).split('');
		layoutArray.splice(0,1);
		for (var rowIndex = 0; rowIndex < layoutArray.length; rowIndex++) {
			this.layout.push(parseInt(layoutArray[rowIndex]));
		}

		var photos = photoset.getElementsByClassName('photo');
		this.photosetImages = Array.prototype.slice.call( // Array.prototype.slice.call converts a NodeList to an Array
			Array.prototype.filter.call(photos, function (photo) {
				return photo.nodeName === 'IMG';
			})
		);
		this.photoset = photoset;

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
			var numImagesInRow = this.layout[rowCounter],
				row = document.createElement('UL'),
				rowItem = null,
				image = null;

			document.getElementById(this.photoset.getAttribute('id')).appendChild(row);

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
				row.appendChild(rowItem);
				image = rowImagesSlice[rowImageCounter];
				rowItem.appendChild(image);

				rowItem.style.width = (100 / numImagesInRow) + '%';
				image.style.width = '100%';
			}

			this.triggerEvent('row-ready', row);

			// determine where we start in the array of images for the next row
			imagePositionPointer += numImagesInRow;
		} // end row loop
		this.triggerEvent('post-render', this.photoset);
	}, // end render()

	/**
	 * Image Iterator
	 * Executes the callback for each image, passing in the index's image in the array and the current row number
	 * @param callback Return true to remove the current image from the dom, from the image array, and from the row
	 */
	imageIterator: function (callback) {
		var rowCounter = 0;
		var baseImages = this.photosetImages;

		// iterate over every image in the baseImages array and check for rollover triggers
		for (var imageCounter = 1; imageCounter < baseImages.length; imageCounter++ ) {
			if (imageCounter > this.layout[rowCounter]) {
				// keep track of what row we're on in the linear image list
				rowCounter++;
			}

			if (callback(imageCounter, rowCounter)) { //
				this.removeImageAtIndexFromRow(imageCounter, rowCounter);
				imageCounter--; // we now have one less image total, but the same number remaining
			}
		}
	},

	/**
	 * Remove Image At Index From Row
	 * Removes the specified image from the dom, from the photosetImages array, and from the layout array
	 * @param imageIndex position in the this.photosetImages array
	 * @param row position in the this.layout array
	 */
	removeImageAtIndexFromRow: function (imageIndex, row) {
		var image = this.photosetImages[imageIndex];
		image.parentElement.removeChild(image); // remove rollover image from dom
		this.photosetImages.splice(imageIndex, 1); // remove rollover image from the image array
		this.layout[row]--; // shorten expected row length by 1
	},

	/**
	 * Get Start Of Row
	 * Given a row number, calculate the position in the photosetImages array of the first image in the row
	 * Caches the calculation for faster lookup
	 * @param rowNumber
	 * @returns {*}
	 */
	getStartOfRow: function (rowNumber) {
		if (typeof this.rowStart[rowNumber] !== 'undefined') {
			return this.rowStart[rowNumber]; // cache
		}

		var rowStart = 0;
		for (var i = 0; i < rowNumber; i++) {
			rowStart = rowStart + this.layout[i];
		}

		this.rowStart[rowNumber] = rowStart;
		return rowStart;
	}
};
module.exports = albumPhotoset;
