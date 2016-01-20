'use strict';
angular.module('common.services')
    .factory('ArticleService', ['$http', 'ServerConfig', 'appHttp', function ($http, ServerConfig, appHttp) {
        return {
            loadList: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "articles",
                    params: params
                };
                return $http(config);
            },
            getAll: function () {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "articles/all"
                };
                return appHttp.request(config);
            },
            getById: function (id, params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "articles/" + id,
                    params: params
                };
                return appHttp.request(config);
            },
            insert: function (data) {
                var config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "articles",
                    data: data
                };
                return appHttp.request(config);
            },
            update: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "articles/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: function (id) {
                var config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "articles/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);