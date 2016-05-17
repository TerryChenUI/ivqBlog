import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';
import browserSync from 'browser-sync';
import rev from 'gulp-rev';
import gulpif from 'gulp-if';
import {argv} from 'yargs';
import setting from '../setting';
let isProductVersion = argv.env === 'production';

gulp.task('sass', ['sass:front', 'sass:admin']);

gulp.task('sass:front', () => {
    gulp.src('webui/app.scss')
        .pipe(gulpif(!isProductVersion, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(!isProductVersion, sourcemaps.write()))
        .pipe(gulpif(isProductVersion, cleanCSS()))
        .pipe(gulpif(isProductVersion, rev()))
        .pipe(gulp.dest(setting.dest.root))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:admin', () => {
    gulp.src('webui/admin/app.scss')
        .pipe(gulpif(!isProductVersion, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(!isProductVersion, sourcemaps.write()))
        .pipe(gulpif(isProductVersion, cleanCSS()))
        .pipe(gulpif(isProductVersion, rev()))
        .pipe(gulp.dest(setting.dest.admin))
        .pipe(browserSync.reload({stream: true}));
});