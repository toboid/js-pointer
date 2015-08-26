'use strict';

require('babel/register')({ only: /tests/ });

var babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    del = require('del');

gulp.task('clean:lib', function (callback) {
  del(['lib/**/*', '!dist/mobile/deploy.json'], callback);
});

gulp.task('babel', ['clean:lib'], function () {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('lint', ['babel'], function () {
  return gulp.src(['**/*.js', '!lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['babel', 'lint'], function () {
  return gulp.src('test/*.js', { read: false })
    .pipe(mocha());
});

gulp.task('default', ['test']);

gulp.task('watch', function () {
  gulp.watch(['**/*.js', '!lib/**/*.js'], ['test']);
});
