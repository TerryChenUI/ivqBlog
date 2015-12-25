angular.module('app.admin.content')
    .controller('ListArticleCtrl', ['$scope', '$state', 'SweetAlert', 'CategoryService', 'ArticleService', 'Tool', function ($scope, $state, SweetAlert, CategoryService, ArticleService, Tool) {
        $scope.filterBy = {'title':'', 'categoryId': 0};
        $scope.categories = [{name: '--请选择--', value: 0}];

        $scope.initController = function () {
            CategoryService.getAllCategories().then(function (data) {
                data.forEach(function (obj) {
                    $scope.categories.push({
                        name: obj.name,
                        value: obj._id
                    });
                });
            });
        };

        $scope.getResource = function (params, paramsObj) {
            paramsObj.sortBy = {'_id': -1};
            return ArticleService.getArticles(paramsObj).then(function (response) {
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
                        ArticleService.deleteArticle(id, function () {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };

        $scope.initController();
    }])
    .controller('EditArticleCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'SweetAlert', 'CategoryService', 'ArticleService', 'Upload', 'Tool', function ($scope, $stateParams, $state, $timeout, SweetAlert, CategoryService, ArticleService, Upload, Tool) {
        var id = ($stateParams.id) ? parseInt($stateParams.id) : 0;
        $scope.originModel = {};
        $scope.model = {
            author: 'ivqBlog'
        };
        $scope.title = id > 0 ? '编辑文章' : '添加文章';
        $scope.categories = [{name: '--请选择--', value: 0}];

        $scope.initController = function () {
            CategoryService.getAllCategories().then(function (data) {
                data.forEach(function (obj) {
                    $scope.categories.push({
                        name: obj.name,
                        value: obj._id
                    });
                });
            });
            if (id > 0) {
                ArticleService.getArticleById(id).then(function (data) {
                    data.time.create = Tool.convertTime(data.time.create);
                    data.time.update = Tool.convertTime(data.time.update);
                    if(data.time.publish)
                        data.time.publish = Tool.convertTime(data.time.publish);
                    $scope.model = data;
                    $scope.originModel = Tool.deepCopy($scope.model);
                });
            } else {
                $scope.model.categoryId = $scope.categories[0].value;
            }
        };

        $scope.saveArticle = function () {
            $scope.model.content = UE.getEditor('editor').getContent();
            if (id > 0) {
                var modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                ArticleService.updateArticle(id, modifyModel, function () {
                    SweetAlert.updateSuccessfully();
                    $state.go('article');
                });
            } else {
                ArticleService.insertArticle($scope.model, function () {
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