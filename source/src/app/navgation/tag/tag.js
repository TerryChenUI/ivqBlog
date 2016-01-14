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
                    TagService.getAll().then(function (data) {
                        $scope.tags = data;
                    });
                };

                $scope.switchTag = function () {
                    var tagObj = $(".nav-tag");
                    var position = tagObj.position();
                    if (position.left == 0) {
                        tagObj.css({left: -120});
                    } else {
                        tagObj.css({left: 0});
                    }
                };

                $scope.initController();
            }]
        };
    });
