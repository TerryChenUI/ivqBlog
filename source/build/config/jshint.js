"use strict";
var gulp = require("gulp"),
    jshint = require('gulp-jshint');

gulp.task('jshint', function () {
    gulp.src(['webui/app/**/*.js', 'webui/common/**/*.js', 'webui/admin/**/*.js', 'webui/admin/common/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});