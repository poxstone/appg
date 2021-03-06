// Dependencias
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Configuración de la tarea 'demo'
gulp.task('demo', function () {
  gulp.src('js/source/*.js')
  .pipe(concat('todo.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js/build/'))
});

// gulp.watch('js/source/*.js', ['demo']);

// css
gulp.task('css', function () {
  gulp.src('../appg/static/css/style.styl')
    .pipe(stylus({compress: false, paths: ['source/stylus']}))
    .pipe(stylus({use: [nib()]}))
    //.pipe(autoprefixer())
    //.pipe(minifyCSS())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('../appg/static/css'))
});

// html
gulp.task('html', function() {
  gulp.src('../appg/templates/jade/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('../appg/templates'))
});

gulp.task('html2', function() {
  gulp.src('../appg/static/html/jade/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('../appg/static/html'))
});

// js
gulp.task('js', function() {
  gulp.src([
  'bower_components/jquery/dist/jquery.js',
  'bower_components/modernizr/modernizr.js'
  ])
  .pipe( concat('output.min.js') ) // concat pulls all our files together before minifying them
  .pipe(uglify())
  .pipe(gulp.dest('build'))
});

// watch
gulp.task('watch', function () {
   gulp.watch('../appg/static/css/stylus/*.styl', ['css']);
   gulp.watch('../appg/static/css/*.styl', ['css']);
   gulp.watch('../../static/components/efor-components/**/*.styl', ['css']);
   gulp.watch('../appg/templates/jade/*.jade', ['html']);
   gulp.watch('../appg/static/html/jade/*.jade', ['html2']);
});

gulp.task('default', ['css', 'html', 'html2']);