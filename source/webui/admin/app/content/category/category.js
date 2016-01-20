'use strict';
angular.module('app.admin.content')
    .controller('ListCategoryCtrl', ['$scope', '$state', 'SweetAlert', 'CategoryService', function ($scope, $state, SweetAlert, CategoryService) {
        $scope.getResource = function (params, paramsObj) {
            return CategoryService.loadList(paramsObj).then(function (response) {
                response.data.rows = _.each(response.data.rows, function (data) {
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

        $scope.remove = function (id) {
            SweetAlert.deleteConfirm(
                function (isConfirm) {
                    if (isConfirm) {
                        CategoryService.delete(id).then(function () {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };
    }])
    .controller('EditCategoryCtrl', ['$scope', '$stateParams', '$state', 'SweetAlert', 'CategoryService', 'Tool', function ($scope, $stateParams, $state, SweetAlert, CategoryService, Tool) {
        var id = ($stateParams.id) ? parseInt($stateParams.id) : 0;
        $scope.originModel = {};
        $scope.model = {};
        $scope.title = id > 0 ? '编辑类别' : '添加类别';

        $scope.initController = function () {
            if (id > 0) {
                CategoryService.getById(id).then(function (data) {
                    $scope.model = data;
                    $scope.originModel = Tool.deepCopy($scope.model);
                });
            }
        };

        $scope.saveCategory = function () {
            if (id > 0) {
                var modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                CategoryService.update(id, modifyModel).then(function () {
                    SweetAlert.updateSuccessfully();
                    $state.go('category');
                });
            } else {
                CategoryService.insert($scope.model).then(function () {
                    SweetAlert.addSuccessfully();
                    $state.go('category');
                });
            }
        };

        $scope.initController();
    }]);