'use strict';
var gulp = require('gulp'),
    server = require('karma').Server,
    libraries = require('./common'),
    _und = require('underscore'),
    setting = require('../setting');

var jsLibraries = _und.uniq(libraries.front.js.concat(libraries.admin.js));
var unitPath = '/../../test/config/unit.js';
var e2ePath = '/../../test/config/e2e.js';

/**
 * Run test for debug
 */
gulp.task('karma:unit', function (done) {
    var karma = new server({
        singleRun: false,
        files: jsLibraries.concat([
            setting.dest.root + 'app/app.js',
            setting.dest.root + 'templates.js',
            setting.dest.root + 'app/**/*.js',
            setting.dest.root + 'common/**/*.js',
            setting.dest.root + 'admin/app/app.js',
            setting.dest.root + 'admin/templates.js',
            setting.dest.root + 'admin/app/**/*.js',
            setting.dest.root + 'admin/common/**/*.js',
            './src/**/*.spec.js'
        ]),
        configFile: __dirname + unitPath
    }, done);
    karma.start();
});

gulp.task('karma:e2e', function (done) {
    var karma = new server({
        singleRun: false,
        files: [
            './src/**/*.scenario.js'
        ],
        proxies:{
            '/': 'http://localhost:' + setting.connect.port.dev + '/'
        },
        configFile: __dirname + e2ePath
    }, done);
    karma.start();
});

/**
 * Run single test
 */
gulp.task('karma:unit_run', function (done) {
    var karma = new server({
        singleRun: true,
        files: jsLibraries.concat([
            setting.dest.root + 'app-*.js',
            setting.dest.root + 'templates-*.js',
            setting.dest.root + 'admin/app-*.js',
            setting.dest.root + 'admin/templates-*.js',
            setting.dest.root + './src/**/*.spec.js'
        ]),
        configFile: __dirname + unitPath
    }, done);
    karma.start();
});

gulp.task('karma:e2e_run', function (done) {
    var karma = new server({
        singleRun: true,
        files: [
            './src/**/*.scenario.js'
        ],
        configFile: __dirname + e2ePath,
        proxies: {
            '/': 'http://localhost:' + setting.connect.port.prod + '/'
        }
    }, done);
    karma.start();
});