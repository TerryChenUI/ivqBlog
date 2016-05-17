import gulp from 'gulp';
import rs from 'run-sequence';
let runSequence = rs.use(gulp);

/**
 * gulp server --env production
 */
gulp.task("server", () => {
    runSequence(
        ['prod'],
        ['nodemon'],
        ['browser-sync']
    );
});