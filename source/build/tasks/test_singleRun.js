import gulp from 'gulp';
import rs from 'run-sequence';
let runSequence = rs.use(gulp);

/**
 * gulp test_singleRun --env production
 */
gulp.task("test_singleRun", () => {
    runSequence(
        ['prod'],
        ['karma:unit_run', 'karma:e2e_run']
    );
});