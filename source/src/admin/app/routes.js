/**
 * Created by tchen on 7/3/2015.
 */
'use strict';
angular.module('app.admin')
    .config(["$locationProvider", '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {templateUrl: 'app/home/home.tpl.html'}
                },
                ncyBreadcrumb: {
                    label: '首页'
                }
            })
            .state('category', {
                url: '/category/list',
                templateUrl: 'app/content/category/list.tpl.html',
                controller: 'ListCategoryCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'home';
                    },
                    label: '类别管理'
                }
            })
            .state('editCategory', {
                url: '/category/edit/:id?',
                templateUrl: 'app/content/category/edit.tpl.html',
                controller: 'EditCategoryCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'category';
                    },
                    label: '{{title}}'
                }
            })
            .state('article', {
                url: '/article/list',
                templateUrl: 'app/content/article/list.tpl.html',
                controller: 'ListArticleCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'home';
                    },
                    label: '文章管理'
                }
            })
            .state('editArticle', {
                url: '/article/edit/:id?',
                templateUrl: 'app/content/article/edit.tpl.html',
                controller: 'EditArticleCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'article';
                    },
                    label: '{{title}}'
                }
            })
            .state('tag', {
                url: '/tag/list',
                templateUrl: 'app/content/tag/list.tpl.html',
                controller: 'ListTagCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'home';
                    },
                    label: '标签管理'
                }
            })
            .state('editTag', {
                url: '/tag/edit/:id?',
                templateUrl: 'app/content/tag/edit.tpl.html',
                controller: 'EditTagCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'tag';
                    },
                    label: '{{title}}'
                }
            })
            .state('comment', {
                url: '/comment/list',
                templateUrl: 'app/content/comment/list.tpl.html',
                controller: 'ListCommentCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'home';
                    },
                    label: '评论管理'
                }
            })
            .state('account', {
                url: '/setting/account',
                templateUrl: 'app/setting/account/account.tpl.html',
                controller: 'AccountCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'home';
                    },
                    label: '账号设置'
                }
            })
            .state('site', {
                url: '/setting/site',
                templateUrl: 'app/setting/site/site.tpl.html',
                controller: 'SiteCtrl',
                ncyBreadcrumb: {
                    parent: function ($scope) {
                        return 'home';
                    },
                    label: '网站设置'
                }
            })
    }]);