import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import setting from '../setting';
import libraries from './common';

gulp.task('concat:lib', ['lib:css', 'lib:js', 'lib:admin:css', 'lib:admin:js']);

//front
gulp.task('lib:css', () => {
    return gulp.src([
            './lib/bootstrap/css/bootstrap.min.css',
            './lib/sweetalert/sweetalert.css',
            './lib/ueditor/third-party/SyntaxHighlighter/shCoreDefault.css'
        ])
        .pipe(concat('common.min.css'))
        .pipe(gulp.dest(setting.dest.root));
});

gulp.task('lib:js', () => {
    return gulp.src([
            './lib/jquery/jquery.min.js',
            './lib/angular/angular.min.js',
            './lib/angular-cookies/angular-cookies.min.js',
            './lib/angular-ui-router/angular-ui-router.min.js',
            './lib/ui-router-metatags/ui-router-metatags.min.js',
            './lib/sweetalert/sweetalert.min.js',
            './lib/angular-bootstrap/ui-bootstrap.min.js',
            './lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './lib/underscore/underscore-min.js',
            './lib/bootstrap/js/bootstrap.min.js',
            './lib/moment/moment.min.js',
            './lib/moment/zh-cn.js',
            './lib/ueditor/third-party/SyntaxHighlighter/shCore.js'
        ])
        .pipe(concat('common.min.js'))
        .pipe(gulp.dest(setting.dest.root));
});

//admin
gulp.task('lib:admin:css', () => {
    return gulp.src([
            './lib/bootstrap/css/bootstrap.min.css',
            './lib/sweetalert/sweetalert.css',
            './lib/ueditor/third-party/SyntaxHighlighter/shCoreDefault.css'
        ])
        .pipe(concat('common.min.css'))
        .pipe(gulp.dest(setting.dest.admin));
});

gulp.task('lib:admin:js', () => {
    return gulp.src([
            './lib/jquery/jquery.min.js',
            './lib/angular/angular.min.js',
            './lib/angular-cookies/angular-cookies.min.js',
            './lib/angular-ui-router/angular-ui-router.min.js',
            './lib/ng-file-upload/ng-file-upload.min.js',
            './lib/ng-tasty/ng-tasty-tpls.min.js',
            './lib/sweetalert/sweetalert.min.js',
            './lib/angular-breadcrumb/angular-breadcrumb.min.js',
            './lib/underscore/underscore-min.js',
            './lib/checklist-model/checklist-model.js',
            './lib/bootstrap/js/bootstrap.min.js',
            './lib/moment/moment.min.js'
        ])
        .pipe(concat('common.min.js'))
        .pipe(gulp.dest(setting.dest.admin));
});
