'use strict';
angular.module('app')
    .config(["$locationProvider", '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {
                        templateUrl: 'layout/master.tpl.html'
                    },
                    'articleList@home': {
                        templateUrl: 'article/list/list.tpl.html',
                        controller: 'ListCtrl'
                    }
                },
                resolve: {
                    category: function () {
                        return null;
                    },
                    tag: function () {
                        return null;
                    },
                    setting: ['SettingService', function (SettingService) {
                        var params = {key: 'setting.meta'};
                        return SettingService.getByKey(params);
                    }]
                },
                metaTags: {
                    title: 'ivqBlog：分享我的前端开发历程',
                    author: function (setting) {
                        return setting['setting.meta.author'];
                    },
                    description: function (setting) {
                        return setting['setting.meta.description']
                    },
                    keywords: function (setting) {
                        return setting['setting.meta.keyword']
                    }
                }
            })
            .state('category', {
                url: '/category/:route',
                views: {
                    '': {
                        templateUrl: 'layout/master.tpl.html'
                    },
                    'articleList@category': {
                        templateUrl: 'article/list/list.tpl.html',
                        controller: 'ListCtrl'
                    }
                },
                resolve: {
                    category: ['$stateParams', 'CategoryService', function ($stateParams, CategoryService) {
                        return CategoryService.getByRoute($stateParams.route);
                    }],
                    tag: function () {
                        return null;
                    },
                    setting: ['SettingService', function (SettingService) {
                        var params = {key: 'setting.meta'};
                        return SettingService.getByKey(params);
                    }]
                },
                metaTags: {
                    title: function (category) {
                        return category.name;
                    },
                    description: function (category) {
                        return category.name;
                    },
                    keywords: function (category) {
                        return category.name;
                    },
                    author: 'ivqBlog'
                }
            })
            .state('tag', {
                url: '/tag/:route',
                views: {
                    '': {
                        templateUrl: 'layout/master.tpl.html'
                    },
                    'articleList@tag': {
                        templateUrl: 'article/list/list.tpl.html',
                        controller: 'ListCtrl'
                    }
                },
                resolve: {
                    category: function () {
                        return null;
                    },
                    tag: ['$stateParams', 'TagService', function ($stateParams, TagService) {
                        return TagService.getByRoute($stateParams.route);
                    }],
                    setting: ['SettingService', function (SettingService) {
                        var params = {key: 'setting.meta'};
                        return SettingService.getByKey(params);
                    }]
                },
                metaTags: {
                    title: function (tag) {
                        return tag.name;
                    },
                    description: function (tag) {
                        return tag.name;
                    },
                    keywords: function (tag) {
                        return tag.name;
                    },
                    author: 'ivqBlog'
                }
            })
            .state('post', {
                url: '/post/:route/:articleId',
                templateUrl: 'article/post/post.tpl.html',
                controller: 'PostCtrl',
                resolve: {
                    article: ['$stateParams', 'ArticleService', function ($stateParams, ArticleService) {
                        return ArticleService.getById($stateParams.articleId, {action: 'updateView'});
                    }],
                    setting: ['SettingService', function (SettingService) {
                        var params = {key: 'setting.meta'};
                        return SettingService.getByKey(params);
                    }]
                },
                metaTags: {
                    title: function (article) {
                        return article.title;
                    },
                    description: function (article) {
                        return (!_.isUndefined(article.meta) && !_.isUndefined(article.meta.description)) ? article.meta.description : article.title;
                    },
                    keywords: function (article) {
                        return (!_.isUndefined(article.meta) && !_.isUndefined(article.meta.keyword)) ? article.meta.keyword : article.title;
                    },
                    author: function (article) {
                        return (!_.isUndefined(article.meta) && !_.isUndefined(article.meta.author)) ? article.title : article.meta.keyword;
                    }
                }
            });
    }]);