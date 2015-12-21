angular.module('common.directives')
    .directive('ueditor', function(){
        return {
            restrict: 'EA',
            require: 'ngModel',
            templateUrl: 'common/directives/ueditor/ueditor.tpl.html',
            link: function (scope, ele, attrs, ngModel) {
                var ue = UE.getEditor('editor', {
                    //UEDITOR_HOME_URL: URL,
                    //serverUrl: URL + "api/upload"
                });
                ue.addListener("ready", function () {
                    ue.setContent(ngModel.$viewValue);
                });

                //setTimeout(function () {
                    //var setEditor = setInterval(function(){
                    //    try{
                    //        if(UE.getEditor('editor') != undefined){
                    //            UE.getEditor('editor');
                    //            UE.getEditor('editor').setContent(ngModel.$viewValue);
                    //            clearInterval(setEditor);
                    //        }
                    //    }catch (e){
                    //
                    //    }
                    //},50);
                //});
            }
        }
    });