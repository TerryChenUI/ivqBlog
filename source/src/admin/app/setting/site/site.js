angular.module('app.admin.setting')
    .controller('SiteCtrl', ['$rootScope', '$scope', '$state', 'SweetAlert', 'SettingService', 'Tool', function ($rootScope, $scope, $state, SweetAlert, SettingService, Tool) {
        $scope.model = {};
        $scope.initController = function(){
            SettingService.getAll().then(function(data){
                _.each(data, function(obj){
                    $scope.model[obj.key] = obj.value;
                });
            })
        };

        $scope.initController();
    }]);