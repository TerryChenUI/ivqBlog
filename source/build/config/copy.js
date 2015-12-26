"use strict";
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync'),
    setting = require('../setting');

gulp.task('copy', ['copy:favicon', 'copy:lib', 'copy:plugins', 'copy:assets', 'copy:js']);

gulp.task('copy:favicon', function () {
    return gulp.src('favicon.ico', {base: 'src'})
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('copy:lib', function () {
    return gulp.src('lib/**/*', {base: 'src'})
        .pipe(gulp.dest(setting.dest.lib));
});

gulp.task('copy:plugins', function () {
    gulp.src('src/plugins/**', {base: 'src'})
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('copy:assets', function () {
    gulp.src('src/**/assets/**', {base: 'src'})
        .pipe(gulp.dest(setting.dest.root));
});

//sass
//gulp.task('copy:sass', ['copy:sass_front', 'copy:sass_admin']);
//
//gulp.task('copy:sass_front', function () {
//    gulp.src(['src/**/*.scss', '!src/admin/**/*.scss'], {base: 'src'})
//        .pipe(gulp.dest('dist/'));
//});
//
//gulp.task('copy:sass_admin', function () {
//    gulp.src('src/admin/**/*.scss', {base: 'src/admin'})
//        .pipe(gulp.dest('dist/admin/'))'
//});

gulp.task('copy:js', ['copy:js_common', 'copy:js_front', 'copy:js_admin']);

gulp.task('copy:js_common', function () {
    gulp.src(setting.path.js.common, {base: 'src'})
        .pipe(gulp.dest(setting.dest.root))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('copy:js_front', function () {
    gulp.src(setting.path.js.front, {base: 'src'})
        .pipe(gulp.dest(setting.dest.root))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('copy:js_admin', function () {
    gulp.src(setting.path.js.admin, {base: 'src/admin'})
        .pipe(gulp.dest(setting.dest.admin))
        .pipe(browserSync.reload({ stream: true }));
});
