"use strict";
var gulp = require('gulp'),
    del = require('del'),
    setting = require('../setting');

gulp.task('clean', function () {
    return del(
        [
            setting.dest.root,
            'test_out'
        ]
    );
});