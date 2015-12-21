"use strict";
var gulp = require('gulp'),
    del = require('del'),
    setting = require('../setting');

gulp.task('clean', function () {
    return del(
        [
            setting.dest.root + '**/*',
            '!' + setting.dest.root + 'bin/**',
            '!' + setting.dest.root + 'models/**',
            '!' + setting.dest.root + 'node_modules/**',
            '!' + setting.dest.root + 'routes/**',
            '!' + setting.dest.root + 'app.js',
            '!' + setting.dest.root + 'db.js',
            '!' + setting.dest.root + 'package.json',
            'test_out'
        ]
    );
});