"use strict";
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    rev = require('gulp-rev'),
    gulpif = require('gulp-if'),
    args = require('yargs').argv,
    setting = require('../setting'),
    isProductVersion = args.env === 'production';

gulp.task('sass', ['sass:front', 'sass:admin']);

gulp.task('sass:front', function () {
    gulp.src('webui/app.scss')
        .pipe(gulpif(!isProductVersion, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(!isProductVersion, sourcemaps.write()))
        .pipe(gulpif(isProductVersion, cleanCSS()))
        .pipe(gulpif(isProductVersion, rev()))
        .pipe(gulp.dest(setting.dest.root))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('sass:admin', function () {
    gulp.src('webui/admin/app.scss')
        .pipe(gulpif(!isProductVersion, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(!isProductVersion, sourcemaps.write()))
        .pipe(gulpif(isProductVersion, cleanCSS()))
        .pipe(gulpif(isProductVersion, rev()))
        .pipe(gulp.dest(setting.dest.admin))
        .pipe(browserSync.reload({ stream: true }));
});