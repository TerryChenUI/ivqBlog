"use strict";
angular.module('app.article')
    .controller('PostCtrl', ['$scope', '$stateParams', '$sce', 'ArticleService', 'CommentService', 'Tool', function ($scope, $stateParams, $sce, ArticleService, CommentService, Tool) {
        $scope.model = {};

        $scope.initController = function () {
            ArticleService.getArticleById($stateParams.articleId, {action: 'updateView'}).then(function (data) {
                $scope.article = data;
                $scope.article.content = $sce.trustAsHtml($scope.article.content);

                $scope.model = {
                    article: $scope.article._Id
                };

            });
        };

        $scope.reply = function(commentId, userName){
            $scope.model.reply = commentId;
            $scope.replyKey = "回复" + userName + ":";
            $scope.model.content = $scope.replyKey;
        };

        $scope.submitComment = function(){
            $scope.model.article = $scope.article._id;
            if($scope.model.content.indexOf($scope.replyKey) == -1){
                $scope.model.content = $scope.model.content.replace($scope.replyKey, '');
                delete $scope.model.reply;
            }
            CommentService.insert($scope.model, function(res){
                alert('successFully');
            })
        };

        $scope.initController();
    }]);