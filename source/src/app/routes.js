'use strict';
angular.module('app')
    .config(["$locationProvider", '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, UIRouterMetatagsProvider) {
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/home');


        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'article/list/list.tpl.html',
                controller: 'ListCtrl',
                metaTags: {
                    title: 'ivqBlog - show you code',
                    description: 'This is the ivqBlog blog',
                    keywords: 'ivqBlog blog develop',
                    author: 'ivqBlog'
                }
            })
            .state('list', {
                url: '/list/:categoryId',
                templateUrl: 'article/list/list.tpl.html',
                controller: 'ListCtrl',
                resolve: {
                    category: function (CategoryService, $stateParams) {
                        return CategoryService.getCategoryById($stateParams.categoryId);
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
            .state('post', {
                url: '/post/:articleId',
                templateUrl: 'article/post/post.tpl.html',
                controller: 'PostCtrl',
                resolve: {
                    article: function (ArticleService, $stateParams) {
                        return ArticleService.getArticleById($stateParams.articleId);
                    }
                },
                metaTags: {
                    title: function (article) {
                        return article.title;
                    },
                    description: function (article) {
                        return article.meta.description;
                    },
                    keywords: function (article) {
                        return article.meta.keyword;
                    },
                    author: function (article) {
                        return article.meta.author;
                    }
                }
            });
    }]);