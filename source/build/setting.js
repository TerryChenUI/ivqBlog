"use strict";

module.exports = {
    dest: {
        server: 'www/',
        rootOg: 'www/ui',
        root: 'www/ui/',
        lib: 'www/ui/lib/',
        admin: 'www/ui/admin/'
    },
    path: {
        js: {
            common: ['src/common/**/*.js', '!src/**/*.spec.js', '!src/**/*.scenario.js'],
            front: ['src/app/**/*.js', '!src/**/*.spec.js', '!src/**/*.scenario.js'],
            admin: ['src/admin/app/**/*.js', 'src/admin/common/**/*.js', '!src/**/*.spec.js', '!src/**/*.scenario.js']
        }
    },
    templateCache: {
        front: {
            src: 'src/app/**/*.tpl.html'
        },
        admin: {
            src: ['src/admin/**/*.tpl.html', 'src/admin/common/**/*.tpl.html']
        }
    },
    html: {
        index: 'src/index.html',
        admin_index: 'src/admin/index.html',
        login: 'src/admin/login.html'
    },
    port: {
        express: 'http://localhost:3000',
        browserPort: '5000'
    }
};