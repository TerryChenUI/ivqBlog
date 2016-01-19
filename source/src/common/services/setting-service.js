angular.module('common.services')
    .factory('SettingService', ['$http', 'ServerConfig', 'appHttp', function ($http, ServerConfig, appHttp) {
        return {
            getAll: function () {
                var config = {
                    method: 'GET',
                    url: ServerConfig.apiUrl + "settings"
                };
                return appHttp.request(config);
            },
            update: function (id, data) {
                var config = {
                    method: 'PUT',
                    url: ServerConfig.apiUrl + "settings/" + id,
                    data: data
                };
                return appHttp.request(config);
            }
        };
    }]);