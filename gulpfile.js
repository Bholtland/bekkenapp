var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('js', function() {
  return gulp.src([
      './js/partials/evaluation-slider.js',
  		'./js/partials/global.js', 
  		'./js/partials/quickys.js',
      './js/partials/notification.js',
  		'./js/partials/navigation.js',
  		'./js/partials/make-scheme.js',
  		'./js/partials/exercise-settings.js',
  		'./js/partials/exercise.js',
  		'./js/partials/popup-screen.js',
  		'./js/partials/navigate-to.js',
  		'./js/partials/feedback.js',
  		'./js/partials/progression.js',
  		'./js/partials/audio-engine.js',
  		'./js/partials/onboarding.js',
      './js/partials/login.js'

  	])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./js/'));
});


gulp.task('html', function() {
return gulp.src([
    './html/head.html',
    './html/main-open.html', 
    './html/globals.html',
    './html/progression.html',
    './html/scheme.html',
    './html/onboarding.html',
    './html/login.html',
    './html/exercise.html',
    './html/main-close.html',
    './html/nav.html',
    './html/scripts.html'
])
.pipe(concat('index.html'))
.pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp.src('./css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./css/**/*.scss', ['sass']);
  gulp.watch('./html/*.html', ['html']);
  gulp.watch('./js/partials/*.js', ['js']);
});
