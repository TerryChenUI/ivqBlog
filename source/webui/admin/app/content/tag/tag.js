'use strict';
angular.module('app.admin.content')
    .controller('ListTagCtrl', ['$scope', '$state', 'SweetAlert', 'TagService', ($scope, $state, SweetAlert, TagService)=> {
        $scope.getResource = (params, paramsObj) => {
            return TagService.loadList(paramsObj).then((response) => {
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
                        TagService.delete(id).then(() => {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };
    }])
    .controller('EditTagCtrl', ['$scope', '$stateParams', '$state', 'SweetAlert', 'TagService', 'Tool', ($scope, $stateParams, $state, SweetAlert, TagService, Tool) => {
        let id = $stateParams.id ? $stateParams.id : '';
        $scope.originModel = {};
        $scope.model = {};
        $scope.title = id != '' ? '编辑标签' : '添加标签';

        $scope.initController = () => {
            if (id) {
                TagService.getById(id).then((data) => {
                    $scope.model = data;
                    $scope.originModel = Tool.deepCopy($scope.model);
                });
            }
        };

        $scope.save = () => {
            if (id) {
                let modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                TagService.update(id, modifyModel).then(() => {
                    SweetAlert.updateSuccessfully();
                    $state.go('tag');
                });
            } else {
                TagService.insert($scope.model).then(() => {
                    SweetAlert.addSuccessfully();
                    $state.go('tag');
                });
            }
        };

        $scope.initController();
    }]);