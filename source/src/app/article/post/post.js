"use strict";
angular.module('app.article')
    .controller('PostCtrl', ['$scope', '$stateParams', '$sce', 'ArticleService', 'Tool', function ($scope, $stateParams, $sce, ArticleService, Tool) {

        $scope.initController = function () {
            ArticleService.getArticleById($stateParams.articleId, {action: 'updateView'}).then(function (data) {
                $scope.article = data;
                $scope.article.time.publish = Tool.convertTime($scope.article.time.publish);
                $scope.article.content = $sce.trustAsHtml($scope.article.content);
            });
        };

        $scope.initController();

    }]);