angular.module('app.admin.content')
    .controller('ListArticleCtrl', ['$scope', 'SweetAlert', 'CategoryService', 'ArticleService', function ($scope, SweetAlert, CategoryService, ArticleService) {
        $scope.filterBy = {'CategoryId': 0};
        $scope.categoryOptions = [{name: '--请选择--', value: 0}];

        $scope.initController = function(){
            //category filter
            CategoryService.getCategories().then(function (response) {
                _.each(response.data.rows, function (data) {
                    $scope.categoryOptions.push({
                        name: data.Name,
                        value: data.Id
                    });
                });
            });
        };
        
        $scope.getResource = function (params, paramsObj) {
            return ArticleService.getArticles(paramsObj).then(function (response) {
                response.data.rows = _.each(response.data.rows, function (data) {
                    data.PublishText = data.Publish ? "发布" : "未发布";
                });
                return {
                    'rows': response.data.rows,
                    'header': [],
                    'pagination':response.data.pagination,
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
                        ArticleService.deleteArticle(id, function () {
                            SweetAlert.swal("删除成功");
                        });
                    }
                });
        };

        $scope.initController();
    }])
    .controller('EditArticleCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'SweetAlert', 'CategoryService', 'ArticleService', 'Upload', function ($scope, $stateParams, $state, $timeout, SweetAlert, CategoryService, ArticleService, Upload) {
        var articleId = ($stateParams.id) ? parseInt($stateParams.id) : 0;
        $scope.model = {};
        $scope.title = articleId > 0 ? '编辑文章' : '添加文章';
        $scope.categories = [{name: '--请选择--', value: 0}];

        $scope.initController = function () {
            CategoryService.getCategories().then(function (response) {
                _.each(response.data.rows, function (data) {
                    $scope.categories.push({
                        name: data.Name,
                        value: data.Id
                    });
                });
                $scope.model.CategoryId = $scope.categories[0].value;
            });

            if (articleId > 0) {
                ArticleService.getArticleById(articleId).then(function (data) {
                    $scope.model = data;
                });
            }
        };

        $scope.saveArticle = function () {
            $scope.model.Content = UE.getEditor('editor').getContent();
            if (articleId > 0) {
                ArticleService.updateArticle(articleId, $scope.model, function () {
                    SweetAlert.swal("更新成功");
                    $state.go('article');
                });
            } else {
                ArticleService.insertArticle($scope.model, function () {
                    SweetAlert.swal("新增成功");
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