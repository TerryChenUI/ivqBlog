import gulp from 'gulp';
import rs from 'run-sequence';
let runSequence = rs.use(gulp);

/**
 * gulp debug
 * 在WebStorm调用启动serverDebug后，不需要再调用nodemon task
 */
gulp.task("debug", () => {
    runSequence(
        ['dev'],
        ['watch', 'browser-sync']
    );
});