"use strict";
angular.module('app.article')
    .controller('ListCtrl', ['$scope', '$stateParams', 'ArticleService', 'category', 'tag', function ($scope, $stateParams, ArticleService, category, tag) {
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
                filters: {publish: true},
                fields: '_id, title, author, views, time.publish, category, tags, comments',
                sortBy: {'time.publish': -1},
                page: $scope.currentPage,
                count: $scope.itemsPerPage
            };
            if (category) {
                paramsObj.filters.category = category._id;
            }
            if (tag) {
                paramsObj.filters.tags = tag._id;
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