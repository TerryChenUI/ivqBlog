"use strict";
var gulp = require("gulp"),
	runSequence = require('run-sequence').use(gulp);

/**
 * gulp test_singleRun --env production
 */
gulp.task("test_singleRun", function () {
	runSequence(
        ['prod'],
        ['karma:unit_run', 'karma:e2e_run']
    );
});