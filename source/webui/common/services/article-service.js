'use strict';
angular.module('common.services')
    .factory('ArticleService', ['$http', 'ServerConfig', 'appHttp', ($http, ServerConfig, appHttp) => {
        return {
            loadList: (params) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "articles",
                    params: params
                };
                return $http(config);
            },
            getAll: () => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "articles/all"
                };
                return appHttp.request(config);
            },
            getById: (id, params) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "articles/" + id,
                    params: params
                };
                return appHttp.request(config);
            },
            insert: (data) => {
                let config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "articles",
                    data: data
                };
                return appHttp.request(config);
            },
            update: (id, data) => {
                let config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "articles/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: (id) => {
                let config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "articles/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);