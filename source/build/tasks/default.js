import gulp from 'gulp';
import rs from 'run-sequence';
let runSequence = rs.use(gulp);

/**
 * gulp default
 */
gulp.task("default", function () {
    runSequence(
        ['dev'],
        ['nodemon'],
        ['watch', 'browser-sync']
    );
});