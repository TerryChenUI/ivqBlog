"use strict";
angular.module('app.article')
    .controller('PostCtrl', ['$rootScope', '$scope', '$stateParams', '$sce', '$state', '$anchorScroll', '$location', 'SweetAlert', 'ArticleService', 'CommentService', function ($rootScope, $scope, $stateParams, $sce, $state, $anchorScroll, $location, SweetAlert, ArticleService, CommentService) {
        $scope.model = {};

        $scope.initController = function () {
            ArticleService.getArticleById($stateParams.articleId, {action: 'updateView'}).then(function (data) {
                $scope.article = data;
                $scope.article.content = $sce.trustAsHtml($scope.article.content);

                $scope.model = {
                    article: $scope.article._Id
                };
                if ($rootScope.currentUser) {
                    $scope.model.userName = 'ivqBlog';
                    $scope.model.email = $rootScope.currentUser.email;
                }
            });
        };

        $scope.gotoAnchor = function(x) {
            var newHash = 'anchor-' + x;
            if ($location.hash() !== newHash) {
                $location.hash('anchor-' + x);
            } else {
                $anchorScroll();
            }
        };

        $scope.reply = function (id, userName) {
            $scope.model.reply = id;
            $scope.replyKey = "回复" + userName + ":";
            $scope.model.content = $scope.replyKey;
        };

        $scope.delete = function (id) {
            CommentService.delete(id, function (res) {
                SweetAlert.deleteSuccessfully();
                $state.reload();
            })
        };

        $scope.submit = function () {
            $scope.model.article = $scope.article._id;
            if ($scope.model.content.indexOf($scope.replyKey) == 0) {
                $scope.model.content = $scope.model.content.replace($scope.replyKey, '');
            }
            CommentService.insert($scope.model, function (res) {
                SweetAlert.submitSuccessfully();
                $state.reload();
            })
        };

        $scope.initController();
    }]);