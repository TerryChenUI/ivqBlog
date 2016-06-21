"use strict";
angular.module('app.article')
    .controller('ListCtrl', ['$scope', '$stateParams', 'ArticleService', 'category', 'tag', 'cfpLoadingBar', ($scope, $stateParams, ArticleService, category, tag, cfpLoadingBar) => {
        $scope.articles = [];
        $scope.pageSetting = {
            currentPage: 1,
            itemsPerPage: 15,
            totalItems: 0
        };

        $scope.initController = () => {
            cfpLoadingBar.start();
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
                page: $scope.pageSetting.currentPage,
                count: $scope.pageSetting.itemsPerPage
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
                $scope.pageSetting.totalItems = data.pagination.size;
                $scope.articles = data.rows;
                cfpLoadingBar.complete();
            });
        }

        $scope.initController();
    }]);