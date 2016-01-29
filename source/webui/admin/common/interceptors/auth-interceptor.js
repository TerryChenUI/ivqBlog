'use strict';
angular.module('common.interceptors')
    .factory('AuthInterceptor', ['$q', '$cookies', '$window', 'SweetAlert', function ($q, $cookies, $window, SweetAlert) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                var globals = $cookies.getObject('globals');
                if (globals && globals.currentUser) {
                    config.headers.Authorization = globals.currentUser.token;
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $window.location.href = 'login.html';
                }
                if (response.status === 500) {
                    SweetAlert.error('服务器错误', response.data.message);
                }
                return $q.reject(response);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);