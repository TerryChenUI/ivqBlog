'use strict';
angular.module('common.util')
    .factory('Tool', function () {
        return {
            trimSameProperties: function (initial, modified) {
                var that = this;
                $.each(modified, function (name) {
                    if (initial.hasOwnProperty(name) && _.isObject(modified[name])) {
                        that.trimSameProperties(initial[name], modified[name]);
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
            },
            convertTime: function (originTime, format) {
                if (_.isUndefined(format)) {
                    format = 'YYYY-MM-DD HH:mm:ss';
                }
                return moment(originTime).format(format);
            }
        };
    }
);