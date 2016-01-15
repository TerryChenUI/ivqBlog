angular.module('common.filters')
    .filter('fromNow', ['Tool', function (Tool) {
        return function(originTime){
            return Tool.relativeTime(originTime);
        }
    }]);