"use strict";
angular.module('app.article')
    .controller('DetailCtrl', ['$scope', '$stateParams', 'ArticleService', function ($scope, $stateParams, ArticleService) {

        $scope.initController = function () {
            ArticleService.getArticleById($stateParams.articleId).then(function (data) {
                $scope.article = data;
            });
        };

        $scope.initController();

    }]);