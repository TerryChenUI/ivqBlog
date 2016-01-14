angular.module('common.services')
    .factory('CommentService', ['$http', '$cookies', 'ServerConfig', 'appHttp', function ($http, $cookies, ServerConfig, appHttp) {
        return {
            loadList: function (params) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "comments",
                    params: params
                };
                return $http(config);
            },
            getAll: function () {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "comments/all"
                };
                return appHttp.request(config);
            },
            getById: function (id) {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "comments/" + id
                };
                return appHttp.request(config);
            },
            insert: function (data) {
                var config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "comments",
                    data: data
                };
                return appHttp.request(config);
            },
            update: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "comments/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            delete: function (id) {
                var config = {
                    method: 'DELETE',
                    url: ServerConfig.apiUrl + "comments/" + id,
                    headers: {}
                };
                var globals = $cookies.getObject('globals');
                if (globals && globals.currentUser) {
                    config.headers.Authorization = globals.currentUser.token;
                }
                return appHttp.request(config);
            }
        };
    }]);