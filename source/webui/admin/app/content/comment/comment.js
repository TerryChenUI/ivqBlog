'use strict';
angular.module('app.admin.content')
    .controller('ListCommentCtrl', ['$scope', '$state', 'SweetAlert', 'CategoryService', 'CommentService', 'TagService', 'Tool', function ($scope, $state, SweetAlert, CategoryService, CommentService, TagService, Tool) {
        $scope.getResource = function (params, paramsObj) {
            return CommentService.loadList(paramsObj).then(function (response) {
                response.data.rows = _.each(response.data.rows, function (data) {
                    data.createTime = Tool.convertTime(data.createTime);
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
                        CommentService.delete(id).then(function () {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };
    }]);