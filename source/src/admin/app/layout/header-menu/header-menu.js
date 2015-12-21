/**
 * Created by tchen on 2015/7/16.
 */
angular.module('app.admin.layout')
    .directive('headerMenu', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'app/layout/header-menu/header-menu.tpl.html',
            controller: ['$scope', '$window', 'AuthenService', function ($scope, $window, AuthenService) {
                $scope.logout = function () {
                    AuthenService.clearCredentials();
                    $window.location.href = "login.html";
                };
            }]
        };
    });