'use strict';
angular.module('common.services')
    .factory('SettingService', ['$http', 'ServerConfig', 'appHttp', function ($http, ServerConfig, appHttp) {
        return {
            getAll: function () {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "settings"
                };
                return appHttp.request(config);
            },
            getByKey: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "settings/getByKey",
                    params: params
                };
                return appHttp.request(config);
            },
            update: function (data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "settings",
                    data: data
                };
                return appHttp.request(config);
            }
        };
    }]);