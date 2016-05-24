angular.module('app.admin.content')
    .controller('ListArticleCtrl', ['$scope', '$state', 'SweetAlert', 'CategoryService', 'ArticleService', 'TagService', 'Tool', ($scope, $state, SweetAlert, CategoryService, ArticleService, TagService, Tool) => {
        $scope.filterBy = {'title': '', 'category': 0, 'tags': 0};
        $scope.categories = [{name: '--请选择--', value: 0}];
        $scope.allTags = [{name: '--请选择--', value: 0}];

        $scope.initController = () => {
            let params = {
                fields: '_id,name'
            };
            CategoryService.getAll(params).then((data) => {
                angular.forEach(data, (obj) => {
                    $scope.categories.push({
                        name: obj.name,
                        value: obj._id
                    });
                });
            });
            TagService.getAll(params).then((data) => {
                angular.forEach(data, (obj) => {
                    $scope.allTags.push({
                        name: obj.name,
                        value: obj._id
                    });
                });
            });
        };

        $scope.getResource = (params, paramsObj) => {
            paramsObj.sortBy = {'time.create': -1};
            return ArticleService.loadList(paramsObj).then((response) => {
                response.data.rows = angular.forEach(response.data.rows, (data) => {
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

        $scope.remove = (id) => {
            SweetAlert.deleteConfirm(
                (isConfirm) => {
                    if (isConfirm) {
                        ArticleService.delete(id).then(() => {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };

        $scope.initController();
    }])
    .controller('EditArticleCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$window', 'SweetAlert', 'CategoryService', 'ArticleService', 'TagService', 'Upload', 'Tool', ($scope, $stateParams, $state, $timeout, $window, SweetAlert, CategoryService, ArticleService, TagService, Upload, Tool) => {
        let id = $stateParams.id ? $stateParams.id : '';
        $scope.originModel = {};
        $scope.model = {
            author: 'ivqBlog'
        };
        $scope.ueConfig = {
            toolbars: [
                [
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                    'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                    'print', 'preview', 'searchreplace', 'help', 'drafts'
                ]],
            initialFrameHeight: 350,
            autoHeightEnabled: false
        };
        $scope.title = id != '' ? '编辑文章' : '添加文章';
        $scope.categories = [{name: '--请选择--', value: 0}];

        $scope.initController = () => {
            let params = {
                fields: '_id,name'
            };
            CategoryService.getAll(params).then((data) => {
                angular.forEach(data, (obj) => {
                    $scope.categories.push({
                        name: obj.name,
                        value: obj._id
                    });
                });
            });
            TagService.getAll(params).then((data) => {
                $scope.tags = data;
            });
            if (id) {
                ArticleService.getById(id).then((data) => {
                    data = Tool.transformArticleUrl(data);
                    data.time.create = Tool.convertTime(data.time.create);
                    data.time.update = Tool.convertTime(data.time.update);
                    if (data.time.publish)
                        data.time.publish = Tool.convertTime(data.time.publish);
                    $scope.model = data;
                    $scope.model.categoryRoute = data.category != null ? data.category.route : '';
                    $scope.model.category = data.category != null ? data.category._id : 0;
                    $scope.originModel = Tool.deepCopy($scope.model);
                    $scope.originModel.category = data.category != null ? data.category._id : 0;
                });
            } else {
                $scope.model.category = $scope.categories[0].value;
                $scope.model.content = Tool.getArticleTpl();
            }
        };

        $scope.save = () => {
            if (id) {
                let selectedTags = _.map($scope.model.tags, (data) => {
                    return data._id;
                });
                let modifyModel = Tool.trimSameProperties($scope.originModel, $scope.model);
                if (_.isUndefined(modifyModel.tags) && selectedTags.length == 0) {
                    modifyModel.tags = []
                } else if (modifyModel.tags.length) {
                    modifyModel.tags = selectedTags;
                }
                delete modifyModel.comments;
                ArticleService.update(id, modifyModel).then(() => {
                    SweetAlert.updateSuccessfully();
                    $state.go('article');
                });
            } else {
                if ($scope.model.category == 0)
                    delete $scope.model.category;
                ArticleService.insert($scope.model).then(() => {
                    SweetAlert.addSuccessfully();
                    $state.go('article');
                });
            }
        };

        $scope.uploadImage = (file, errFiles) => {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/uploads',
                    data: {file: file}
                });

                file.upload.then((response) => {
                    $timeout(() => {
                        file.result = response.data.success;
                        $scope.showImg = response.data.success;
                        $scope.imgUrl = response.data.imgUrl;
                    });
                }, (response) => {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, (evt) => {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        $scope.initController();
    }]);