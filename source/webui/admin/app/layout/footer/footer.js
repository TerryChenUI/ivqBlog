angular.module('app.admin.layout')
    .directive('footer', () => {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'app/layout/footer/footer.tpl.html'
        };
    });