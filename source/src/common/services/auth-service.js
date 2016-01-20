'use strict';
angular.module('common.services')
    .factory('AuthService', ['$rootScope', '$cookies', '$http', 'AccountService', function ($rootScope, $cookies, $http, AccountService) {
        return {
            Login: function (userName, password, callback) {
                return AccountService.authenticate({userName: userName, password: password});
            },
            setCredentials: function (data, isRemember) {
                $rootScope.globals = {
                    currentUser: {
                        data: data.user,
                        token: data.token
                    }
                };
                var option = {};
                if (isRemember) {
                    option = {'expires': moment.utc(data.expires).format(), 'path': '/'};
                }
                $cookies.putObject('globals', $rootScope.globals, option);
            },
            clearCredentials: function () {
                $rootScope.globals = {};
                $cookies.put('globals', undefined, {'path': '/'});
            }
        };
    }]);