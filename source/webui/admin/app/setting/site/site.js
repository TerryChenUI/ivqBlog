'use strict';
angular.module('app.admin.setting')
    .controller('SiteCtrl', ['$rootScope', '$scope', '$state', 'SweetAlert', 'SettingService', 'Tool', function ($rootScope, $scope, $state, SweetAlert, SettingService, Tool) {
        $scope.originModel = {};
        $scope.model = {};
        $scope.initController = function(){
            SettingService.getAll().then(function(data){
                _.each(data, function(obj){
                    $scope.model[obj.key] = obj.value;
                    $scope.originModel = Tool.deepCopy($scope.model);
                });
            })
        };

        $scope.save = function(){
            var modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
            SettingService.update(modifyModel).then(function(){
                SweetAlert.updateSuccessfully();
                $state.go('site');
            })
        };

        $scope.initController();
    }]);