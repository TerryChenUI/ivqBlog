'use strict';
angular.module('common.filters')
    .filter('convertTime', ['Tool', function (Tool) {
        return function(originTime){
            return Tool.convertTime(originTime);
        }
}]);