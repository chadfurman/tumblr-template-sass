module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		preprocess : {
			html : {
				src : 'theme/templates/main.tumblr',
				dest : 'theme.tumblr'
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'theme/sass',
					cssDir: 'theme/css',
					imagesDir: 'theme/img',
					javascriptsDir: 'theme/js',
					importPath: 'bower_components/foundation/scss',
					outputStyle: 'expanded'
				}
			}
		},
		concat: {
			js: {
				src: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/foundation/js/foundation/foundation.js',
					'bower_components/foundation/js/foundation/foundation.topbar.js',
					'theme/js/theme.js'
				],
				dest: 'theme.js',
			},
			css: {
				src: ['theme/css/screen.css'],
				dest: 'theme.css',
			}
		},
	});

	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.registerTask(
		'default', ['preprocess', 'concat', 'compass']
	);
}
