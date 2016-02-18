"use strict";
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    setting = require('../setting'),
    libraries = require('./common');

gulp.task('concat', ['front:js', 'admin:js']);

//front
gulp.task('front:js', function () {
    return gulp.src(['webui/app/app.js', 'webui/app/**/*.js', 'webui/common/**/*.js', '!webui/app/admin/*.js', '!webui/app/**/*.spec.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.root));
});

//admin
gulp.task('admin:js', function () {
    return gulp.src(['webui/admin/app/app.js', 'webui/admin/app/**/*.js', 'webui/common/**/*.js', 'webui/admin/common/**/*.js', '!webui/admin/app/**/*.spec.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.admin));
});
