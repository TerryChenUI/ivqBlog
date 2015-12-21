"use strict";
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    setting = require('../setting');

gulp.task('concat', ['contact:front', 'contact:admin']);

gulp.task('contact:front', function () {
    return gulp.src(['src/app/app.js', 'src/app/**/*.js', 'src/common/**/*.js', '!src/app/**/*.spec.js', '!src/app/**/*.scenario.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('contact:admin', function () {
    return gulp.src(['src/admin/app/app.js', 'src/admin/app/**/*.js', 'src/common/**/*.js', 'src/admin/common/**/*.js', '!src/admin/app/**/*.spec.js', '!src/admin/app/**/*.scenario.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.admin));
});

