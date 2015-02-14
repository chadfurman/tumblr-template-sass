/**
 * Usage: gulp [--nowatch] [--clipboard]
 */
// note that HTML is not in the list because both scripts and styles call HTML when they're done
var defaultTasks = ['scripts', 'styles', 'watch'];

var argv = require('yargs').argv;
var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var browserify = require('browserify');
var preprocess = require('gulp-preprocess');
var compass = require('gulp-compass');
var watch = require('gulp-watch');
var clipboard = require('gulp-clipboard');
var source = require('vinyl-source-stream');

gulp.task('scripts', function () {
    return compileScripts();
});

gulp.task('styles', function () {
    return compileStyles();
});

gulp.task('html', function () {
    return compileHtml();
});


gulp.task('watch', watchTask);

if (argv.nowatch) {
	defaultTasks = defaultTasks.filter(function (value) { return value != 'watch' });
}

gulp.task('default', defaultTasks);

/**
 * Compile HTML
 *
 * 'html' task code
 *
 * @returns {*}
 */
function compileHtml()
{
    return gulp.src('theme/templates/main.tumblr')
        .pipe(preprocess())
        .on('error', watchHtml) // restart watch task on error
        .pipe(gulpif(argv.clipboard, clipboard()))
        .pipe(rename('theme.tumblr'))
        .pipe(gulp.dest('dist/'));
}

/**
 * Compile Styles
 *
 * 'styles' task code
 *
 * @returns {*}
 */
function compileStyles()
{
    var styles = gulp.src('theme/sass/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: 'build',
            sass: 'theme/sass',
            import_path: 'theme/libs/bower_components/foundation/scss'
        }))
        .on('error', watchStyles)
        .pipe(gulp.dest('build/'));

    return styles;
}

/**
 * Compile Scripts
 *
 * 'scripts' task code
 *
 * @returns {*}
 */
function compileScripts()
{
    var scripts = browserify('./theme/js/main.js')
        .bundle()
        .on('error', watchScripts) // restart watch task on error
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('./build/theme.js'))
        .pipe(gulp.dest("./"));

    return scripts;
}


/** Setup watchers **/

/**
 * Watch Task
 *
 * Starts all watchers
 *
 * @returns void
 */
function watchTask(errorMsg) {
	if (argv.nowatch) {
		return;
	}

    watchStyles(errorMsg);
    watchScripts(errorMsg);
    watchHtml(errorMsg);
}

/**
 * Watch Styles
 *
 * Setups up a watcher on the sass files
 *
 * @returns void
 */
function watchStyles(errorMsg) {
	if (argv.nowatch) {
		return;
	}

    gulp.watch('theme/sass/**/*.scss', ['styles']);
    logError(errorMsg);
}

/**
 * Watch HTML
 *
 * Sets up a watcher on the HTML template partials
 *
 * @returns void
 */
function watchHtml(errorMsg) {
	if (argv.nowatch) {
		return;
	}

    gulp.watch(['build/theme.js', 'build/theme.css', 'theme/templates/**/*.tumblr'], ['html']);
    logError(errorMsg);
}

/**
 * Watch Scripts
 *
 * Sets up a watcher on the javascript libraries etc.
 *
 * @returns void
 */
function watchScripts(errorMsg) {
	if (argv.nowatch) {
		return;
	}

    gulp.watch(['theme/js/**/*.js', 'theme/libs/**/*.js'], ['scripts']);
    logError(errorMsg);
}

/**
 * Log Error
 *
 * Simple console.log wrapper to avoid logging undefined messages
 *
 * @param string errorMsg the message to log
 */
function logError(errorMsg) {
    if (errorMsg) {
        console.log(errorMsg);
    }
}
