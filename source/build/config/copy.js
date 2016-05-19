import gulp from 'gulp';
import jshint from 'gulp-jshint';
import browserSync from 'browser-sync';
import setting from '../setting';

gulp.task('copy', ['copy:favicon', 'copy:lib', 'copy:fonts', 'copy:assets']);

gulp.task('copy:favicon', () => {
    return gulp.src('webui/favicon.ico', {base: 'webui'})
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('copy:lib', () => {
    return gulp.src('lib/**/*', {base: 'webui'})
        .pipe(gulp.dest(setting.dest.lib));
});

gulp.task('copy:fonts', () => {
    gulp.src('webui/fonts/**', {base: 'webui'})
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('copy:assets', () => {
    gulp.src('webui/**/assets/**', {base: 'webui'})
        .pipe(gulp.dest(setting.dest.root));
});
