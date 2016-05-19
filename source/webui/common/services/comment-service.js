'use strict';
angular.module('common.services')
    .factory('CommentService', ['$http', '$cookies', 'ServerConfig', 'appHttp', ($http, $cookies, ServerConfig, appHttp) => {
        return {
            loadList: (params) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "comments",
                    params: params
                };
                return $http(config);
            },
            getAll: () => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "comments/all"
                };
                return appHttp.request(config);
            },
            getById: (id) => {
                let config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "comments/" + id
                };
                return appHttp.request(config);
            },
            insert: (data) => {
                let config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "comments",
                    data: data
                };
                return appHttp.request(config);
            },
            update: (id, data) => {
                let config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "comments/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: (id) => {
                let config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "comments/" + id,
                    headers: {}
                };
                let globals = $cookies.getObject('globals');
                if (globals && globals.currentUser) {
                    config.headers.Authorization = globals.currentUser.token;
                }
                return appHttp.request(config);
            }
        };
    }]);