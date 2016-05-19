"use strict";
angular.module('app.nav')
    .directive('navMenu', () => {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'navgation/menu/menu.tpl.html',
            controller: ['$scope', 'CategoryService', ($scope, CategoryService) => {
                $scope.initController = () => {
                    let params = {
                        fields: '_id,name,route'
                    };
                    CategoryService.getAll(params).then((data) => {
                        $scope.categories = data;
                    });
                };
                $scope.initController();
            }]
        };
    });
