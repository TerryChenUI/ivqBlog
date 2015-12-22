"use strict";
var gulp = require("gulp"),
    setting = require('../setting'),
    nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
    nodemon({
        script: setting.dest.root + 'bin/www',
        ext: 'html css js',
        watch: [
            setting.dest.root + 'bin',
            setting.dest.root + 'models',
            setting.dest.root + 'routes',
            setting.dest.root + 'app.js',
            setting.dest.root + 'db.js'
        ],
        ignore: [
            setting.dest.root + 'node_modules/**'
        ]
    })
        .on('start', function () {
            console.log('start');
        })
        .on('restart', function () {
            console.log('restarted');
        })
        .on('error', function (err) {
            // Make sure failure causes gulp to exit
            throw err;
        });
});
