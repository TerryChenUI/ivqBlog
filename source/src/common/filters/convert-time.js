angular.module('common.filters')
    .filter('convertTime', ['Tool', function (Tool) {
        return function(originTime, format){
            return Tool.convertTime(originTime, format);
        }
}]);