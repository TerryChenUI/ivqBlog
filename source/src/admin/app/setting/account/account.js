angular.module('app.admin.setting')
    .controller('AccountCtrl', ['$rootScope', '$scope', '$state', 'SweetAlert', 'UserService', 'AuthService', 'Tool', function ($rootScope, $scope, $state, SweetAlert, UserService, AuthService, Tool) {
        $scope.model = $rootScope.globals.currentUser.data;
        $scope.originModel = Tool.deepCopy($scope.model);

        $scope.updatePassword = function(){

        };

        $scope.saveAccount = function(){
        	var modifyModel = {};
            if($scope.originModel.enabled != $scope.model.enabled){
            	modifyModel["enabled"] = $scope.model.enabled;
            }
            if(Object.keys(modifyModel).length){
            	UserService.updateUser($scope.model._id, modifyModel, function () {
                	SweetAlert.updateSuccessfully();

            	});
            }
        };
    }]);