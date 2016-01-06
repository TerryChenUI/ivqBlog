angular.module('app.admin.content')
    .controller('ListTagCtrl', ['$scope', '$state', 'SweetAlert', 'TagService', function ($scope, $state, SweetAlert, TagService) {
        $scope.getResource = function (params, paramsObj) {
            return TagService.getTags(paramsObj).then(function (response) {
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
                        TagService.delete(id, function () {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };
    }])
    .controller('EditTagCtrl', ['$scope', '$stateParams', '$state', 'SweetAlert', 'TagService', 'Tool', function ($scope, $stateParams, $state, SweetAlert, TagService, Tool) {
        var id = ($stateParams.id) ? parseInt($stateParams.id) : 0;
        $scope.originModel = {};
        $scope.model = {};
        $scope.title = id > 0 ? '编辑标签' : '添加标签';

        $scope.initController = function () {
            if (id > 0) {
                TagService.getTagById(id).then(function (data) {
                    $scope.model = data;
                    $scope.originModel = Tool.deepCopy($scope.model);
                });
            }
        };

        $scope.saveTag = function () {
            if (id > 0) {
                var modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                TagService.update(id, modifyModel, function () {
                    SweetAlert.updateSuccessfully();
                    $state.go('Tag');
                });
            } else {
                TagService.insert($scope.model, function () {
                    SweetAlert.addSuccessfully();
                    $state.go('Tag');
                });
            }
        };

        $scope.initController();
    }]);