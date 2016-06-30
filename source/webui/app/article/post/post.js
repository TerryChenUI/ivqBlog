"use strict";
angular.module('app.article')
    .controller('PostCtrl', ['$rootScope', '$scope', '$stateParams', '$sce', '$state', '$timeout', '$window', '$location', '$anchorScroll', 'SweetAlert', 'ArticleService', 'CommentService', 'Tool', 'article', 'cfpLoadingBar', ($rootScope, $scope, $stateParams, $sce, $state, $timeout, $window, $location, $anchorScroll, SweetAlert, ArticleService, CommentService, Tool, article, cfpLoadingBar) => {
        $scope.model = {};
        $scope.showScrollUp = false;

        $scope.initController = () => {
            cfpLoadingBar.start();
            article = Tool.transformArticleUrl(article);
            cfpLoadingBar.complete();
            $scope.article = article;
            var convert = new showdown.Converter({headerLevelStart: 1, prefixHeaderId: 'ivq', extensions: ['toc']});
            $scope.article.content = $sce.trustAsHtml(convert.makeHtml($scope.article.content));
            $scope.model.article = $scope.article._Id;
            if ($rootScope.currentUser) {
                $scope.model.userName = 'ivqBlog';
                $scope.model.email = $rootScope.currentUser.email;
            }
            $scope.$on('$viewContentLoaded', function () {
                $timeout(() => {
                    hljs.initHighlightingOnLoad();
                }, 100);
            });
        };

        angular.element($window).bind('scroll', function() {
            $scope.showScrollUp = angular.element($window).scrollTop() > 100 ? true : false
            $scope.$apply();
        });

        $scope.goToTop = () => {
            $location.hash('top');
            $anchorScroll();
        };

        $scope.redirect = () => {
            let url = "http://" + $window.location.host + "/admin/article/edit/" + article._id;
            $window.location.href = url;
        };

        $scope.reply = (id, userName) => {
            $scope.model.reply = id;
            $scope.replyKey = "回复" + userName + ":";
            $scope.model.content = $scope.replyKey;
        };

        $scope.delete = (id) => {
            CommentService.delete(id).then((data) => {
                SweetAlert.deleteSuccessfully();
                $state.reload();
            })
        };

        $scope.submit = () => {
            $scope.model.article = $scope.article._id;
            if ($scope.model.content.indexOf($scope.replyKey) == 0) {
                $scope.model.content = $scope.model.content.replace($scope.replyKey, '');
            }
            CommentService.insert($scope.model).then((data) => {
                SweetAlert.submitSuccessfully();
                $state.reload();
            })
        };

        $scope.initController();
    }]);