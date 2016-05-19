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

//sass
//gulp.task('copy:sass', ['copy:sass_front', 'copy:sass_admin']);
//
//gulp.task('copy:sass_front', function () {
//    gulp.src(['webui/**/*.scss', '!webui/admin/**/*.scss'], {base: 'webui'})
//        .pipe(gulp.dest('dist/'));
//});
//
//gulp.task('copy:sass_admin', function () {
//    gulp.src('webui/admin/**/*.scss', {base: 'webui/admin'})
//        .pipe(gulp.dest('dist/admin/'))'
//});

//gulp.task('copy:js', ['copy:js_common', 'copy:js_front', 'copy:js_admin']);
//
//gulp.task('copy:js_common', () => {
//    gulp.src(setting.path.js.common, {base: 'webui'})
//        .pipe(gulp.dest(setting.dest.root))
//        .pipe(browserSync.reload({stream: true}));
//});
//gulp.task('copy:js_front', () => {
//    gulp.src(setting.path.js.front, {base: 'webui'})
//        .pipe(gulp.dest(setting.dest.root))
//        .pipe(browserSync.reload({stream: true}));
//});
//gulp.task('copy:js_admin', () => {
//    gulp.src(setting.path.js.admin, {base: 'webui/admin'})
//        .pipe(gulp.dest(setting.dest.admin))
//        .pipe(browserSync.reload({stream: true}));
//});
