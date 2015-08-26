'use strict';

var eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('lint', function () {
  return gulp.src(['**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint'], function () {
  return gulp.src('test/*.js', { read: false })
    .pipe(mocha());
});

gulp.task('default', ['test']);

gulp.task('watch', function () {
  gulp.watch(['**/*.js'], ['test']);
});
