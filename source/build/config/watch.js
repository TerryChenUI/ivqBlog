import gulp from 'gulp';
import setting from '../setting';

gulp.task('watch', () => {
    gulp.watch(setting.html.index, ['inject:dev_index']);
    gulp.watch(setting.html.admin_index, ['inject:dev_admin_index']);
    gulp.watch(setting.html.login, ['inject:dev_login']);

    gulp.watch(setting.templateCache.front.src, ['templateCache:front']);
    gulp.watch(setting.templateCache.admin.src, ['templateCache:admin']);

    gulp.watch(['webui/**/*.scss', '!webui/admin/**/*.scss'], ['sass:front']);
    gulp.watch('webui/admin/**/*.scss', ['sass:admin']);

    gulp.watch(['webui/**/*.js', '!webui/**/*.spec.js'], ['es6:watch']);
});