"use strict";
var gulp = require("gulp"),
    runSequence = require('run-sequence').use(gulp);

/**
 * gulp dev
 */
gulp.task("dev", ['clean'], function (cb) {
    runSequence(
        ['copy', 'sass', 'templateCache'],
        ['inject:dev_index', 'inject:dev_admin_index', 'inject:dev_login'],
        cb);
});