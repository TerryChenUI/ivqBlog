"use strict";
angular.module('app.nav')
    .directive('navMenu', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'navgation/menu/menu.tpl.html',
            controller: ['$scope', 'CategoryService', function ($scope, CategoryService) {
                $scope.initController = function () {
                    CategoryService.getAll().then(function (data) {
                        $scope.categories = data;
                    });
                };
                $scope.initController();
            }]
        };
    });
