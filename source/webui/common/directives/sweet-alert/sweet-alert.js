'use strict';
angular.module('ngSweetAlert', [])
    .factory('SweetAlert', ['$rootScope', ($rootScope) => {

        let swal = window.swal;

        //public methods
        let self = {

            swal: (arg1, arg2, arg3) => {
                $rootScope.$evalAsync(() => {
                    if (typeof(arg2) === 'function') {
                        swal(arg1, (isConfirm) => {
                            $rootScope.$evalAsync(() => {
                                arg2(isConfirm);
                            });
                        }, arg3);
                    } else {
                        swal(arg1, arg2, arg3);
                    }
                });
            },
            deleteConfirm: (arg1, arg2)=> {
                swal({
                    title: "你确认要删除此数据?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删除",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, (isConfirm) => {
                    $rootScope.$evalAsync(() => {
                        arg1(isConfirm);
                    });
                }, arg2);
            },
            submitSuccessfully: ()=> {
                this.success('提交成功');
            },
            addSuccessfully: ()=> {
                this.success('新增成功');
            },
            addFail: ()=> {
                this.error('新增失败');
            },
            updateSuccessfully: ()=> {
                this.success('更新成功');
            },
            updateFail: ()=> {
                this.error('更新失败');
            },
            deleteSuccessfully: ()=> {
                this.success('删除成功');
            },
            deleteFail: ()=> {
                this.error('删除失败');
            },
            success: (title, message) => {
                $rootScope.$evalAsync(() => {
                    swal(title, message, 'success');
                });
            },
            error: (title, message) => {
                $rootScope.$evalAsync(() => {
                    swal(title, message, 'error');
                });
            },
            warning: (title, message) => {
                $rootScope.$evalAsync(() => {
                    swal(title, message, 'warning');
                });
            },
            info: (title, message) => {
                $rootScope.$evalAsync(() => {
                    swal(title, message, 'info');
                });
            }
        };

        return self;
    }]);
