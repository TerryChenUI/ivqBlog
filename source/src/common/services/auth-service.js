(function () {
    angular.module('common.services')
        .factory('AuthService', ['$rootScope', '$cookies', '$http', 'AccountService', function ($rootScope, $cookies, $http, AccountService) {
            return {
                Login: function (userName, password, callback) {
                    AccountService.authenticate(userName, password, function (response) {
                        callback(response.data);
                    });
                },
                setCredentials: function (res) {
                    $rootScope.globals = {
                        currentUser: {
                            data: res.data,
                            token: res.token
                        }
                    };

                    $cookies.putObject('globals', $rootScope.globals, {'expires': moment.utc(res.expires).format()});
                },
                clearCredentials: function () {
                    $rootScope.globals = {};
                    $cookies.remove('globals');
                }
            };
        }]);
})();