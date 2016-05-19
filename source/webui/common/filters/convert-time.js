'use strict';
angular.module('common.filters')
    .filter('convertTime', ['Tool', (Tool) => {
        return (originTime) => {
            return Tool.convertTime(originTime);
        }
    }]);