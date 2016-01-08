(function () {
    var CommentService = (function () {
        function CommentService($log, $http, ServerConfig, appHttp) {
            this.$log = $log;
            this.$http = $http;
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

        CommentService.prototype.getAllComments = function () {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "comments/all"
            };
            return this.appHttp.request(config);
        };

        CommentService.prototype.getCommentById = function (id) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "comments/" + id
            };
            return this.appHttp.request(config);
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
                url: this.serviceEndpoint + "comments/" + id
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        return CommentService;
    })();


    angular.module('common.services')
        .factory('CommentService', ['$log', '$http', 'ServerConfig', 'appHttp', function ($log, $http, ServerConfig, appHttp) {
            return new CommentService($log, $http, ServerConfig, appHttp);
        }]);

})();