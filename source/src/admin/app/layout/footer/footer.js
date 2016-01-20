'use strict';
angular.module('app.admin.layout')
    .directive('footer', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'app/layout/footer/footer.tpl.html'
        };
    });