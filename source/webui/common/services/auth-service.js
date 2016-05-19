'use strict';
angular.module('common.services')
    .factory('AuthService', ['$rootScope', '$cookies', '$http', 'AccountService', ($rootScope, $cookies, $http, AccountService) => {
        return {
            Login: (userName, password) => {
                return AccountService.authenticate({userName: userName, password: password});
            },
            setCredentials: (data, isRemember) => {
                $rootScope.globals = {
                    currentUser: {
                        data: data.user,
                        token: data.token
                    }
                };
                let option = {};
                if (isRemember) {
                    option = {'expires': moment.utc(data.expires).format(), 'path': '/'};
                }
                $cookies.putObject('globals', $rootScope.globals, option);
            },
            clearCredentials: () => {
                $rootScope.globals = {};
                $cookies.put('globals', undefined, {'path': '/'});
            }
        };
    }]);