"use strict";
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    setting = require('../setting'),
    libraries = require('./common');

gulp.task('concat', ['contact:front', 'contact:admin']);
gulp.task('contact:front', ['front:js', 'front:third:css', 'front:third:js']);
gulp.task('contact:admin', ['admin:js', 'admin:third:css', 'admin:third:js']);

//front
gulp.task('front:js', function () {
    return gulp.src(['webui/app/app.js', 'webui/app/**/*.js', 'webui/common/**/*.js', '!webui/app/admin/*.js', '!webui/app/**/*.spec.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('front:third:css', function () {
    return gulp.src(libraries.front.css)
        .pipe(concat('third-party.css'))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('front:third:js', function () {
    return gulp.src(libraries.front.js)
        .pipe(concat('third-party.js'))
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

gulp.task('admin:third:css', function () {
    return gulp.src(libraries.front.css)
        .pipe(concat('third-party.css'))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.admin));
});

gulp.task('admin:third:js', function () {
    return gulp.src(libraries.admin.js)
        .pipe(concat('third-party.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.admin));
});
