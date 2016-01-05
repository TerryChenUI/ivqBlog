(function () {
    angular.module('common.services')
        .factory('AuthService', ['$rootScope', '$cookies', '$http', 'UserService', function ($rootScope, $cookies, $http, UserService) {
            return {
                Login: function (userName, password, callback) {
                    UserService.authenticate(userName, password, function (response) {
                        callback(response);
                    });
                },
                setCredentials: function (res) {
                    $rootScope.globals = {
                        currentUser: {
                            id: res.data._id,
                            userName: res.data.userName,
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