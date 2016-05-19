'use strict';
angular.module('common.services')
    .factory('UserService', ['$http', 'ServerConfig', 'appHttp', ($http, ServerConfig, appHttp) => {
        return {
            loadList: (params) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "users",
                    params: params
                };
                return $http(config);
            },
            getAll: () => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "users/all"
                };
                return appHttp.request(config);
            },
            getById: (id) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "users/" + id
                };
                return appHttp.request(config);
            },
            insert: (data) => {
                let config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "users",
                    data: data
                };
                return appHttp.request(config);
            },
            update: (id, data) => {
                let config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "users/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: (id) => {
                let config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "users/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);