module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'_header.tumblr',
					// '_blockAnswer.tumblr',
					// '_blockAudio.tumblr',
					// '_blockChat.tumblr',
					// '_blockLink.tumblr',
					// '_blockPhoto.tumblr',
					// '_blockPhotoset.tumblr',
					// '_blockPosts.tumblr',
					// '_blockQuote.tumblr',
					'_blockText.tumblr',
					// '_blockVideo.tumblr',
					'_footer.tumblr'
				],
				dest: "template.tumblr"
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);
}
