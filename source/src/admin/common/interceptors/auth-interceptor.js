'use strict';
angular.module('common.interceptors')
    .factory('AuthInterceptor', ['$q', '$cookies', '$window', function ($q, $cookies, $window) {
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
                return $q.reject(response);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);