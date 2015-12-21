"use strict";
var gulp = require("gulp"),
    setting = require('../setting'),
    nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
    nodemon({
        script: setting.dest.root + 'bin/www',
        ext: 'html css js',
        ignore: [
            setting.dest.root + 'node_modules/**'
        ]
    })
        .on('start', function (cb) {
            console.log('start');
            cb();
        })
        .on('restart', function () {
            console.log('restarted!');
        })
        .on('error', function (err) {
            // Make sure failure causes gulp to exit
            throw err;
        });
});
