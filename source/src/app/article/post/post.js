"use strict";
angular.module('app.article')
    .controller('PostCtrl', ['$scope', '$stateParams', '$sce', 'ArticleService', 'CommentService', 'Tool', function ($scope, $stateParams, $sce, ArticleService, CommentService, Tool) {
        $scope.model = {};

        $scope.initController = function () {
            ArticleService.getArticleById($stateParams.articleId, {action: 'updateView'}).then(function (data) {
                $scope.article = data;
                $scope.article.time.publish = Tool.convertTime($scope.article.time.publish);
                $scope.article.content = $sce.trustAsHtml($scope.article.content);

                $scope.model = {
                    article: $scope.article._Id
                };
            });
        };

        $scope.submitComment = function(){
            $scope.model.article = $scope.article._id;
            CommentService.insert($scope.model, function(res){
                alert('successFully');
            })
        };

        $scope.initController();
    }]);