"use strict";
var gulp = require("gulp"),
    jshint = require('gulp-jshint');

gulp.task('jshint', function () {
    gulp.src(['src/app/**/*.js', 'src/common/**/*.js', 'src/admin/**/*.js', 'src/admin/common/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});