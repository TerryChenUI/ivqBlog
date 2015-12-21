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
                    CategoryService.getCategories().then(function (res) {
                        $scope.menus = _.where(res.data.rows, {ParentId: 0});
                        $scope.menus = _.sortBy($scope.menus, 'DisplayOrder');
                        HandleMenu(res.data.rows);
                    });

                };

                function HandleMenu(data) {
                    data = _.filter(data, function (d) {
                        return d.ParentId != 0
                    });
                    for (var i = 0; i < $scope.menus.length; i++) {
                        $scope.menus[i].subMenu = _.filter(data, function (d) {
                            return d.ParentId == $scope.menus[i].Id;
                        });
                        $scope.menus[i].subMenu = _.sortBy($scope.menus[i].subMenu, 'DisplayOrder');
                    }
                }

                $scope.initController();
            }]
        };
    });
