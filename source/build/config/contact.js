"use strict";
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    setting = require('../setting');

gulp.task('concat', ['contact:front', 'contact:admin']);

gulp.task('contact:front', function () {
    return gulp.src(['webui/app/app.js', 'webui/app/**/*.js', 'webui/common/**/*.js', '!webui/app/admin/*.js', '!webui/app/**/*.spec.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('contact:admin', function () {
    return gulp.src(['webui/admin/app/app.js', 'webui/admin/app/**/*.js', 'webui/common/**/*.js', 'webui/admin/common/**/*.js', '!webui/admin/app/**/*.spec.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.admin));
});

