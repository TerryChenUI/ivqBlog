angular.module('app.admin.layout')
    .directive('headerMenu', () => {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'app/layout/header-menu/header-menu.tpl.html',
            controller: ['$scope', '$window', 'AuthService',  ($scope, $window, AuthService) => {
                $scope.logout =  () => {
                    AuthService.clearCredentials();
                    $window.location.href = "login.html";
                };
            }]
        };
    });