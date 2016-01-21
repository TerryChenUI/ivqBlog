'use strict';
angular.module('app.admin.content')
    .controller('ListArticleCtrl', ['$scope', '$state', 'SweetAlert', 'CategoryService', 'ArticleService', 'TagService', 'Tool', function ($scope, $state, SweetAlert, CategoryService, ArticleService, TagService, Tool) {
        $scope.filterBy = {'title': '', 'category': 0, 'tags': 0};
        $scope.categories = [{name: '--请选择--', value: 0}];
        $scope.allTags = [{name: '--请选择--', value: 0}];

        $scope.initController = function () {
            var params = {
                fields: '_id,name'
            };
            CategoryService.getAll(params).then(function (data) {
                _.each(data, function (obj) {
                    $scope.categories.push({
                        name: obj.name,
                        value: obj._id
                    });
                });
            });
            TagService.getAll(params).then(function (data) {
                _.each(data, function (obj) {
                    $scope.allTags.push({
                        name: obj.name,
                        value: obj._id
                    });
                });
            });
        };

        $scope.getResource = function (params, paramsObj) {
            paramsObj.sortBy = {'_id': -1};
            return ArticleService.loadList(paramsObj).then(function (response) {
                response.data.rows = _.each(response.data.rows, function (data) {
                    data.status = data.publish ? "已发布" : "未发布";
                    data.time.create = Tool.convertTime(data.time.create);
                    data.time.publish = Tool.convertTime(data.time.publish);
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
                        ArticleService.delete(id).then(function () {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };

        $scope.initController();
    }])
    .controller('EditArticleCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'SweetAlert', 'CategoryService', 'ArticleService', 'TagService', 'Upload', 'Tool', function ($scope, $stateParams, $state, $timeout, SweetAlert, CategoryService, ArticleService, TagService, Upload, Tool) {
        var id = ($stateParams.id) ? parseInt($stateParams.id) : 0;
        $scope.originModel = {};
        $scope.model = {
            author: 'ivqBlog'
        };
        $scope.ueConfig = {};
        $scope.title = id > 0 ? '编辑文章' : '添加文章';
        $scope.categories = [{name: '--请选择--', value: 0}];

        $scope.initController = function () {
            var params = {
                fields: '_id,name'
            };
            CategoryService.getAll(params).then(function (data) {
                _.each(data, function (obj) {
                    $scope.categories.push({
                        name: obj.name,
                        value: obj._id
                    });
                });
            });
            TagService.getAll(params).then(function (data) {
                $scope.tags = data;
            });
            if (id > 0) {
                ArticleService.getById(id).then(function (data) {
                    data.time.create = Tool.convertTime(data.time.create);
                    data.time.update = Tool.convertTime(data.time.update);
                    if (data.time.publish)
                        data.time.publish = Tool.convertTime(data.time.publish);
                    $scope.model = data;
                    $scope.model.category = data.category != null ? data.category._id : 0;
                    $scope.originModel = Tool.deepCopy($scope.model);
                    $scope.originModel.category = data.category != null ? data.category._id : 0;
                });
            } else {
                $scope.model.category = $scope.categories[0].value;
            }
        };

        $scope.save = function () {
            if (id > 0) {
                var selectedTags = _.map($scope.model.tags, function (data) {
                    return data._id;
                });
                var modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                if (_.isUndefined(modifyModel.tags) && selectedTags.length == 0) {
                    modifyModel.tags = []
                } else if (modifyModel.tags.length) {
                    modifyModel.tags = selectedTags;
                }
                ArticleService.update(id, modifyModel).then(function () {
                    SweetAlert.updateSuccessfully();
                    $state.go('article');
                });

            } else {
                ArticleService.insert($scope.model).then(function () {
                    SweetAlert.addSuccessfully();
                    $state.go('article');
                });
            }
        };

        $scope.uploadImage = function (file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/uploads',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data.success;
                        $scope.showImg = response.data.success;
                        $scope.imgUrl = response.data.imgUrl;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        $scope.initController();
    }]);