/**
 * Created by tchen on 2015/7/16.
 */
angular.module('app.admin.layout')
    .directive('footer', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'app/layout/footer/footer.tpl.html'
        };
    });