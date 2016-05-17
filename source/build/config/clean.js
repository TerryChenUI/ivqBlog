import gulp from 'gulp';
import del from 'del';
import setting from '../setting';

gulp.task('clean', () => {
    return del(
        [
            setting.dest.root,
            'test_out'
        ]
    );
});