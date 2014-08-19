var gulp = require('gulp');
var browserify = require('browserify');
var preprocess = require('gulp-preprocess');
var compass = require('gulp-compass');
var watch = require('gulp-watch');
var clipboard = require('gulp-clipboard');
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
        .pipe(clipboard())
        .pipe(gulp.dest('build/theme.tumblr'));
});

gulp.task('styles', function () {
    gulp.src('theme/sass/*.scss')
        .pipe(compass({
            debug: true,
            config_file: 'config.rb',
            css: 'build',
            sass: 'theme/sass',
            import_path: 'theme/libs/bower_components/foundation/scss'
        }))
        .on('error', watchStyles)
        .pipe(gulp.dest('build/'));
});

gulp.task('watch', watchTask);

gulp.task('default', ['scripts', 'html', 'styles', 'watch']);

function watchTask(errorMsg) {
    watchStyles(errorMsg);
    watchHtml(errorMsg);
    watchScripts(errorMsg);
}

function watchStyles(errorMsg) {
    gulp.watch('theme/sass/**/*.scss', ['styles']);
    logError(errorMsg);
}
function watchHtml(errorMsg) {
    gulp.watch('theme/templates/**/*.tumblr', ['html']);
    logError(errorMsg);
}
function watchScripts(errorMsg) {
    gulp.watch(['theme/js/**/*.js', 'theme/libs/**/*.js'], ['scripts']);
    logError(errorMsg);
}

function logError(errorMsg) {
    if (errorMsg) {
        console.log(errorMsg);
    }
}
