"use strict";
angular.module('app.article')
    .controller('PostCtrl', ['$rootScope', '$scope', '$stateParams', '$sce', 'ArticleService', 'CommentService', 'Tool', function ($rootScope, $scope, $stateParams, $sce, ArticleService, CommentService, Tool) {
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

        $scope.reply = function (id, userName) {
            $scope.model.reply = id;
            $scope.replyKey = "回复" + userName + ":";
            $scope.model.content = $scope.replyKey;
        };

        $scope.delete = function (id) {
            CommentService.delete(id, function (res) {
                alert('delete successFully');
            })
        };

        $scope.submit = function () {
            $scope.model.article = $scope.article._id;
            if ($scope.model.content.indexOf($scope.replyKey) == 0) {
                $scope.model.content = $scope.model.content.replace($scope.replyKey, '');
            }
            CommentService.insert($scope.model, function (res) {
                alert('submit successFully');
            })
        };

        $scope.initController();
    }]);