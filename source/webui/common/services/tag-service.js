'use strict';
angular.module('common.services')
    .factory('TagService', ['$http', 'ServerConfig', 'appHttp', ($http, ServerConfig, appHttp) => {
        return {
            loadList: (params) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "tags",
                    params: params
                };
                return $http(config);
            },
            getAll: (params) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "tags/all",
                    params: params
                };
                return appHttp.request(config);
            },
            getById: (id) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "tags/" + id
                };
                return appHttp.request(config);
            },
            getByRoute: (route) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "tags/getByRoute/" + route
                };
                return appHttp.request(config);
            },
            insert: (data) => {
                let config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "tags",
                    data: data
                };
                return appHttp.request(config);
            },
            update: (id, data) => {
                let config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "tags/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: (id) => {
                let config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "tags/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);
