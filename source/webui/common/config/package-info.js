'use strict';
angular.module('common.config')
    .value('PackageInfo', {
        name: 'ivqBlog',
        author: 'Terry Chen',
        copyrightYear: new Date().getFullYear()
    });