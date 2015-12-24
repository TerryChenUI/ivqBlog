'use strict';
angular.module('common.util')
    .factory('tool', function () {
        return {
            trimSameProperties: function (initial, modified) {
                $.each(modified, function (name) {
                    if (initial.hasOwnProperty(name) && _.isObject(modified[name])) {
                        $scope.trimSameProperties(initial[name], modified[name]);
                    } else if (modified[name] == initial[name]) {
                        delete modified[name];
                    }
                    if (_.isObject(modified[name]) && _.isEmpty(modified[name])) {
                        delete modified[name];
                    }
                });
                return modified;
            },
            deepCopy: function (source) {
                return $.extend(true, {}, source);
            }
        };
    }
);