"use strict";
var gulp = require('gulp'),
    templateCache = require('gulp-angular-templatecache'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    gulpif = require('gulp-if'),
    args = require('yargs').argv,
    setting = require('../setting'),
    isProductVersion = args.env === 'production';

gulp.task('templateCache', ['templateCache:front', 'templateCache:admin']);

gulp.task('templateCache:front', function () {
    return gulp.src(setting.templateCache.front.src)
        .pipe(templateCache('templates.js', {
            module: 'app.templates',
            standalone: true
        }))
        .pipe(gulpif(isProductVersion, uglify()))
        .pipe(gulpif(isProductVersion, rev()))
        .pipe(gulp.dest(setting.dest.root))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('templateCache:admin', function () {
    return gulp.src(setting.templateCache.admin.src)
        .pipe(templateCache('templates.js', {
            module: 'app.admin.templates',
            standalone: true
        }))
        .pipe(gulpif(isProductVersion, uglify()))
        .pipe(gulpif(isProductVersion, rev()))
        .pipe(gulp.dest(setting.dest.admin))
        .pipe(browserSync.reload({ stream: true }));
});