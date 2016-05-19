'use strict';
angular.module('app.admin.content')
    .controller('ListCommentCtrl', ['$scope', '$state', 'SweetAlert', 'CategoryService', 'CommentService', 'TagService', 'Tool', ($scope, $state, SweetAlert, CategoryService, CommentService, TagService, Tool) => {
        $scope.getResource = (params, paramsObj) => {
            return CommentService.loadList(paramsObj).then((response) => {
                response.data.rows = angular.forEach(response.data.rows, (data) => {
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

        $scope.remove = (id) => {
            SweetAlert.deleteConfirm(
                (isConfirm) => {
                    if (isConfirm) {
                        CommentService.delete(id).then(() => {
                            SweetAlert.deleteSuccessfully();
                            $state.reload();
                        });
                    }
                });
        };
    }]);