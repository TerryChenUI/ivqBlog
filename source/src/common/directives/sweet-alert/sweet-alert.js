'use strict';

angular.module('ngSweetAlert', [])
    .factory('SweetAlert', ['$rootScope', function ($rootScope) {

        var swal = window.swal;

        //public methods
        var self = {

            swal: function (arg1, arg2, arg3) {
                $rootScope.$evalAsync(function () {
                    if (typeof(arg2) === 'function') {
                        swal(arg1, function (isConfirm) {
                            $rootScope.$evalAsync(function () {
                                arg2(isConfirm);
                            });
                        }, arg3);
                    } else {
                        swal(arg1, arg2, arg3);
                    }
                });
            },
            deleteConfirm: function(arg1, arg2){
                swal({
                    title: "你确认要删除此数据?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删除",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    $rootScope.$evalAsync(function () {
                        arg1(isConfirm);
                    });
                }, arg2);
            },
            submitSuccessfully: function(){
                this.success('提交成功');
            },
            addSuccessfully: function(){
                this.success('新增成功');
            },
            addFail: function(){
                this.error('新增失败');
            },
            updateSuccessfully: function(){
                this.success('更新成功');
            },
            updateFail: function(){
                this.error('更新失败');
            },
            deleteSuccessfully: function(){
                this.success('删除成功');
            },
            deleteFail: function(){
                this.error('删除失败');
            },
            success: function (title, message) {
                $rootScope.$evalAsync(function () {
                    swal(title, message, 'success');
                });
            },
            error: function (title, message) {
                $rootScope.$evalAsync(function () {
                    swal(title, message, 'error');
                });
            },
            warning: function (title, message) {
                $rootScope.$evalAsync(function () {
                    swal(title, message, 'warning');
                });
            },
            info: function (title, message) {
                $rootScope.$evalAsync(function () {
                    swal(title, message, 'info');
                });
            }
        };

        return self;
    }]);
