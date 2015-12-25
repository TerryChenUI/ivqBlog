"use strict";
angular.module('app.nav')
    .directive('navMenu', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'navgation/menu/menu.tpl.html',
            controller: ['$scope', '$stateParams', 'CategoryService', function ($scope, $stateParams, CategoryService) {
                $scope.initController = function () {
                    CategoryService.getAllCategories().then(function (data) {
                        $scope.categories = [];
                        data.forEach(function(obj){
                            if($stateParams.cateogryId == obj._id)
                                obj.active = true;
                            $scope.categories.push(obj);
                        });
                    });
                };
                $scope.initController();
            }]
        };
    });
