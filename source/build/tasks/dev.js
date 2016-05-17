import gulp from 'gulp';
import rs from 'run-sequence';
let runSequence = rs.use(gulp);

/**
 * gulp dev
 */
gulp.task("dev", ['clean'], (cb) => {
    runSequence(
        ['copy', 'sass', 'templateCache'],
        ['inject:dev_index', 'inject:dev_admin_index', 'inject:dev_login'],
        cb);
});