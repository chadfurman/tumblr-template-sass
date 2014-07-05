var gulp       = require('gulp');
var browserify = require('browserify');
var preprocess = require('gulp-preprocess');
var compass    = require('gulp-compass');
var watch      = require('gulp-watch');
var clipboard  = require('gulp-clipboard');
var source     = require('vinyl-source-stream');

gulp.task('scripts', function() {
    return browserify('./theme/js/main.js')
        .bundle()
        .on('error', watchScripts)
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('./build/theme.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'));
});

gulp.task('html', function() {
  gulp.src('theme/templates/main.tumblr')
    .pipe(preprocess()) //To set environment variables in-line
    .on('error', watchHtml)
    .pipe(clipboard())
    .pipe(gulp.dest('build/theme.tumblr'));
});

gulp.task('styles', function() {
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
  if (errorMsg) {
    console.log(errorMsg);
  }
  watchStyles();
  watchHtml();
  watchScripts();

}

function watchStyles() {
  gulp.watch('theme/sass/**/*.scss', ['styles']);
}
function watchHtml() {
  gulp.watch('theme/templates/**/*.tumblr', ['html']);
}
function watchScripts() {
  gulp.watch(['theme/js/**/*.js', 'theme/libs/**/*.js'], ['scripts']);
}
