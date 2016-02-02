'use strict';
angular.module('app.admin.setting')
    .controller('AccountCtrl', ['$rootScope', '$scope', '$state', 'SweetAlert', 'AccountService', 'AuthService', 'Tool', function ($rootScope, $scope, $state, SweetAlert, AccountService, AuthService, Tool) {
        $scope.model = $rootScope.globals.currentUser.data;
        $scope.model.createTime = Tool.convertTime($rootScope.globals.currentUser.data.createTime);
        $scope.model.lastLoginTime = Tool.convertTime($rootScope.globals.currentUser.data.lastLoginTime);
        $scope.originModel = Tool.deepCopy($scope.model);

        $scope.updatePassword = function () {
            var modifyModel = {
                password: $scope.model.pwd,
                newPassword: $scope.model.newPassword
            };
            AccountService.updatePassword($scope.model._id, modifyModel).then(function (data) {
                AuthService.setCredentials(data);
                SweetAlert.updateSuccessfully();
            }, function(response){
                $scope.wrongPassword = response.errors;
            });
        };

        $scope.saveAccount = function () {
            var modifyModel = {};
            if ($scope.originModel.enabled != $scope.model.enabled) {
                modifyModel["enabled"] = $scope.model.enabled;
            }
            if($scope.originModel.email != $scope.model.email){
                modifyModel["email"] = $scope.model.email;
            }
            if (Object.keys(modifyModel).length) {
                AccountService.update($scope.model._id, modifyModel).then(function (data) {
                    AuthService.setCredentials(data);
                    SweetAlert.updateSuccessfully();
                });
            }
        };
    }]);