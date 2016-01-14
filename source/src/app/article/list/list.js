"use strict";
angular.module('app.article')
    .controller('ListCtrl', ['$scope', '$stateParams', 'ArticleService', 'Tool', function ($scope, $stateParams, ArticleService) {
        $scope.articles = [];
        $scope.currentPage = 1;
        $scope.itemsPerPage = 15;
        //$scope.maxSize = 5;

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
                    publish: true
                },
                sortBy: {
                    'time.publish': -1
                },
                page: $scope.currentPage,
                count: $scope.itemsPerPage
            };
            if ($stateParams.categoryId) {
                paramsObj.filters.category = $stateParams.categoryId;
            }
            if ($stateParams.tagId) {
                paramsObj.filters.tags = $stateParams.tagId;
            }
            ArticleService.loadList(paramsObj).then(function (res) {
                var data = res.data;
                $scope.totalItems = data.pagination.size;
                $scope.articles = data.rows;
                $scope.totalItems = data.pagination.size;
            });
        }

        $scope.initController();
    }]);