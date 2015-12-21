"use strict";
angular.module('app.article')
    .controller('ListCtrl', ['$scope', '$stateParams', 'ArticleService', 'CategoryService', function ($scope, $stateParams, ArticleService, CategoryService) {
        //console.log($stateParams.categoryId);
        $scope.articles = [];
        $scope.currentPage = 1;
        $scope.itemsPerPage = 2;
        //$scope.maxSize = 5;
        //$scope.totalItems = 5;

        $scope.initController = function () {
            getData();
        };

        $scope.pageChanged = function () {
            getData();
            //window.location.hash = '#top';
            //console.log('Page changed to: ' + $scope.currentPage);
        };

        function getData() {
            var paramsObj = {
                categoryId: $stateParams.categoryId,
                page: $scope.currentPage,
                count: $scope.itemsPerPage
            };
            ArticleService.getArticles(paramsObj).then(function (res) {
                $scope.articles = res.data.rows;
                $scope.totalItems = res.data.pagination.size;
            });
        }

        $scope.initController();
    }]);