const gulp = require('gulp');
const runSequence = require('run-sequence');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const glob = require('glob');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const cleanify = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');

gulp.task('buildJs', () => {
  return browserify({
    entries: [glob.sync('./src/**/*.js')]
  })
  .transform(babelify.configure({
    presets: ['es2015']
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./dist'));
});

gulp.task('minifyHtml', () => {
  return gulp.src('src/**/*html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./dist'));
});

gulp.task('minifyCss', () => {
  return gulp.src('src/assets/styles/*.css')
  .pipe(cleanify({compability: 'ie8'}))
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['browserSync'], () => {
  watch(['src/**/*.js', 'src/**/*.html', 'src/assets/styles/*.css'], () => {
    gulp.start('build');
  });
});

gulp.task('browserSync',() => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  });
});

gulp.task('build', () => {
    runSequence(['buildJs', 'minifyCss', 'minifyHtml'], () => {
      if(browserSync.active){
        gulp.start('reload');
      }
    });
});

gulp.task('reload', function(){
	browserSync.reload();
});

gulp.task('serve', (callback) => {
    runSequence(['build', 'browserSync', 'watch'], callback);
});
