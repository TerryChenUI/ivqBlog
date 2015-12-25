"use strict";
angular.module('app.nav')
    .directive('navMenu', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'navgation/menu/menu.tpl.html',
            controller: ['$scope', '$state', 'CategoryService', function ($scope, $state, CategoryService) {
                $scope.$state = $state;

                $scope.initController = function () {
                    //CategoryService.getCategories().then(function (res) {
                    //    $scope.menus = _.where(res.data.rows, {ParentId: 0});
                    //    $scope.menus = _.sortBy($scope.menus, 'DisplayOrder');
                    //    HandleMenu(res.data.rows);
                    //});
                    CategoryService.getAllCategories().then(function (data) {
                        $scope.categories = data;
                    });
                };
                $scope.initController();
            }]
        };
    });
