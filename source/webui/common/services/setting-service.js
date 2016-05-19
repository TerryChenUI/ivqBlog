'use strict';
angular.module('common.services')
    .factory('SettingService', ['$http', 'ServerConfig', 'appHttp', ($http, ServerConfig, appHttp) => {
        return {
            getAll: () => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "settings"
                };
                return appHttp.request(config);
            },
            getByKey: (params) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "settings/getByKey",
                    params: params
                };
                return appHttp.request(config);
            },
            update: (data) => {
                let config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "settings",
                    data: data
                };
                return appHttp.request(config);
            }
        };
    }]);