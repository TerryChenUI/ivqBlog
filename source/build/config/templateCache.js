import gulp from 'gulp';
import templateCache from 'gulp-angular-templatecache';
import rev from 'gulp-rev';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import gulpif from 'gulp-if';
import {argv} from 'yargs';
import setting from '../setting';
let isProductVersion = argv.env === 'production';

gulp.task('templateCache', ['templateCache:front', 'templateCache:admin']);

gulp.task('templateCache:front', () => {
    return gulp.src(setting.templateCache.front.src)
        .pipe(templateCache('templates.js', {
            module: 'app.templates',
            standalone: true
        }))
        .pipe(gulpif(isProductVersion, uglify()))
        .pipe(gulpif(isProductVersion, rev()))
        .pipe(gulp.dest(setting.dest.root))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('templateCache:admin', () => {
    return gulp.src(setting.templateCache.admin.src)
        .pipe(templateCache('templates.js', {
            module: 'app.admin.templates',
            standalone: true
        }))
        .pipe(gulpif(isProductVersion, uglify()))
        .pipe(gulpif(isProductVersion, rev()))
        .pipe(gulp.dest(setting.dest.admin))
        .pipe(browserSync.reload({stream: true}));
});