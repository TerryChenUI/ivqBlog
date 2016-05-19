"use strict";
angular.module('app.nav')
    .directive('navTag', () => {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'navgation/tag/tag.tpl.html',
            controller: ['$scope', 'TagService', ($scope, TagService) => {
                $scope.initController = () => {
                    let params = {
                        fields: '_id,name,route',
                        action: 'getArticlesCount'
                    };
                    TagService.getAll(params).then((data) => {
                        $scope.tags = data;
                    });
                };

                $scope.initController();
            }]
        };
    });
