(function () {
    var AccountService = (function () {
        function AccountService($log, $http, ServerConfig, appHttp) {
            this.$log = $log;
            this.$http = $http;
            this.appHttp = appHttp;
            this.serviceEndpoint = ServerConfig.apiUrl;
        }

        AccountService.prototype.authenticate = function (userName, password, successCB) {
            var config = {
                method: 'POST',
                url: this.serviceEndpoint + "account/authenticate",
                data: {userName: userName, password: password}
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        AccountService.prototype.update = function (id, user, successCB, errorCB) {
            var config = {
                method: 'PUT',
                url: this.serviceEndpoint + "account/" + id,
                data: user
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        return AccountService;
    })();

    angular.module('common.services')
        .factory('AccountService', ['$log', '$http', 'ServerConfig', 'appHttp', function ($log, $http, ServerConfig, appHttp) {
            return new AccountService($log, $http, ServerConfig, appHttp);
        }]);
})();