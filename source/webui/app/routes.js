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
                    }
                },
                metaTags: {
                    title: 'ivqBlog - show you code',
                    description: 'This is the ivqBlog blog',
                    keywords: 'ivqLimitBlog blog develop',
                    author: 'ivqBlog'
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
                    }
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