'use strict';
var gulp = require("gulp"),
    inject = require('gulp-inject'),
    browserSync = require('browser-sync'),
    libraries = require('./common'),
    setting = require('../setting');

var injectConfig = [
    {
        name: 'inject:dev_index',
        src: setting.html.index,
        dest: setting.dest.root,
        config: {
            src: {
                css: libraries.front.css.concat([
                    setting.dest.root + 'app.css'
                ]),
                js: libraries.front.js.concat([
                    'webui/app/app.js',
                    setting.dest.root + 'templates.js',
                    'webui/app/**/*.js',
                    'webui/common/**/*.js',
                    '!webui/app/**/*.spec.js'
                ])
            }
        },
        filters: {
            css: [
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ],
            js: [
                {"pattern": "/webui", "replaceStr": ""},
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ]
        }
    },
    {
        name: 'inject:dev_admin_index',
        src: setting.html.admin_index,
        dest: setting.dest.admin,
        config: {
            src: {
                css: libraries.admin.css.concat([
                    setting.dest.root + 'admin/app.css'
                ]),
                js: libraries.admin.js.concat([
                    'webui/admin/app/app.js',
                    setting.dest.root + 'admin/templates.js',
                    'webui/admin/app/**/*.js',
                    'webui/admin/common/**/*.js',
                    'webui/common/**/*.js',
                    '!webui/app/**/*.spec.js'
                ])
            }
        },
        filters: {
            css: [
                {"pattern": "/webui", "replaceStr": ""},
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ],
            js: [
                {"pattern": "/webui/common", "replaceStr": "../common"},
                {"pattern": "/webui", "replaceStr": ""},
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ]
        }
    },
    {
        name: 'inject:dev_login',
        src: setting.html.login,
        dest: setting.dest.admin,
        config: {
            src: {
                css: libraries.admin.css.concat([
                    setting.dest.root + 'admin/app.css'
                ]),
                js: libraries.admin.js.concat([
                    'webui/admin/app/app.js',
                    setting.dest.root + 'admin/templates.js',
                    'webui/admin/app/login/login.js',
                    'webui/admin/common/**/*.js',
                    'webui/common/**/*.js',
                    '!webui/app/**/*.spec.js'
                ])
            }
        },
        filters: {
            css: [
                {"pattern": "/webui/plugins", "replaceStr": "/plugins"},
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ],
            js: [
                {"pattern": "/webui/common", "replaceStr": "../common"},
                {"pattern": "/webui", "replaceStr": ""},
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ]
        }
    },
    {
        name: 'inject:prod_index',
        src: setting.html.index,
        dest: setting.dest.root,
        config: {
            src: {
                css: [
                    setting.dest.root + 'third-party-*.css',
                    setting.dest.root + 'app-*.css'
                ],
                js: [
                    setting.dest.root + 'third-party-*.js',
                    setting.dest.root + 'app-*.js',
                    setting.dest.root + 'templates-*.js'
                ]
            }
        },
        filters: {
            css: [
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ],
            js: [
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ]
        }
    },
    {
        name: 'inject:prod_admin_index',
        src: setting.html.admin_index,
        dest: setting.dest.admin,
        config: {
            src: {
                css: [
                    setting.dest.root + 'third-party-*.css',
                    setting.dest.root + 'admin/app-*.css'
                ],
                js: [
                    setting.dest.root + 'admin/third-party-*.js',
                    setting.dest.root + 'admin/app-*.js',
                    setting.dest.root + 'admin/templates-*.js'
                ]
            }
        },
        filters: {
            css: [
                {"pattern": "/webui/plugins/", "replaceStr": "/plugins/"},
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ],
            js: [
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ]
        }
    },
    {
        name: 'inject:prod_login',
        src: setting.html.login,
        dest: setting.dest.admin,
        config: {
            src: {
                css: [
                    setting.dest.root + 'third-party-*.css',
                    setting.dest.root + 'admin/app-*.css'
                ],
                js: [

                    setting.dest.root + 'admin/app-*.js',
                    setting.dest.root + 'admin/templates-*.js'
                ]
            }
        },
        filters: {
            css: [
                {"pattern": "/webui/plugins/", "replaceStr": "/plugins/"},
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ],
            js: [
                {"pattern": "/" + setting.dest.rootOg, "replaceStr": ""}
            ]
        }
    }
];

for (var i = 0; i < injectConfig.length; i++) {
    (function (i) {
        var task = injectConfig[i];
        gulp.task(task.name, function () {
            var target = gulp.src(task.src);
            var cssSources = gulp.src(task.config.src.css, {read: false});
            var jsSources = gulp.src(task.config.src.js, {read: false});

            return target.pipe(inject(cssSources, {
                transform: function (filePath) {
                    return '<link rel="stylesheet" type="text/css" href="' + getPath(filePath, task.filters.css) + '" />';
                }
            }))
                .pipe(inject(jsSources, {
                    transform: function (filePath) {
                        return '<script type="text/javascript" src="' + getPath(filePath, task.filters.js) + '"></script>';
                    }
                }))
                .pipe(gulp.dest(task.dest))
                .pipe(browserSync.reload({ stream: true }));
        });

        function getPath(filePath, filters) {
            for (var i = 0; i < filters.length; i++) {
                var filter = filters[i];
                if (filePath.match(filter.pattern)) {
                    return filePath.replace(filter.pattern, filter.replaceStr);
                }
            }
            return filePath;
        }
    })(i);
}

