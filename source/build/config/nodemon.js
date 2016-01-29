"use strict";
var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    setting = require('../setting'),
    nodemon = require('gulp-nodemon');


gulp.task('nodemon', function () {
    nodemon({
        script: setting.dest.server + 'bin/www',
        ext: 'html css js',
        watch: [
            setting.dest.server + 'bin',
            setting.dest.server + 'config',
            setting.dest.server + 'models',
            setting.dest.server + 'routes',
            setting.dest.server + 'app.js',
            setting.dest.server + 'db.js'
        ],
        ignore: [
            setting.dest.server + 'node_modules/**'
        ]
    })
        .on('start', function () {
            console.log('start');
        })
        .on('restart', function () {
            console.log('restarted');
            setTimeout(function () {
                browserSync.reload({ stream: false });
            }, 1000);
        })
        .on('error', function (err) {
            // Make sure failure causes gulp to exit
            throw err;
        });
});
