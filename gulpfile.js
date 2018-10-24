'use strict';

var fs = require('fs');

var gulp = require('gulp');
var plumber = require ('gulp-plumber');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function () {
  var config = JSON.parse(String(fs.readFileSync('./.jshintrc', 'utf8')));
  return gulp.src(['./gulpfile.js', './index.js', './test/sloc.test.js'])
    .pipe(plumber())
    .pipe(jshint(config))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', gulp.task('lint'));

var packageSloc = function () {
  var sloc = require('./index');
  return gulp.src(['./gulpfile.js', './index.js'])
      .pipe(plumber())
      .pipe(sloc());
};

var packageSlocFile = function () {
  var sloc = require('./index');
  return gulp.src(['./gulpfile.js', './index.js'])
      .pipe(plumber())
      .pipe(sloc({
        reportType: 'json'
      }))
      .pipe(gulp.dest('./'));
};

gulp.task('sloc', gulp.series('test', packageSloc, packageSlocFile));
gulp.task('sloc-dev', packageSloc);
gulp.task('sloc-dev-file', packageSlocFile);

gulp.task('default', gulp.series('sloc', function watch() {
  gulp.watch(['./gulpfile.js', './index.js'], function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.start('sloc');
  });
}));

gulp.task('ci', gulp.task('sloc'));
