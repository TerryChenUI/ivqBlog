angular.module('common.services')
    .factory('AccountService', ['$log', '$http', 'ServerConfig', 'appHttp', function ($log, $http, ServerConfig, appHttp) {
        return {
            authenticate: function (data) {
                var config = {
                    method: 'POST',
                    url: ServerConfig.apiUrl + "account/authenticate",
                    data: data
                };
                return appHttp.request(config);
            },
            update: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "account/" + id,
                    data: data
                };
                return appHttp.request(config);
            },
            updatePassword: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "account/updatePassword/" + id,
                    data: data
                };
                return appHttp.request(config);
            }
        };
    }]);