"use strict";
var gulp = require("gulp"),
    runSequence = require('run-sequence').use(gulp);

/**
 * gulp debug
 * 在WebStorm调用启动serverDebug后，不需要再调用nodemon task
 */
gulp.task("debug", function () {
    runSequence(
        ['dev'],
        ['watch', 'browser-sync']
    );
});