angular.module('common.directives')
    .directive('ueditor', function () {
        return {
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                content: '='
            },
            templateUrl: 'common/directives/ueditor/ueditor.tpl.html',
            link: function (scope, ele, attrs, ngModel) {
                var ue = UE.getEditor('editor', {
                    //UEDITOR_HOME_URL: URL,
                    //serverUrl: URL + "api/upload"
                });
                ue.addListener("ready", function () {
                    ue.setContent(ngModel.$viewValue);
                });
            }
        }
    });