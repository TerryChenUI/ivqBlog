'use strict';
angular.module('common.interceptors')
    .factory('AuthInterceptor', ['$q', '$cookies', '$window', 'SweetAlert', ($q, $cookies, $window, SweetAlert) => {
        return {
            request: (config) => {
                config.headers = config.headers || {};
                let globals = $cookies.getObject('globals');
                if (globals && globals.currentUser) {
                    config.headers.Authorization = globals.currentUser.token;
                }
                return config;
            },
            responseError: (response) => {
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
    .config(['$httpProvider', ($httpProvider) => {
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);