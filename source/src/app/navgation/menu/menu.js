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
                    var params = {
                        fields: '_id,name'
                    };
                    CategoryService.getAll(params).then(function (data) {
                        $scope.categories = data;
                    });
                };
                $scope.initController();
            }]
        };
    });
