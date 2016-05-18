import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import setting from '../setting';

gulp.task('es6:dev', () => {
    gulp.src(['webui/**/*.js', '!webui/**/*.spec.js'])
        .pipe(babel())
        .pipe(gulp.dest(setting.dest.root))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('es6:prod', ['es6:front', 'es6:admin']);

gulp.task('es6:front', () => {
    return gulp.src(['webui/app/app.js', 'webui/app/**/*.js', 'webui/common/**/*.js', '!webui/app/admin/*.js', '!webui/app/**/*.spec.js'])
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('es6:admin', () => {
    return gulp.src(['webui/admin/app/app.js', 'webui/admin/app/**/*.js', 'webui/common/**/*.js', 'webui/admin/common/**/*.js', '!webui/admin/app/**/*.spec.js'])
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.root));
});