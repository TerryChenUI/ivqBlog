angular.module('app.admin.content')
    .controller('ListCategoryCtrl', ['$scope', 'SweetAlert', 'CategoryService', function ($scope, SweetAlert, CategoryService) {       
        $scope.filterBy = {'ParentId': 0};
        $scope.categoryOptions = [{name: '--请选择--', value: 0}];

        $scope.initController = function(){
            //category filter
            var actionParams = {
                parentId: 0
            };
            CategoryService.getCategories(actionParams).then(function (response) {
                _.each(response.data, function (data) {
                    $scope.categoryOptions.push({
                        name: data.Name,
                        value: data.Id
                    });
                });
            });
        };

        $scope.getResource = function (params, paramsObj) {
            return CategoryService.getCategories(paramsObj).then(function (response) {
                response.data.rows = _.each(response.data.rows, function (data) {
                    data.EnabledText = data.Enabled ? "已启用" : "禁用";
                    if (data.ParentId == 0) {
                        data.ParentName = "父类别"
                    } else {
                        CategoryService.getCategoryById(data.ParentId).then(function (response) {
                            data.ParentName = response.Name;
                        });
                    }
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
            SweetAlert.swal({
                    title: "你确认要删除此数据?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删除",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        CategoryService.deleteCategory(id, function () {
                            SweetAlert.swal("删除成功");
                        });
                    }
                });
        };

        $scope.initController();
    }])
    .controller('EditCategoryCtrl', ['$scope', '$stateParams', '$state', 'SweetAlert', 'CategoryService', function ($scope, $stateParams, $state, SweetAlert, CategoryService) {
        var id = ($stateParams.id) ? parseInt($stateParams.id) : 0;
        $scope.model = {};
        $scope.title = id > 0 ? '编辑类别' : '添加类别';
        $scope.categoryOptions = [{name: '--请选择--', value: 0}];

        $scope.initController = function () {
            var actionParams = {
                parentId: 0
            };
            CategoryService.getCategories(actionParams).then(function (response) {
                _.each(response.data, function (data) {
                    $scope.categoryOptions.push({
                        name: data.Name,
                        value: data.Id
                    });
                });
                $scope.model.ParentId = $scope.categoryOptions[0].value;
            });

            if (id > 0) {
                CategoryService.getCategoryById(id).then(function (data) {
                    $scope.model = data;
                });
            }
        };

        $scope.saveCategory = function () {
            if (id > 0) {
                CategoryService.updateCategory(id, $scope.model, function () {
                    SweetAlert.swal("更新成功");
                    $state.go('category');
                });
            } else {
                CategoryService.insertCategory($scope.model, function () {
                    SweetAlert.swal("新增成功");
                    $state.go('category');
                });
            }
        };

        $scope.initController();
    }]);