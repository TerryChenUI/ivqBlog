import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import setting from '../setting';
import libraries from './common';

gulp.task('concat', ['front:js', 'admin:js']);

//front
gulp.task('front:js', () => {
    return gulp.src(['webui/app/app.js', 'webui/app/**/*.js', 'webui/common/**/*.js', '!webui/app/admin/*.js', '!webui/app/**/*.spec.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.root));
});

//admin
gulp.task('admin:js', () => {
    return gulp.src(['webui/admin/app/app.js', 'webui/admin/app/**/*.js', 'webui/common/**/*.js', 'webui/admin/common/**/*.js', '!webui/admin/app/**/*.spec.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(setting.dest.admin));
});
