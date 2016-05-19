import gulp from 'gulp';
import rs from 'run-sequence';
let runSequence = rs.use(gulp);

/**
 * gulp prod --env production
 */
gulp.task("prod", ['clean'], (cb) => {
    runSequence(
        ['copy:favicon', 'copy:lib', 'copy:fonts', 'copy:assets', 'sass', 'es6:prod', 'templateCache'],
        ['inject:prod_index', 'inject:prod_admin_index', 'inject:prod_login'],
        cb);
});