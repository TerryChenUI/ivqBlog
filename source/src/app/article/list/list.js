"use strict";
angular.module('app.article')
    .controller('ListCtrl', ['$scope', '$stateParams', 'ArticleService', 'CategoryService', 'Tool', function ($scope, $stateParams, ArticleService, CategoryService, Tool) {
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
                filters: {
                    categoryId: $stateParams.categoryId
                },
                page: $scope.currentPage,
                count: $scope.itemsPerPage
            };
            ArticleService.getArticles(paramsObj).then(function (res) {
                $scope.articles = res.data.rows;
                $scope.articles.forEach(function (obj) {
                    obj.time.publish = Tool.convertTime(obj.time.publish, 'YYYY-MM-DD');
                });
                $scope.totalItems = res.data.pagination.size;
            });
        }

        $scope.initController();
    }]);