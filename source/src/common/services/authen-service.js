(function () {
    angular.module('common.services')
        .factory('AuthenService', ['$rootScope', '$cookieStore', '$http', 'UserService', function ($rootScope, $cookieStore, $http, UserService) {
            return {
                Login: function (userName, password, callback) {
                    UserService.authenticate(userName, password, function (response) {
                        callback(response);
                    });
                },
                setCredentials: function (token, data) {
                    $rootScope.globals = {
                        currentUser: {
                            id: data._id,
                            userName: data.userName,
                            token: token
                        }
                    };

                    $http.defaults.headers.common['Authorization'] = token;
                    $cookieStore.put('globals', $rootScope.globals);
                },
                clearCredentials: function () {
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    $http.defaults.headers.common.Authorization = '';
                }
            };
        }]);
})();