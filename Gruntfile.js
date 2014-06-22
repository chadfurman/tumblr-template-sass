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
					importPath: 'theme/libs/bower_components/foundation/scss',
					outputStyle: 'expanded'
				}
			}
		},
		concat: {
			css: {
				src: ['theme/css/screen.css', 'theme/css/pxuPhotoset.css'],
				dest: 'theme.css'
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "./",
					mainConfigFile: "theme/js/require.config",
					name: "theme/js/main.js",
					out: "theme.js"
				}
			}
		},
		watch: {
		  scripts: {
			files: ['theme/js/*.js', 'theme/libs/tumblr-photoset/*.js'],
			tasks: ['requirejs'],
			options: {
			  spawn: false
			}
		  },
		  styles: {
			files: ['theme/sass/*', 'theme/sass/post_types/*'],
			tasks: ['compass', 'concat:css'],
			options: {
			  spawn: false
			}
		  },
		  templates: {
			files: ['theme/templates/*', 'theme/templates/partials/*'],
			tasks: ['preprocess'],
			options: {
			  spawn: false
			}
		  }
		}
	});

	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask(
		'default', ['preprocess', 'compass', 'requirejs', 'concat', 'watch']
	);
}
