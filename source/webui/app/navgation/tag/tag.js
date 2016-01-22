"use strict";
angular.module('app.nav')
    .directive('navTag', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'navgation/tag/tag.tpl.html',
            controller: ['$scope', 'TagService', function ($scope, TagService) {
                $scope.initController = function () {
                    var params = {
                        fields: '_id,name,route',
                        action: 'getArticlesCount'
                    };
                    TagService.getAll(params).then(function (data) {
                        $scope.tags = data;
                    });
                };

                $scope.initController();
            }]
        };
    });
