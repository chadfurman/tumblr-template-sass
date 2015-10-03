/**
 * Usage: gulp [--clipboard]
 */
// note that HTML is not in the list because both scripts and styles call HTML when they're done
var defaultTasks = ['watch'];

var argv = require('yargs').argv;
var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var browserify = require('browserify');
var preprocess = require('gulp-preprocess');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var clipboard = require('gulp-clipboard');
var source = require('vinyl-source-buffer');
var addsrc = require('gulp-add-src');

console.log('=====================================================================');
console.log('           Tumblr Template Sass - Gulp compilation script            ');
console.log('=====================================================================');
console.log('Gulp will compile all assets into ./dist/theme.tumblr');
console.log('The HTML with embedded CSS/JS will be copied to your clipboard');
console.log('After making a change, edit your theme and "select all" then "paste"');
console.log('=====================================================================');

gulp.task('scripts', function () {
  compileScripts();
});

gulp.task('styles', function () {
  compileStyles();
});

gulp.task('html', ['scripts', 'styles'], function () {
  compileHtml();
});

gulp.task('watch', ['html'], watchTask);

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
        .on('error', watchTask) // restart watch task on error
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
    return gulp.src('theme/sass/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
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
        //.pipe(concat('./build/theme.js'))
        .pipe(gulp.dest("./"));
}

/**
 * Watch
 *
 * Re-compile styles, scripts, and HTML if anything changes
 *
 * @returns void
 */
function watchTask(errorMsg) {
    gulp.watch(['build/theme.js', 'build/theme.css', 'theme/templates/**/*.tumblr'], ['html']);
    gulp.watch(['theme/js/*.js', 'theme/js/**/*.js', 'theme/libs/**/*.js'], ['html']);
    gulp.watch(['theme/sass/*.scss', 'theme/sass/**/*.scss'], ['html']);
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
