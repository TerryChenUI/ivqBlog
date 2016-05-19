'use strict';
angular.module('common.filters')
    .filter('fromNow', ['Tool', (Tool) => {
        return (originTime) => {
            return Tool.relativeTime(originTime);
        }
    }]);