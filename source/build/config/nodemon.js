import gulp from 'gulp';
import browserSync from 'browser-sync';
import setting from '../setting';
import nodemon from 'gulp-nodemon';

gulp.task('nodemon', () => {
    nodemon({
        script: setting.dest.server + 'bin/www',
        ext: 'html css js',
        watch: [
            setting.dest.server + 'bin',
            setting.dest.server + 'config',
            setting.dest.server + 'models',
            setting.dest.server + 'routes',
            setting.dest.server + 'app.js',
            setting.dest.server + 'db.js'
        ],
        ignore: [
            setting.dest.server + 'node_modules/**'
        ]
    })
        .on('start', () => {
            console.log('start');
        })
        .on('restart', () => {
            console.log('restarted');
            setTimeout(() => {
                browserSync.reload({stream: false});
            }, 1000);
        })
        .on('error', (err) => {
            // Make sure failure causes gulp to exit
            throw err;
        });
});
