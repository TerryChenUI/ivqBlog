"use strict";
var gulp = require("gulp"),
    runSequence = require('run-sequence').use(gulp);

/**
 * gulp prod --env production
 */
gulp.task("prod", ['clean'], function (cb) {
    runSequence(
        ['copy:lib', 'copy:plugins', 'copy:assets', 'sass', 'concat', 'templateCache'],
        ['inject:prod_index', 'inject:prod_admin_index', 'inject:prod_login'],
        cb);
});