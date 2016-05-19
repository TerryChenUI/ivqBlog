"use strict";
angular.module('app.article')
    .controller('ListCtrl', ['$scope', '$stateParams', 'ArticleService', 'category', 'tag', ($scope, $stateParams, ArticleService, category, tag) => {
        $scope.articles = [];
        $scope.currentPage = 1;
        $scope.itemsPerPage = 15;
        //$scope.maxSize = 5;

        $scope.initController = () => {
            getData();
        };

        $scope.pageChanged = () => {
            getData();
            //window.location.hash = '#top';
            //console.log('Page changed to: ' + $scope.currentPage);
        };

        function getData() {
            let paramsObj = {
                filters: {publish: true},
                fields: '_id, title, author, views, time.publish, category, tags, comments',
                sortBy: {'time.publish': -1},
                page: $scope.currentPage,
                count: $scope.itemsPerPage
            };
            if (category) {
                paramsObj.filters.category = category._id;
                $scope.listName = category.name;
            }
            if (tag) {
                paramsObj.filters.tags = tag._id;
                $scope.listName = tag.name;
            }
            ArticleService.loadList(paramsObj).then((res) => {
                let data = res.data;
                $scope.totalItems = data.pagination.size;
                $scope.articles = data.rows;
                $scope.totalItems = data.pagination.size;
            });
        }

        $scope.initController();
    }]);