angular.module('app.admin.content')
    .controller('ListArticleCtrl', ['$scope', '$state', 'SweetAlert', 'CategoryService', 'ArticleService', function ($scope, $state, SweetAlert, CategoryService, ArticleService) {
        $scope.filterBy = {'categoryId': 0};
        $scope.categoryOptions = [{name: '--请选择--', value: 0}];

        $scope.initController = function () {
            CategoryService.getCategories().then(function (response) {
                _.each(response.data.rows, function (data) {
                    $scope.categoryOptions.push({
                        name: data.name,
                        value: data._id
                    });
                });
            });
        };

        $scope.getResource = function (params, paramsObj) {
            return ArticleService.getArticles(paramsObj).then(function (response) {
                response.data.rows = _.each(response.data.rows, function (data) {
                    data.status = data.publish ? "已发布" : "未发布";
                    data.time.create = moment(data.time.create).format('YYYY-MM-DD HH:mm:ss');
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
    .controller('EditArticleCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'SweetAlert', 'CategoryService', 'ArticleService', 'Upload', 'tool', function ($scope, $stateParams, $state, $timeout, SweetAlert, CategoryService, ArticleService, Upload, tool) {
        var id = ($stateParams.id) ? parseInt($stateParams.id) : 0;
        $scope.originModel = {};
        $scope.model = {};
        $scope.title = id > 0 ? '编辑文章' : '添加文章';
        $scope.categories = [{name: '--请选择--', value: 0}];

        $scope.initController = function () {
            CategoryService.getCategories().then(function (response) {
                response.data.rows.forEach(function (data) {
                    $scope.categories.push({
                        name: data.name,
                        value: data._id
                    });
                });
            });
            if (id > 0) {
                ArticleService.getArticleById(id).then(function (data) {
                    data.time.create = moment(data.time.create).format('YYYY-MM-DD HH:mm:ss');
                    data.time.update = moment(data.time.update).format('YYYY-MM-DD HH:mm:ss');
                    data.time.publish = moment(data.time.publish).format('YYYY-MM-DD HH:mm:ss');
                    $scope.model = data;
                    $scope.originModel = tool.deepCopy($scope.model);
                });
            } else {
                $scope.model.categoryId = $scope.categories[0].value;
            }
        };

        $scope.saveArticle = function () {
            $scope.model.content = UE.getEditor('editor').getContent();
            if (id > 0) {
                var modifyModel = tool.trimSameProperties($scope.originModel, $scope.model);
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