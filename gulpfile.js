"use strict";

//Require Gulp and 3rd Party Libraries
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

//Concat JS files into one file
//Switch .src array with your actual files
//Makes one file called app.js in this example
//Also provides source map for easy debugging
/*
  MAKE SURE YOU PUT THE JS FILES IN THE ORDER
  YOU WANT THEM CONCATENATED IN
*/
gulp.task("concatScripts", function() {
  return gulp.src([
      //Replace these with your own.
      'js/jquery.js',
      'js/sticky/jquery.sticky.js',
      'js/main.js'
      ])
  .pipe(maps.init()) //Source map here
  .pipe(concat('app.js')) //Rename to desired file, be sure to rename elsewhere
  .pipe(maps.write('./')) //Path relative to your gulp.dest (sibling of app.js)
  .pipe(gulp.dest('js')); //Your destination folder
});

//Minify your concatenated JS files
gulp.task("minifyScripts", function(){
	return gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js')) //Renames the app.js to app.min.js
		.pipe(gulp.dest('js'));
});

//Compile your Sass into CSS
gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss") //Change scss/application.scss to whatever your project's sass is
    .pipe(maps.init()) //Sass source maps
    .pipe(sass())
    .pipe(maps.write('./')) //Path relative to your gulp.dest
    .pipe(gulp.dest('css'));
});

//Provide file(s) to be watched inside watch() method
//Basic globbing pattern given looks in scss folder any subdirectories
//Then any file with a .scss extension
gulp.task('watchSass', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
})

//Run gulp build to concatenate, minify, and compile in one go
gulp.task("build", ['minifyScripts', 'compileSass']);

//For production
gulp.task("default", ['build']);
