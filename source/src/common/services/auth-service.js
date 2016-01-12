(function () {
    angular.module('common.services')
        .factory('AuthService', ['$rootScope', '$cookies', '$http', 'AccountService', function ($rootScope, $cookies, $http, AccountService) {
            return {
                Login: function (userName, password, callback) {
                    AccountService.authenticate(userName, password, function (response) {
                        callback(response.data);
                    });
                },
                setCredentials: function (res, isRemember) {
                    $rootScope.globals = {
                        currentUser: {
                            data: res.data,
                            token: res.token
                        }
                    };
                    var option = {};
                    if (isRemember) {
                        option = {'expires': moment.utc(res.expires).format(), 'path': '/'};
                    }
                    $cookies.putObject('globals', $rootScope.globals, option);
                },
                clearCredentials: function () {
                    $rootScope.globals = {};
                    $cookies.put('globals', undefined, { 'path': '/' } );
                }
            };
        }]);
})();