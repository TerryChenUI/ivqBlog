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

        UserService.prototype.authenticate = function (userName, password, successCallback) {
            var config = {
                method: 'POST',
                url: this.serviceEndpoint + "users/authenticate",
                data: {userName: userName, password: password}
            };
            return this.$http(config).success(function (res) {
                return successCallback(res);
            });
        };

        UserService.prototype.getUserById = function (id) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "users/" + id
            };
            return this.appHttp.request(config);
        };

        UserService.prototype.insertUser = function (user, successCallback) {
            var config = {
                method: 'POST',
                url: this.serviceEndpoint + "users",
                data: user
            };
            return this.$http(config).success(function (res) {
                return successCallback(res);
            });
        };

        UserService.prototype.updateUser = function (id, user, successCallback) {
            var config = {
                method: 'PUT',
                url: this.serviceEndpoint + "users/" + id,
                data: user
            };
            return this.$http(config).success(function (res) {
                return successCallback(res);
            });
        };

        UserService.prototype.deleteUser = function (id, successCallback) {
            var config = {
                method: 'DELETE',
                url: this.serviceEndpoint + "users/" + id
            };
            return this.$http(config).success(function (res) {
                return successCallback(res);
            });
        };

        return UserService;
    })();

    angular.module('common.services')
        .factory('UserService', ['$log', '$http', 'ServerConfig', 'appHttp', function ($log, $http, ServerConfig, appHttp) {
            return new UserService($log, $http, ServerConfig, appHttp);
        }]);
})();