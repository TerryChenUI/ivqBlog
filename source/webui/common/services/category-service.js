'use strict';
angular.module('common.services')
    .factory('CategoryService', ['$http', 'ServerConfig', 'appHttp', ($http, ServerConfig, appHttp) => {
        return {
            loadList: (params) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "categories",
                    params: params
                };
                return $http(config);
            },
            getAll: (params) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "categories/all",
                    params: params
                };
                return appHttp.request(config);
            },
            getById: (id) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "categories/" + id
                };
                return appHttp.request(config);
            },
            getByRoute: (route) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "categories/getByRoute/" + route
                };
                return appHttp.request(config);
            },
            insert: (data) => {
                let config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "categories",
                    data: data
                };
                return appHttp.request(config);
            },
            update: (id, data) => {
                let config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "categories/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: (id) => {
                let config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "categories/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);