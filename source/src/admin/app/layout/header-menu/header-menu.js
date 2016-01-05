angular.module('app.admin.layout')
    .directive('headerMenu', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'app/layout/header-menu/header-menu.tpl.html',
            controller: ['$scope', '$window', 'AuthService', function ($scope, $window, AuthService) {
                $scope.logout = function () {
                    AuthService.clearCredentials();
                    $window.location.href = "login.html";
                };
            }]
        };
    });