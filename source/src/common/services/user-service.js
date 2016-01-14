angular.module('common.services')
    .factory('UserService', ['$http', 'ServerConfig', 'appHttp', function ($http, ServerConfig, appHttp) {
        return {
            loadList: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "users",
                    params: params
                };
                return $http(config);
            },
            getAll: function () {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "users/all"
                };
                return appHttp.request(config);
            },
            getById: function (id) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "users/" + id
                };
                return appHttp.request(config);
            },
            insert: function (data) {
                var config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "users",
                    data: data
                };
                return appHttp.request(config);
            },
            update: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "users/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: function (id) {
                var config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "users/" + id
                };
                return appHttp.request(config);
            }
        };
    }]);