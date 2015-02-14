/**
 * Usage: gulp [--nowatch] [--clipboard]
 */
var defaultTasks = ['scripts', 'html', 'styles', 'watch'];

var argv = require('yargs').argv;
var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var browserify = require('browserify');
var preprocess = require('gulp-preprocess');
var compass = require('gulp-compass');
var watch = require('gulp-watch');
var clipboard = require('gulp-clipboard');
var minifyCss = require('gulp-minify-css');
var source = require('vinyl-source-stream');

gulp.task('scripts', function () {
    return browserify('./theme/js/main.js')
        .bundle()
        .on('error', watchScripts) // restart watch task on error
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('./build/theme.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'));
});

gulp.task('html', function () {
    gulp.src('theme/templates/main.tumblr')
        .pipe(preprocess())
        .on('error', watchHtml) // restart watch task on error
        .pipe(gulpif(argv.clipboard, clipboard()))
	    .pipe(rename('theme.tumblr'))
        .pipe(gulp.dest('build/'));
});

gulp.task('styles', function () {
    gulp.src('theme/sass/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: 'build',
            sass: 'theme/sass',
            import_path: 'theme/libs/bower_components/foundation/scss'
        }))
        .on('error', watchStyles)
		.pipe(minifyCss())
        .pipe(gulp.dest('build/'));
});

gulp.task('watch', watchTask);

if (argv.nowatch) {
	defaultTasks = defaultTasks.filter(function (value) { return value != 'watch' });
}

gulp.task('default', defaultTasks);


/** Helper Functions **/
function watchTask(errorMsg) {
	if (argv.nowatch) {
		return;
	}

    watchStyles(errorMsg);
    watchHtml(errorMsg);
    watchScripts(errorMsg);
}

function watchStyles(errorMsg) {
	if (argv.nowatch) {
		return;
	}

    gulp.watch('theme/sass/**/*.scss', ['styles']);
    logError(errorMsg);
}

function watchHtml(errorMsg) {
	if (argv.nowatch) {
		return;
	}

    gulp.watch('theme/templates/**/*.tumblr', ['html']);
    logError(errorMsg);
}

function watchScripts(errorMsg) {
	if (argv.nowatch) {
		return;
	}

    gulp.watch(['theme/js/**/*.js', 'theme/libs/**/*.js'], ['scripts']);
    logError(errorMsg);
}

function logError(errorMsg) {
    if (errorMsg) {
        console.log(errorMsg);
    }
}
