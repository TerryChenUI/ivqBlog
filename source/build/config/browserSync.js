import gulp from 'gulp';
import browserSync from 'browser-sync';
import setting from '../setting';

gulp.task('browser-sync', () => {
    browserSync.init(null, {
        proxy: setting.port.express,
        port: setting.port.browserPort,
        browser: "google chrome"
    });
});