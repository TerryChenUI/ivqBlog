'use strict';
angular.module('app.admin.setting')
    .controller('SiteCtrl', ['$rootScope', '$scope', '$state', 'SweetAlert', 'SettingService', 'Tool', ($rootScope, $scope, $state, SweetAlert, SettingService, Tool) => {
        $scope.originModel = {};
        $scope.model = {};
        $scope.initController = () => {
            SettingService.getAll().then((data) => {
                angular.forEach(data, (obj) => {
                    $scope.model[obj.key] = obj.value;
                    $scope.originModel = Tool.deepCopy($scope.model);
                });
            })
        };

        $scope.save = () => {
            let modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
            SettingService.update(modifyModel).then(() => {
                SweetAlert.updateSuccessfully();
                $state.go('site');
            })
        };

        $scope.initController();
    }]);