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
            common: ['webui/common/**/*.js', '!webui/**/*.spec.js', '!webui/**/*.scenario.js'],
            front: ['webui/app/**/*.js', '!webui/**/*.spec.js', '!webui/**/*.scenario.js'],
            admin: ['webui/admin/app/**/*.js', 'webui/admin/common/**/*.js', '!webui/**/*.spec.js']
        }
    },
    templateCache: {
        front: {
            src: 'webui/app/**/*.tpl.html'
        },
        admin: {
            src: ['webui/admin/**/*.tpl.html', 'webui/admin/common/**/*.tpl.html']
        }
    },
    html: {
        index: 'webui/index.html',
        admin_index: 'webui/admin/index.html',
        login: 'webui/admin/login.html'
    },
    port: {
        express: 'http://localhost:3000',
        browserPort: '5000'
    }
};