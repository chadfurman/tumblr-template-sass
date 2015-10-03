tumblrPhotoset = require('tumblrPhotoset');

var content = document.getElementById('content');
var photosets = content.getElementsByClassName('tumblr-photoset');
for (var photosetIndex = 0; photosetIndex < photosets.length; photosetIndex++) {
	var photoset = photosets[photosetIndex];
	tumblrPhotoset(photoset);
}
