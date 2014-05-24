module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		preprocess : {
			html : {
				src : 'theme/templates/main.tumblr',
				dest : 'theme/theme.tumblr'
			}
		},
		clean: ['build'],
		compass: {
			dist: {
				options: {
					sassDir: 'theme/sass',
					cssDir: 'theme/css',
					environment: 'production'
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.registerTask(
		'default', ['preprocess', 'clean', 'compass']
	);
}
