/**
 * Usage: gulp [--noclipboard]
 */
// note that HTML is not in the list because both scripts and styles call HTML when they're done
var defaultTasks = ['watch'];

var argv = require('yargs').argv;
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var browserify = require('browserify');
var preprocess = require('gulp-preprocess');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var clipboard = require('gulp-clipboard');
var source = require('vinyl-source-buffer');

console.log('=====================================================================');
console.log('           Tumblr Template Sass - Gulp compilation script            ');
console.log('=====================================================================');
console.log('Gulp will compile all assets into ./dist/theme.tumblr');
console.log('The HTML with embedded CSS/JS will be copied to your clipboard (or use --noclipboard)');
console.log('After making a change, edit your theme and "select all" then "paste"');
console.log('=====================================================================');

gulp.task('scripts', function () {
  return compileScripts();
});

gulp.task('styles', function () {
  return compileStyles();
});

gulp.task('html', ['scripts', 'styles'], function () {
  return compileHtml();
});

gulp.task('watch', ['html', 'scripts', 'styles'], watchTask);

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
    var returnObj = gulp.src('theme/templates/main.tumblr')
        .pipe(preprocess())
        .on('error', watchTask ) // restart watch task on error
        .pipe(gulpif(!(argv['noclipboard']), clipboard()))
        .pipe(rename('theme.tumblr'))
        .pipe(gulp.dest('dist/'));

    if (!(argv['noclipboard'])) console.log('Clipboard being prepared... wait for "Finished \'html\'"!');
    return returnObj;
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
    return gulp.src('theme/sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'build',
            sass: 'theme/sass',
            import_path: 'node_modules'
        }))
        .on('error', watchTask)
        .pipe(gulp.dest('build/'));
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
    return browserify('./theme/js/main.js')
        .bundle()
        .on('error', watchTask) // restart watch task on error
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('theme.js'))
        .pipe(concat('./build/theme.js'))
        .pipe(gulp.dest("./"));
}

/**
 * Watch
 *
 * Re-compile styles, scripts, and HTML if anything changes
 *
 * @returns void
 */
function watchTask(error) {
    handleError(error);
    watchHtml();
    watchScripts();
    watchStyles();
}

function watchHtml(error) {
    handleError(error);
    gulp.watch(['theme/templates/**/*.tumblr'], ['html']);
}

function watchScripts(error) {
    handleError(error);
    gulp.watch(['theme/js/*.js', 'theme/js/**/*.js', 'theme/libs/**/*.js'], ['html']);
}

function watchStyles(error) {
    handleError(error);
    gulp.watch(['theme/sass/*.scss', 'theme/sass/**/*.scss'], ['html']);
}

function handleError(error) {
    var message = error;
    if (typeof error === 'function' ) return;
    if (typeof error === 'object' && error.hasOwnProperty('message')) message = error.message;
    if (message !== undefined) console.log('Error: ' + message);
}
