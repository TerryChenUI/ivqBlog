"use strict";
var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    setting = require('../setting');

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: setting.port.express, //express 端口
        port: setting.port.browserPort,
        browser: "google chrome"
    });
});