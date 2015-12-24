angular.module('app.admin.content')
    .controller('ListCategoryCtrl', ['$scope', '$state', 'SweetAlert', 'CategoryService', function ($scope, $state, SweetAlert, CategoryService) {
        $scope.getResource = function (params, paramsObj) {
            return CategoryService.getCategories(paramsObj).then(function (response) {
                response.data.rows = _.each(response.data.rows, function (data) {
                    data.status = data.enabled ? "已启用" : "禁用";
                });
                return {
                    'rows': response.data.rows,
                    'header': [],
                    'pagination': response.data.pagination,
                    'sortBy': '',
                    'sortOrder': ''
                }
            });
        };

        $scope.remove = function (id) {
            SweetAlert.deleteConfirm(
                function (isConfirm) {
                    if (isConfirm) {
                        CategoryService.deleteCategory(id, function () {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };
    }])
    .controller('EditCategoryCtrl', ['$scope', '$stateParams', '$state', 'SweetAlert', 'CategoryService', 'tool', function ($scope, $stateParams, $state, SweetAlert, CategoryService, tool) {
        var id = ($stateParams.id) ? parseInt($stateParams.id) : 0;
        $scope.originModel = {};
        $scope.model = {};
        $scope.title = id > 0 ? '编辑类别' : '添加类别';
        $scope.categoryOptions = [{name: '[父类别]', value: 0}];

        $scope.initController = function () {
            CategoryService.getParentCategories().then(function (data) {
                data.forEach(function (obj) {
                    $scope.categoryOptions.push({
                        name: obj.name,
                        value: obj._id
                    });
                });
                $scope.model.parentId = $scope.categoryOptions[0].value;
            });

            if (id > 0) {
                CategoryService.getCategoryById(id).then(function (data) {
                    $scope.model = data;
                    $scope.originModel = tool.deepCopy($scope.model);
                });
            }
        };

        $scope.saveCategory = function () {
            if (id > 0) {
                var modifyModel = tool.trimSameProperties($scope.originModel, $scope.model);
                CategoryService.updateCategory(id, modifyModel, function () {
                    SweetAlert.updateSuccessfully();
                    $state.go('category');
                });
            } else {
                CategoryService.insertCategory($scope.model, function () {
                    SweetAlert.addSuccessfully();
                    $state.go('category');
                });
            }
        };

        $scope.initController();
    }]);