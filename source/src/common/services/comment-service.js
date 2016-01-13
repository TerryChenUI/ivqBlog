(function () {
    var CommentService = (function () {
        function CommentService($log, $http, $cookies, ServerConfig, appHttp) {
            this.$log = $log;
            this.$http = $http;
            this.$cookies = $cookies;
            this.appHttp = appHttp;
            this.serviceEndpoint = ServerConfig.apiUrl;
        }

        CommentService.prototype.getComments = function (params) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "comments",
                params: params
            };
            return this.$http(config);
        };

        CommentService.prototype.insert = function (comment, successCB, errorCB) {
            var config = {
                method: 'POST',
                url: this.serviceEndpoint + "comments",
                data: comment
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        CommentService.prototype.update = function (id, comment, successCB, errorCB) {
            var config = {
                method: 'PUT',
                url: this.serviceEndpoint + "comments/" + id,
                data: comment
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        CommentService.prototype.delete = function (id, successCB, errorCB) {
            var config = {
                method: 'DELETE',
                url: this.serviceEndpoint + "comments/" + id,
                headers: {}
            };
            var globals = this.$cookies.getObject('globals');
            if (globals && globals.currentUser) {
                config.headers.Authorization = globals.currentUser.token;
            }
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        return CommentService;
    })();


    angular.module('common.services')
        .factory('CommentService', ['$log', '$http', '$cookies', 'ServerConfig', 'appHttp', function ($log, $http, $cookies, ServerConfig, appHttp) {
            return new CommentService($log, $http, $cookies, ServerConfig, appHttp);
        }]);

})();