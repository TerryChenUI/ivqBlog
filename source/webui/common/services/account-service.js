'use strict';
angular.module('common.services')
    .factory('AccountService', ['$log', '$http', 'ServerConfig', 'appHttp', ($log, $http, ServerConfig, appHttp) => {
        return {
            authenticate: (data) => {
                let config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "account/authenticate",
                    data: data
                };
                return appHttp.request(config);
            },
            update: (id, data) => {
                let config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "account/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            updatePassword: (id, data) => {
                let config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "account/updatePassword/" + id,
                    data: data
                };
                return appHttp.request(config);
            }
        };
    }]);