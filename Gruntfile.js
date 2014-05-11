module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		preprocess : {
			html : {
				src : 'templates/main.tumblr',
				dest : 'theme.tumblr'
			}
		}
	});

	grunt.loadNpmTasks('grunt-preprocess');
	grunt.registerTask('default', ['preprocess']);
}
