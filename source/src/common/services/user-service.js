(function () {
    var UserService = (function () {
        function UserService($log, $http, ServerConfig, appHttp) {
            this.$log = $log;
            this.$http = $http;
            this.appHttp = appHttp;
            this.serviceEndpoint = ServerConfig.apiUrl;
        }

        UserService.prototype.getUsers = function () {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "users"
            };
            return this.appHttp.request(config);
        };

        UserService.prototype.authenticate = function (userName, password, successCB) {
            var config = {
                method: 'POST',
                url: this.serviceEndpoint + "users/authenticate",
                data: {userName: userName, password: password}
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        UserService.prototype.getUserById = function (id) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "users/" + id
            };
            return this.appHttp.request(config);
        };

        UserService.prototype.insertUser = function (user, successCB, errorCB) {
            var config = {
                method: 'POST',
                url: this.serviceEndpoint + "users",
                data: user
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        UserService.prototype.updateUser = function (id, user, successCB, errorCB) {
            var config = {
                method: 'PUT',
                url: this.serviceEndpoint + "users/" + id,
                data: user
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        UserService.prototype.deleteUser = function (id, successCB, errorCB) {
            var config = {
                method: 'DELETE',
                url: this.serviceEndpoint + "users/" + id
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        return UserService;
    })();

    angular.module('common.services')
        .factory('UserService', ['$log', '$http', 'ServerConfig', 'appHttp', function ($log, $http, ServerConfig, appHttp) {
            return new UserService($log, $http, ServerConfig, appHttp);
        }]);
})();