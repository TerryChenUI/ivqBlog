import gulp from 'gulp';
import {Server} from 'karma';
import _und from 'underscore';
import libraries from './common';
import setting from '../setting';

const jsLibraries = _und.uniq(libraries.front.js.concat(libraries.admin.js));
const unitPath = '/../../test/config/unit.js';

/**
 * Run test for debug
 */
gulp.task('karma:unit', (done) => {
    var karma = new Server({
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
            './webui/**/*.spec.js'
        ]),
        configFile: __dirname + unitPath
    }, done);
    karma.start();
});

/**
 * Run single test
 */
gulp.task('karma:unit_run', (done) => {
    var karma = new Server({
        singleRun: true,
        files: jsLibraries.concat([
            setting.dest.root + 'app-*.js',
            setting.dest.root + 'templates-*.js',
            setting.dest.root + 'admin/app-*.js',
            setting.dest.root + 'admin/templates-*.js',
            setting.dest.root + './webui/**/*.spec.js'
        ]),
        configFile: __dirname + unitPath
    }, done);
    karma.start();
});