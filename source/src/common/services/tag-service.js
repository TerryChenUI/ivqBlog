'use strict';
angular.module('common.services')
    .factory('TagService', ['$http', 'ServerConfig', 'appHttp', function ($http, ServerConfig, appHttp) {
        return {
            loadList: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "tags",
                    params: params
                };
                return $http(config);
            },
            getAll: function () {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "tags/all"
                };
                return appHttp.request(config);
            },
            getById: function (id) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "tags/" + id
                };
                return appHttp.request(config);
            },
            insert: function (data) {
                var config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "tags",
                    data: data
                };
                return appHttp.request(config);
            },
            update: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "tags/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: function (id) {
                var config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "tags/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);
