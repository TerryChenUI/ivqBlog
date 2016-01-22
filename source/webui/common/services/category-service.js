'use strict';
angular.module('common.services')
    .factory('CategoryService', ['$http', 'ServerConfig', 'appHttp', function ($http, ServerConfig, appHttp) {
        return {
            loadList: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "categories",
                    params: params
                };
                return $http(config);
            },
            getAll: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "categories/all",
                    params: params
                };
                return appHttp.request(config);
            },
            getById: function (id) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "categories/" + id
                };
                return appHttp.request(config);
            },
            getByRoute: function (route) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "categories/getByRoute/" + route
                };
                return appHttp.request(config);
            },
            insert: function (data) {
                var config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "categories",
                    data: data
                };
                return appHttp.request(config);
            },
            update: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "categories/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: function (id) {
                var config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "categories/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);