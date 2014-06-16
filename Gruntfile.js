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
					'libs/bower_components/jquery/dist/jquery.js',
					'libs/bower_components/foundation/js/foundation/foundation.js',
					'libs/bower_components/foundation/js/foundation/foundation.magellan.js',
					'libs/tumblr-photoset/tumblr-photoset.js',
					'theme/js/theme.js'
				],
				dest: 'theme.js',
			},
			css: {
				src: ['theme/css/screen.css', 'theme/css/pxuPhotoset.css'],
				dest: 'theme.css',
			}
		},
		watch: {
		  scripts: {
			files: ['theme/js/*.js'],
			tasks: ['concat:js'],
			options: {
			  spawn: false,
			},
		  },
		  styles: {
			files: ['theme/sass/*', 'theme/sass/post_types/*'],
			tasks: ['compass', 'concat:css'],
			options: {
			  spawn: false,
			},
		  },
		  templates: {
			files: ['theme/templates/*', 'theme/templates/partials/*'],
			tasks: ['preprocess'],
			options: {
			  spawn: false,
			},
		  },
		},
	});

	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask(
		'default', ['preprocess', 'compass', 'concat', 'watch']
	);
}
