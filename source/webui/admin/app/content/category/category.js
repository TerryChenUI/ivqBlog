'use strict';
angular.module('app.admin.content')
    .controller('ListCategoryCtrl', ['$scope', '$state', 'SweetAlert', 'CategoryService', ($scope, $state, SweetAlert, CategoryService) => {
        $scope.getResource = (params, paramsObj) => {
            return CategoryService.loadList(paramsObj).then((response) => {
                response.data.rows = angular.forEach(response.data.rows, (data) => {
                    data.status = data.enabled ? "已启用" : "禁用";
                });
                return {
                    rows: response.data.rows,
                    header: [],
                    pagination: response.data.pagination,
                    sortBy: '',
                    sortOrder: ''
                }
            });
        };

        $scope.remove = (id) => {
            SweetAlert.deleteConfirm(
                (isConfirm) => {
                    if (isConfirm) {
                        CategoryService.delete(id).then(() => {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };
    }])
    .controller('EditCategoryCtrl', ['$scope', '$stateParams', '$state', 'SweetAlert', 'CategoryService', 'Tool', ($scope, $stateParams, $state, SweetAlert, CategoryService, Tool) => {
        let id = $stateParams.id ? $stateParams.id : '';
        $scope.originModel = {};
        $scope.model = {};
        $scope.title = id != '' ? '编辑类别' : '添加类别';

        $scope.initController = () => {
            if (id) {
                CategoryService.getById(id).then((data) => {
                    $scope.model = data;
                    $scope.originModel = Tool.deepCopy($scope.model);
                });
            }
        };

        $scope.save = () => {
            if (id) {
                let modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                CategoryService.update(id, modifyModel).then(() => {
                    SweetAlert.updateSuccessfully();
                    $state.go('category');
                });
            } else {
                CategoryService.insert($scope.model).then(() => {
                    SweetAlert.addSuccessfully();
                    $state.go('category');
                });
            }
        };

        $scope.initController();
    }]);