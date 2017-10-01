var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function() {
  return gulp.src([
  		'./js/partials/global.js', 
  		'./js/partials/quickys.js',
  		'./js/partials/navigation.js',
  		'./js/partials/make-scheme.js',
  		'./js/partials/notification.js',
  		'./js/partials/exercise-settings.js',
  		'./js/partials/exercise.js',
  		'./js/partials/popup-screen.js',
  		'./js/partials/navigate-to.js',
  		'./js/partials/feedback.js',
  		'./js/partials/progression.js',
  		'./js/partials/audio-engine.js',
  		'./js/partials/onboarding.js'
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
    './html/exercise.html',
    './html/main-close.html',
    './html/nav.html',
    './html/scripts.html'
])
.pipe(concat('index.html'))
.pipe(gulp.dest('./'));
});