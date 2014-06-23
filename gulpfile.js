var gulp       = require('gulp');
var browserify = require('browserify');
var preprocess = require('gulp-preprocess');
var compass    = require('gulp-compass');
var watch      = require('gulp-watch');
var source     = require('vinyl-source-stream');

gulp.task('scripts', function() {
    return browserify('./theme/js/main.js')
        .bundle()
        .on('error', console.log)
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('./build/theme.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'));
});

gulp.task('html', function() {
  gulp.src('theme/templates/main.tumblr')
    .pipe(preprocess()) //To set environment variables in-line
    .on('error', console.log)
    .pipe(gulp.dest('build/theme.tumblr'))
});

gulp.task('styles', function() {
  gulp.src('theme/sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'build',
      sass: 'theme/sass',
      import_path: 'theme/libs/bower_components/foundation/scss'
    }))
    .on('error', console.log)
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function () {
  gulp.watch('theme/sass/**/*.scss', ['styles']);
  gulp.watch('theme/templates/**/*.tumblr', ['html']);
  gulp.watch(['theme/js/**/*.js', 'theme/libs/**/*.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'html', 'styles', 'watch']);
