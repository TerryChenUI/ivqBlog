angular.module('app.admin.layout')
    .directive('breadcrumb', () => {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'app/layout/breadcrumb/breadcrumb.tpl.html'
        };
    });