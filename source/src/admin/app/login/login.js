angular.module('app.admin.common')
    .controller('LoginCtrl', ["$scope", "$window", "AuthenService", function ($scope, $window, AuthenService) {
        $scope.model = {};

        $scope.Login = function () {
            if(_.isUndefined($scope.model.username) || _.isUndefined($scope.model.password)){
                $scope.errorMessage = "用户名和密码不能为空";
                return;
            }

            AuthenService.Login($scope.model.username, $scope.model.password, function (response) {
                if (response.success) {
                    AuthenService.setCredentials($scope.model.username, $scope.model.password);
                    $window.location.href = "index.html";
                } else {
                    $scope.errorMessage = "用户名或密码错误";
                }
            });
        };
    }]);