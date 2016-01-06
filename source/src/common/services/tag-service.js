(function () {
    var TagService = (function () {
        function TagService($log, $http, ServerConfig, appHttp) {
            this.$log = $log;
            this.$http = $http;
            this.appHttp = appHttp;
            this.serviceEndpoint = ServerConfig.apiUrl;
        }

        TagService.prototype.getTags = function (params) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "tags",
                params: params
            };
            return this.$http(config);
        };

        TagService.prototype.getAllTags = function () {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "tags/all"
            };
            return this.appHttp.request(config);
        };

        TagService.prototype.getTagById = function (id) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "tags/" + id
            };
            return this.appHttp.request(config);
        };

        TagService.prototype.insert = function (tag, successCB, errorCB) {
            var config = {
                method: 'POST',
                url: this.serviceEndpoint + "tags",
                data: tag
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        TagService.prototype.update = function (id, tag, successCB, errorCB) {
            var config = {
                method: 'PUT',
                url: this.serviceEndpoint + "tags/" + id,
                data: tag
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        TagService.prototype.delete = function (id, successCB, errorCB) {
            var config = {
                method: 'DELETE',
                url: this.serviceEndpoint + "tags/" + id
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        return TagService;
    })();


    angular.module('common.services')
        .factory('TagService', ['$log', '$http', 'ServerConfig', 'appHttp', function ($log, $http, ServerConfig, appHttp) {
            return new TagService($log, $http, ServerConfig, appHttp);
        }]);

})();